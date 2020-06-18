const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Loop over all command files and add them to the client commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the collection with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

// Startup
client.once('ready', () => {
    console.log('Ready!');
});

// Login
client.login(token);

// Command entry point
client.on('message', async message => {
    // CP: Check if the message contains the proper prefix and is not from the bot itself.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Actual command parsing
    const args = message.content.slice(prefix.length).match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
    const commandName = args.shift().toLowerCase();

    // Get the actual command object
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    // C1: Check if the command is executed in a server
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I cannot execute that command inside DM\'s');
    }

    // C2: Check arguments
    if (command.args && !args.length) {
        let reply = 'Arguments are required but not provided';
        // Reply with usage instructions if present
        if (command.usage) {
            reply += `\nUsage: \`${prefix}${commandName} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // C3: Check cooldowns
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // Finally try to execute the command
    try {
        command.execute(message, args);
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command');
    }
});