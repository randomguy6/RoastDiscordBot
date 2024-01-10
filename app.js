require('dotenv').config();
const { log } = require('console');
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client(
    {
        intents:
            [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent
            ]
    }
);

client.on("ready", () => {
    console.log(`What's up ${client.user.tag}!`)
});

client.on('interactionCreate', async interaction => {
    console.log(interaction)
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});


client.login(process.env.DISCORD_TOKEN);