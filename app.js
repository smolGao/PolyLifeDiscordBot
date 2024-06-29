require('dotenv').config();
import getLCUserProfile from './External Feature/leetcode.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import {Card} from './Event/Card.js'

const TOKEN = process.env.TOKEN;


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const communityChestCards = [
    new Card('Advance to Go (Collect $200)', (player) => { player.position = 0; player.adjustMoney(200); }),
    new Card('Bank error in your favor – Collect $200', (player) => { player.adjustMoney(200); }),
];

const chanceCards = [
    new Card('Advance to Go (Collect $200)', (player) => { player.position = 0; player.adjustMoney(200); }),
    new Card('Go to Jail – Go directly to Jail – Do not pass Go, do not collect $200', (player) => { player.position = 10; player.inJail = true; }),
];

// Create decks
const communityChestDeck = new Deck(communityChestCards);
const chanceDeck = new Deck(chanceCards);

let game = null;


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    console.log("msg: " + message.content)

    // Extract the command and arguments from the message
    const [command, ...args] = message.content.slice(1).trim().split(/\s+/);

    // Check if the command is '!leetcode' followed by a username
    if (command === 'leetcode' && args.length === 1) {
        const username = args[0];
        // Call your function with the username
        message.channel.send(`Fetching data ...`);
        const res = await getLCUserProfile(username);
        const resStr =
            'User: ' + username + '\n' +
            'Total solved questions: ' + (res.numEasySolved + res.numMediumSolved + res.numHardSolved) + '\n' +
            'Easy Problems Solved: ' + res.numEasySolved + '\n' +
            'Medium Problems Solved: ' + res.numMediumSolved + '\n' +
            'Hard Problems Solved: ' + res.numHardSolved + '\n' +
            'Acceptance Rate: ' + res.acceptanceRate + '%';

        message.channel.send(resStr);
    }
});

client.login(TOKEN)
    .catch(console.error); // Error handling for login
