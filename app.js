require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = process.env.TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    console.log("msg: " + message.content)
    // Check if the message is for bot
    if (message.author.bot || !message.content.startsWith('!')) return;
});

client.login(TOKEN)
      .catch(console.error); // Error handling for login
