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

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    else if (interaction.commandName === 'tl') {
        await interaction.deferReply();
        const options = {
            mode: "json",
            pythonPath: "/usr/bin/python3",
            pythonOptions: ["-u"],
            scriptPath: "/workspace/src/script",
          };
        var shell = new PythonShell("script.py", options);
        console.log(interaction.options.getString('input'))
        const json = {
            "name": "tachiba7",
            "text": interaction.options.getString('input')
        };
        shell.send(json);
        shell.on('message', function (data) {
            console.log(JSON.stringify(data, null, 2));
            console.log(data.result.JP)
            interaction.editReply(data.result.JP);
        });
    }
});

token = process.env.APIKEY
client.login(token);