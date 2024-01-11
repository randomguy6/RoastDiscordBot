const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

class Option {
  constructor(name, description, required = true) {
    this.name = name;
    this.description = description;
    this.required = required;
  }
}

class Command {
  constructor(name, description, option = null) {
    this.name = name;
    this.description = description;
    this.option = option;
  }
}

const commands = [
  new Command("insult", "I will insult Isaiah"),
  new Command(
    "newinsult",
    "What else do you want me to say?",
    new Option("phrase", "insult phrase")
  ),
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const register = async () => {
  try {
    console.log("Registering slash commands");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands.map((command) => {
        let slashCommand = new SlashCommandBuilder()
          .setName(command.name)
          .setDescription(command.description);
        if (command.option != null || command.option != undefined) {
          let commandOption = command.option;
          slashCommand.addStringOption(option => 
            option
              .setName(commandOption.name)
              .setDescription(commandOption.description)
              .setRequired(commandOption.required)
          );
        }
        return slashCommand;
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register: register,
};
