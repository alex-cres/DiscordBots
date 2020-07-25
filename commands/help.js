module.exports = {
    name: 'help',
    args: 'commandName',
    description: 'Shows the commands that the bot can execute, can also help with a specific command if the command name is put after it',
    argsDescription: {
        'commandName': 'name of the command to view arguments'
    },
    execute(message, args, client) {
        comhelp = args.shift();
        if (comhelp == undefined) {
            const commandshelp = "";
            let iter = client.commands.size;
            for (const [name, command] of client.commands) {
                message.channel.send(((!--iter) ? "└► " : "├► ") + commandshelp + command.name + " " + command.args + " : " + command.description);
            }
        } else {
            comhelp = comhelp.toLowerCase();
            if (client.commands.get(comhelp) != undefined) {
                const commandi = client.commands.get(comhelp);
                message.channel.send("├► Command " + commandi.name);
                message.channel.send("├► " + commandi.description);
                const arguments = commandi.args.split(/ +/);
                let iter = arguments.length;
                if (commandi.args === '') {
                    message.channel.send("└► No Args");
                } else {
                    for (const arg of arguments) {
                        if (iter == arguments.length) {
                            message.channel.send("├► Args(" + iter + "):");
                        }
                        const argDesc = commandi.argsDescription[arg];
                        message.channel.send(((!--iter) ? "└───► " : "├───► ") + arg + " : " + argDesc);
                    }
                }
            } else {
                message.channel.send("└ Command not recognized : " + args);
            }
        }
    }
}