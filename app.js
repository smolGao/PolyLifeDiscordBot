require('dotenv/config');
//const express = require('express');

// Load environment variables from .env file
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create an express app
//const app = express();

// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

// Create a new client instance
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


/* divide line */

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const userMessage = message.content;

    if (userMessage === '!hello') {
        message.channel.send('hello world');
    } else if (userMessage === '!ping') {
        try {
            // Simulating a success scenario
            // In real use, you can check some actual bot operation status
            message.channel.send('discord bot fully operational');
        } catch (error) {
            message.channel.send('discord bot errors out');
        }
    } else if (userMessage === '!host') {
        const userName = message.author.username;
        message.channel.send(`${userName} is hosting a game!`);
    }
});

// Log in to Discord with your client's token
client.login(token);
