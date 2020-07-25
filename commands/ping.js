module.exports = {
    name:'ping',
    args:'',
    description: 'responds with "pong"',
    argsDescription: {},
    execute(message,args){
        message.channel.send("└► pong").catch(console.error);
    }
}