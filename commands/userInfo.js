module.exports = {
    name: 'userInfo',
    args: '[user]',
    aliases: ['user', 'uid'],
    description: 'Shows detailed info about the user, or a specific user',
    argsDescription: {
        "[user]": "(optional) The username to search info"
    },
    execute(message, args, client, result) {
        let firstArgs = args.shift();
        if (firstArgs == undefined) {
            let user = message.member.user;
            return result + ("└► "+JSON.stringify(user));

        } else {
            let user = client.users.cache.find(r => r.username == firstArgs);
            return result + ("└► "+JSON.stringify(user));
        }

    }
}

