module.exports = {
    name: 'kick',
    args: 'personName',
    aliases: ['k','ki'],
    description: 'Kicks a person from the server',
    argsDescription: {
        'personName': 'name of the person to kick'
    },
    execute(message, args, client, result) {
        const member = message.member;

        if(member.permissions.has("KICK_MEMBERS")){
            return result + "└► U HAZ PERMISSIONS BUT NO";
        }else {
            return result + "└► U HAZ NO PERMISSIONS";
        }
        
    }
}