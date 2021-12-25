const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');

module.exports = {
 name: "vote",
 aliases: [],
 description: "Vote for rabbit if you love him",
 category: "General",
 usage: "vote",
 run: async (client, message, args) => {
  try {   
    const vote = new Discord.MessageEmbed()
    .setTitle("<:happyrabbit:868230223961919548> RABBIT")
    .setDescription(`
    You can vote for rabbit with this links he'd love that **(✿◠‿◠)**
    `)
    .setImage("https://media.discordapp.net/attachments/711910361133219903/890541307913728000/1606743425111.jpg?width=851&height=613")
    .setColor("ff6900")
    .setFooter("Crafted with love by Kotlin#0427", config.Kotlin)
    let discordboat = new MessageButton().setStyle("url").setLabel("DISCORD BOATS").setURL("https://discord.boats/bot/734522699228905585")
    let voidbot = new MessageButton().setStyle("url").setLabel("VOID BOTS").setURL("https://voidbots.net/bot/734522699228905585/")
    let botlist = new MessageButton().setStyle("url").setLabel("DISCORD BOT LIST").setURL("https://discordbotlist.com/bots/rabbit-1895")
    //let rabbit = new MessageButton().setStyle("url").setLabel("TOP.GG").setURL("https://rabbit.fumigram.com")

    var buttonarray = [discordboat, voidbot, botlist]  

    let Fmessage = await message.channel.send({ embed: vote, buttons: buttonarray });

  } catch (err) {
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
  }
 },
};
