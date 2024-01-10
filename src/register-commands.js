const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN)
const commands = new SlashCommandBuilder()
    .setName('insult')
    .setDescription('I will insult Isaiah')

const register = async () => {
    try {
        console.log('Registering slash commands')
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {
                body: [commands.toJSON()]
            }
        );
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    register : register
};