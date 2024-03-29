require("dotenv").config();
const { Client, IntentsBitField, Events } = require("discord.js");
const commands = require("./src/register-commands");
const stupidReply = require("./src/stupid-replies")

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
    stupidReply.getStupidReply(null, null, true).then((insult) => message.reply(insult));
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  commands.handleCommand(interaction);
});

commands.register().then(() => console.log("Done registering slash commands!"));

client.login(process.env.DISCORD_TOKEN).then(() => console.log("App has logged into discord"));
