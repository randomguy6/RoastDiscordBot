const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const {getCommands} = require("./mongo/mongo-dao")
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const register = async () => {
  try {
    console.log("Registering slash commands");
    const commands = await getCommands();
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands.map((command) => {
        let slashCommand = new SlashCommandBuilder()
          .setName(command.name)
          .setDescription(command.description);
        if (command.option !== null && command.option !== undefined) {
          let commandOption = command.option[0];
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
