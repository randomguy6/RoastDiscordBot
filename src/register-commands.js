const {REST, Routes, SlashCommandBuilder} = require("discord.js");
const mongoDao = require("./mongo/mongo-dao");
const commandService = require("./services/commands-service");
const profanityService = require("./services/profanity-service");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PROFILE = process.env.PROFILE;

const rest = new REST({version: "10"}).setToken(DISCORD_TOKEN);

async function register() {
    try {
        const commands = await mongoDao.getCommands();
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
                .filter(
                    (command) =>
                        command.visibility === "LIVE" ||
                        (command.visibility === "DEVELOPER" && PROFILE === "DEVELOPER")
                )
                .map((command) => {
                    console.log(`Registering the "${command.name}" command`);
                    let slashCommand = new SlashCommandBuilder()
                        .setName(command.name)
                        .setDescription(command.description);
                    if (command.option !== null && command.option !== undefined) {
                        let commandOption = command.option[0];
                        slashCommand.addStringOption((option) =>
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
}

function handleCommand(interaction) {
    const commandName = interaction.commandName;
    if (commandName === "insult") {
        commandService.insult().then((insult) => interaction.reply(insult));
    } else if (commandName === "newinsult") {
        interaction.reply(
            commandService.addNewInsult(
                interaction.options._hoistedOptions[0].value,
                interaction.user.username
            )
        );
    } else if (commandName === "insult_who") {
        interaction.reply(
            commandService.insultNewUser(interaction.options._hoistedOptions[0].value)
        );
    } else if (commandName.includes("profanity")) {
        profanityService.handleCommand(commandName, interaction.guildId, interaction.channelId).then(resp => interaction.reply(resp));
    } else {
        interaction.reply(
            "You stupid fuck. I don't know what to fucking do about this!"
        );
    }
}

module.exports = {
    register: register,
    handleCommand: handleCommand,
};
