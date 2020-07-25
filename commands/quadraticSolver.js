module.exports = {
    name:'quadsolver',
    args:'a b c',
    description: 'solves a quadratic equation',
    argsDescription: {
        "a":"the a component of the equation",
        "b":"the b component of the equation",
        "c":"the c component of the equation",
    },
    execute(message,args){
        const a = args.shift();
        const b = args.shift();
        const c = args.shift();
        if(a==undefined || b==undefined || c==undefined){
            message.channel.send("└► quadratic solver needs an a, b and c to solve the equation");
        }else{
            message.channel.send("├► quadratic solver arguments: a="+a+" , b="+b+ " , c="+c);
        }
    }
}