const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = 'insert later 5/22/2024';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messaage', message => {
    if (message.content === '!startgame') {
        message.channel.send('Starting a new game of PolyLife!');
    }
});

client.login(TOKEN);