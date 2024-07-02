require('dotenv').config();
import getLCUserProfile from './External Feature/leetcode.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import {Card} from './Event/Card.js'

const Player = require('./Asset/Player.js');
const Board = require('./Asset/Board.js');
const Card = require('./Event/Card.js');
const Deck = require('./Event/Deck.js');
const Game = require('./Game.js');

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


// Command to start a new game
client.on('messageCreate', message => {
    if (message.content === '!startgame') {
        if (game) {
            message.channel.send('A game is already in progress!');
            return;
        }

        const players = [
            new Player('Player 1'),
            new Player('Player 2'),
        ];

        const board = new Board();
        game = new Game(players, board, communityChestDeck, chanceDeck);

        message.channel.send('Game started! Use !nextturn to proceed.');
    } else if (message.content === '!nextturn') {
        if (!game) {
            message.channel.send('No game in progress. Use !startgame to start a new game.');
            return;
        }

        game.nextTurn();
        message.channel.send(`It's now ${game.players[game.currentPlayerIndex].name}'s turn.`);
    }
});

// Command to add a player
client.on('messageCreate', message => {
    if (message.content.startsWith('!addplayer')) {
        if (!game) {
            message.channel.send('No game in progress. Use !startgame to start a new game.');
            return;
        }

        const playerName = message.content.split(' ')[1];
        if (!playerName) {
            message.channel.send('Please provide a player name.');
            return;
        }

        game.players.push(new Player(playerName));
        message.channel.send(`${playerName} has been added to the game.`);
    }
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
