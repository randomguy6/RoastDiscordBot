require('dotenv').config();
const { log } = require('console');
const { Client, GatewayIntentBits, Events, SlashCommandBuilder } = require("discord.js");
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

client.on(Events.ClientReady, () => {
    console.log(`What's up ${client.user.tag}!`)
});

client.on(Events.MessageCreate, async (message) => {
    console.log(message.content);
});


client.login(process.env.DISCORD_TOKEN);