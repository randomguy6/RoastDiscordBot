require('dotenv').config();
const { Client, IntentsBitField, Events } = require("discord.js");
const register = require("./src/register-commands")
const getStupidReply = require("./src/stupidreplies")
const client = new Client(
    {
        intents:
            [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
                IntentsBitField.Flags.GuildMessageTyping
            ]
    }
);

client.once(Events.ClientReady, () => {
    console.log(`What's up ${client.user.tag}!`)
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.username === 'samuraikirby7') {
        message.reply('U a bitch')
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if(interaction.commandName === 'insult'){
        interaction.reply(getStupidReply.getStupidReply())
    } else {
        interaction.reply("You stupid fuck. This doesn't do anything")
    }
});

register.register()

client.login(process.env.DISCORD_TOKEN);