const {
	Client,
	Collection
} = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Client();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(config.token);

client.once('ready', () => {
	bot = client.user;
	client.user.setPresence({
		activity: {
			name: '>help'
		},
		status: 'online'
	})
	console.log('tamo on');
});

client.on('message', message => {

	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(" ");
	const commandName = args.shift().toLowerCase();

	// console.log(commandName);

	const command = client.commands.get(commandName);

	// console.log(command);

	if (!command) return;

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Não foi possível executar esse comando! 😞');
	}
});

client.on('messageReactionAdd', (reaction, user) => {
	// console.log(reaction.emoji)

	if (user.bot) return;

	msg = reaction.message;
	var poll = msg.embeds[0];
	var index = 0;

	for (let field of poll.fields) {
		if (field.name.startsWith(reaction.emoji.name)) {
			index = poll.fields.indexOf(field);
		}
	}

	msg.edit({
		content: `Ultima atualização a ${new Date().toLocaleTimeString()}`,
		embed: poll.spliceFields(
			index,
			1, {
				name: poll.fields[index].name,
				value: reaction.count - 1,
				inline: true
			}
		)
	});
})