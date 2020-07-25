const Discord  = require("discord.js");
const discord_integration = require("./vault/discord-integration.js");

const client = new Discord.Client();

const preffix = "--";

const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
}


client.once('ready', ()=>{
    console.log("Aleks bot is online");
});

client.on('message', message =>{

    if(!message.content.startsWith(preffix) || message.author.bot) return;
    message.channel.send("├► analysing command");
    const args = message.content.slice(preffix.length).split(/ +/);
    
    const command = args.shift().toLowerCase();

    if(client.commands.get(command) != undefined){
        client.commands.get(command).execute(message,args,client);
    }else{
        message.channel.send("└► command not recognized");
    }

});

client.login(discord_integration.token);