module.exports = {
    name: 'help',
    args: 'commandName',
    description: 'Shows the commands that the bot can execute, can also help with a specific command if the command name is put after it',
    argsDescription: {
        'commandName': 'name of the command to view arguments'
    },
    execute(message, args, client,result) {
        comhelp = args.shift();
        if (comhelp == undefined) {
            const commandshelp = "";
            let iter = client.commands.size;
            for (const [name, command] of client.commands) {
                result += (((!--iter) ? "└► " : "├► ") + commandshelp + command.name + " " + command.args + " : " + command.description) + "\n";
            }
        } else {
            comhelp = comhelp.toLowerCase();
            if (client.commands.get(comhelp) != undefined) {
                const commandi = client.commands.get(comhelp);
                result += ("├► Command " + commandi.name) + "\n";
                result += ("├► " + commandi.description) + "\n";
                const arguments = commandi.args.split(/ +/);
                let iter = arguments.length;
                if (commandi.args === '') {
                    result += ("└► No Args") + "\n";
                } else {
                    for (const arg of arguments) {
                        if (iter == arguments.length) {
                            result += ("├► Args(" + iter + "):") + "\n";
                        }
                        const argDesc = commandi.argsDescription[arg];
                        result += (((!--iter) ? "└───► " : "├───► ") + arg + " : " + argDesc) + "\n";
                    }
                }
            } else {
                result += ("└ Command not recognized : " + args) + "\n";
            }
        }
        return result;
    }
}