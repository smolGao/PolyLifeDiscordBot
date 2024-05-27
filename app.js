require('dotenv').config();
const getLCUserProfile = require('./leetcode.js');

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = process.env.TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    console.log("msg: " + message.content)

    // Extract the command and arguments from the message
    const [command, ...args] = message.content.slice(1).trim().split(/\s+/);

    // Check if the message is for bot

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
