const { MessageEmbed, Collection} = require('discord.js');
const texts = require("../utils/texts.json");
const emojis = require("../utils/emoji.json");

module.exports = {

    name: "poll",
    description: "Votação!",

    async execute(message, args) {

        bot = message.client.user;
        icons = new Collection();
        //console.log(args)  //debug

        if (!args.length) {
            return message.channel.send(this.MessageEmbedPollConfig(bot));
        }

        const configCommand = args.shift();

        for (var x = 0; x < args.length; x++){
            icons.set(args[x], emojis[x]);
        }
        // console.log(icons); //debug

        switch (configCommand) {
            case "create":
                pollmsg = await message.channel.send(this.MessageEmbedPoll(bot, args, icons));
                break;
        }

        for (let cat of args){
            pollmsg.react(icons.get(cat).emoji);
        }
    },

    MessageEmbedPollConfig(bot) {

        const data = {
            color: '#170B00',
            title: 'Configure sua votação',
            timestamp: new Date().getTime(),
            footer: {
                text: bot.username,
                iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
            },
            fields: [{
                name: 'Adicionando categorias',
                value: texts.categorias
            }]
        }

        const embed = new MessageEmbed(data);

        return embed;

    },

    MessageEmbedPoll(bot, args, icons) {

        const data = {
            color: '#170B00',
            title: 'Votação!',
            timestamp: new Date().getTime(),
            footer: {
                text: bot.username,
                iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
            },
            fields: [{
                name: "Vote através das reações!",
                value: "Obs: O discord não permite criar reações com contagem 0, por isso o valor real da votação é o mostrado abaixo e não o número de reações"
            },{
                name: '\u200B',
                value: '\u200B'
            }]
        }

        const embed = new MessageEmbed(data);

        for (let cat of args){
            embed.addField(`${icons.get(cat).emoji} \n${cat}`, 0 , true)
        }

        embed.addField('\u200B', '\u200B');
        embed.setDescription(args.length);

        return embed;
    }
}