const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

bot.once('ready', () => {
    bot.user.setActivity(`Custom Status Here`, { type: "WATCHING"})
    console.log('Online');    
});

bot.on('message', async (message) => {
    let prefix = config.prefix
    const [cmd, ...args] = message.content.split(/\s/)
    if (cmd === prefix + 'hello') {
  message.channel.send('Yes, Hi im on!!!');
} 
  if(message.content.startsWith(prefix + 'test')){
    const embed1 = new Discord.MessageEmbed()
    .setTitle('test embed')
    .setDescription('some important text')
    .addField('Github-repo', '**[Click here](https://github.com/BlackKnight683/Discord-Bot-Template)**')
    .setFooter('Made by oofy')
    .setColor('RED')
    
    await message.channel.send(embed1); //The embed1 or whatever variable you put in const embed1 must go in the (embed1) spot.
  }
}
)

bot.login(config.token);
