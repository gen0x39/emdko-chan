const Discord = require('discord.js');
const { totalmem } = require('os');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'こんにちは') {
    msg.reply('こんにちは、'+msg.author.username+'さん');
  }
});
token = process.env.APIKEY
client.login(token);