const { MessageEmbed } = require('discord.js');
const tempoDeUso = require("../utils/Tempo");
const texts = require("../utils/texts.json");

module.exports = {
    name: "userinfo",
    description: "Shows users informations",
    usage: '[command name]',
    execute(message, args) {

        if(args.length === 0){
            message.channel.send(this.MessageEmbedInfoUser(message.author));
        }
        else{
            message.channel.send(this.MessageEmbedInfoUser(message.mentions.users.first()));
        }
    },
        
    MessageEmbedInfoUser(user) {
        
        let activity = user.presence.activities[0];

        var data = {
            color: '#170B00',
            title: 'Infos de ' + user.username,
            description: ':stopwatch: Usuario a aprximadamente ' + tempoDeUso(user.createdTimestamp),
            timestamp: new Date().getTime(),
            thumbnail: {
                url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
            },
            footer: {
                text: 'ID: ' + user.id
            }
        }

        const embed = new MessageEmbed(data);

        if (user.bot) {
            embed.addFields({
                name: 'Bot?',
                value: `Bip Bop, sou um bot! :robot:`
            })
        } else {
            embed.addFields({
                name: 'Bot?',
                value: 'Sou humano!'
            })
        }

        if (!user.bot) {
            embed.addField('\u200B', '\u200B');

            if(activity){
                switch (activity.type) {
                    case 'LISTENING':
                        embed.addField('Ouvindo  :musical_note:', activity.name, true); 
                        embed.addField('Musica :musical_score:', activity.details,true);
                        embed.addField('Artista :musical_keyboard:', activity.state, true);
                        break;
                    case 'PLAYING':
                        embed.addField('Jogando  :video_game:', activity.name,true);
                        embed.addField('Tempo de Jogo',tempoDeUso(activity.createdAt),true);
                        break;
                }
            }
            else {
                embed.addField('Fazendo:', 'Nada');
            }
        }

        return embed;
    }
}