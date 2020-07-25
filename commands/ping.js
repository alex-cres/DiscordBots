module.exports = {
    name:'ping',
    args:'',
    description: 'responds with "pong"',
    argsDescription: {},
    execute(message,args,client,result){
        return result +"└► pong";
    }
}