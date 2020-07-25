module.exports = {
    name:'kick',
    args:'personName',
    description: 'Kicks a person from the server',
    argsDescription: {
        'personName':'name of the person to kick'
    },
    execute(message,args,client,result){
            return  result+"└► WIP";
    }
}