module.exports = {
    name: 'ping',
    args: '',
    aliases: ['p','-'],
    description: 'responds with "pong"',
    argsDescription: {},
    execute(message, args, client, result) {
        return result + "└► pong";
    }
}