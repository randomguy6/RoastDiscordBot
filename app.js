require('dotenv').config();
const { Client, GatewayIntentBits, Events, SlashCommandBuilder } = require("discord.js");
const client = new Client(
    {
        intents:
            [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
    }
);

client.on(Events.ClientReady, () => {
    console.log(`What's up ${client.user.tag}!`)
});

client.on(Events.MessageCreate, async (message) => {
    console.log(message);
    if(message.author.username === 'thegolfdude'){
        message.reply('U a bitch')
    }
});



client.login(process.env.DISCORD_TOKEN);