const { prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js');
const texts = require("../utils/texts.json");

module.exports = {
	name: 'help',
	description: 'Lista de comandos disponíveis',
	execute(message, args) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {            
            return message.channel.send(MessageEmbedHelp(message, args))
        }
	},
};

function MessageEmbedHelp(message, args)
{
    const bot = message.client.user;
    var data = {
        color: '#170B00',
        timestamp: new Date().getTime(),
        footer: {
            text: bot.username,
            iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
        },
        fields: [{
            name: 'Comandos disponíveis',
            value: texts.commands
        }]
    }

    const embed = new MessageEmbed(data);

    return embed;
}