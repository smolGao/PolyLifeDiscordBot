require('dotenv/config');
//const express = require('express');

// Load environment variables from .env file
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ActionRowBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

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
/* variables */
let currentHost = null;
let players = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const userMessage = message.content;

    switch (userMessage) {
        case '!hello':
            message.channel.send('hello world');
            break;
        
        case '!ping':
            try {
                // Simulating a success scenario
                // In real use, you can check some actual bot operation status
                message.channel.send('discord bot fully operational');
            } catch (error) {
                message.channel.send('discord bot errors out');
            }
            break;

        case '!host':
            if (currentHost) {
                message.channel.send(`A game is already being hosted by ${currentHost.username}.`);
            } else {
                currentHost = message.author;
                players = [currentHost];

                const joinButton = new ButtonBuilder()
                    .setCustomId('join')
                    .setLabel('join game')
                    .setStyle(ButtonStyle.Primary);
                
                const row = new ActionRowBuilder()
                    .addComponents(joinButton);
                
                //message.channel.send(`${currentHost.username} is hosting a game! Type !join to participate.`);
                message.channel.send({
                    content: `${currentHost.username} is hosting a game! Click the button to join.`,
                    components: [row]
                });
            }

            break;

        case '!join':
            if (!currentHost) {
                message.channel.send(`No game is currently being hosted. Type !host to start a game.`);
            } else if (players.includes(message.author)) {
                message.channel.send(`You have already joined the game, ${message.author.username}.`);
            } else {
                players.push(message.author);
                message.channel.send(`${message.author.username} has joined. There are now ${players.length} players.`);
            }

            break;

        case '!players':
            if (!currentHost) {
                message.channel.send(`No game is currently being hosted.`);
            } else {
                const playerList = players.map(player => player.username).join(', ');
                message.channel.send(`Current players: ${playerList}`);
            }
            break;

        default:
            // Optional: Handle any other commands or messages that do not match the cases above
            break;
    }
});


//handle interaction
client.on('interactionCreate', async interaction => {
    console.log("hello world"); //DEBUG
    if (!interaction.isButton()) return;

    if (interaction.customId === 'join') {
        if (!currentHost) {
            await interaction.reply({ content: `No game is currently being hosted.`, ephemeral: true });
        } else if (players.includes(interaction.user)) {
            await interaction.reply({ content: `You have already joined the game, ${interaction.user.username}.`, ephemeral: true });
        } else {
            players.push(interaction.user);
            await interaction.reply({ content: `${interaction.user.username} has joined. There are now ${players.length} players.` });

            const updatedRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('join')
                        .setLabel('Join Game')
                        .setStyle(ButtonStyle.Primary)
                );

            const message = await interaction.channel.messages.fetch(interaction.message.id);
            await message.edit({ components: [updatedRow] });
        }
    }
});

// Log in to Discord with your client's token
client.login(token);
