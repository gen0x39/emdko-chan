// https://scrapbox.io/discordjs-japan/%E3%82%B9%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86

const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const Commands = require('./commands.js');
const { PythonShell } = require('python-shell');
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


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
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: '翻訳結果'})
            .addFields(
                { name: 'Input', value: interaction.options.getString("input"), inline: false },
                { name: '-> JP', value: data.result.JP, inline: false },
                { name: '-> EN', value: data.result.EN, inline: false },
                { name: '-> KO', value: data.result.KO, inline: false },
                { name: '-> CN', value: data.result.CN, inline: false },
                { name: '-> TW', value: data.result.TW, inline: false },
            )
            interaction.editReply({ embeds: [exampleEmbed]});
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