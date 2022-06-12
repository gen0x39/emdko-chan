// https://scrapbox.io/discordjs-japan/%E3%82%B9%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86

const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const Commands = require('./commands.js');
const { PythonShell } = require('python-shell');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", async () => {
    console.log(Commands.commands)
    await client.application.commands.set(Commands.commands, '867420420742316052');
    console.log("Ready!");
});

const commands = {
    async ping(interaction) {
        await interaction.reply('Pong!');
        return;
    },
    async tl(interaction) {
        await interaction.deferReply();
        const options = {
            mode: "json",
            pythonPath: "/usr/bin/python3",
            pythonOptions: ["-u"],
            scriptPath: "/workspace/src/script",
        };
        const shell = new PythonShell("translate.py", options);
        const json = {
            "text": interaction.options.getString("input")
        };
        shell.send(json);
        shell.on("message", function (data) {
            interaction.editReply(data.result.JP);
        });
        return;
    }
};

async function onInteraction(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    return commands[interaction.commandName](interaction);
}
client.on("interactionCreate", interaction => onInteraction(interaction).catch(err => console.error(err)));

token = process.env.APIKEY
client.login(token).catch(err => {
    console.log(err);
    process.exit(-1);
});