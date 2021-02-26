const Discord = require("discord.js");
const { prefix, token } = require("./vault/discord-integration.json");

const client = new Discord.Client();

client.tictactoegameboard = [];
client.tictactoegameboardturn = 'x';
client.tictactoegameboardwins = {};
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
}


client.once('ready', () => {
    console.log("Aleks bot is online");
});

client.on('message', message => {
    let result = "";
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    result += ("├► analysing command") + "\n";
    const args = message.content.slice(prefix.length).split(/ +/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command != undefined) {
        
        try {
            result = command.execute(message, args, client, result);
        } catch (error) {
            result += ("└► command failed to execute due to:" + error);
        }
    } else {
        result += ("└► command not recognized");
    }
    message.channel.send(result);

});

client.login(token);