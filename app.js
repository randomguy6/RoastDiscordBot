require("dotenv").config();
const { Client, IntentsBitField, Events } = require("discord.js");
const commands = require("./src/register-commands");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageTyping,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`What's up ${client.user.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.username === "samuraikirby7") {
    console.log("Isaiah said something");
    stupidReply.getStupidReply().then((insult) => message.reply(insult));
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  commands.handleCommand(interaction);
});

commands.register();

client.login(process.env.DISCORD_TOKEN);
