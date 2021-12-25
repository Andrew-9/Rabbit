const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');

module.exports = {
 name: "invite",
 aliases: [],
 description: "Invite me to your server",
 category: "General",
 usage: "invite",
 run: async (client, message, args) => {
  try {
    let inviteme = new MessageButton().setStyle("url").setLabel("Invite").setURL("https://discord.com/oauth2/authorize?client_id=734522699228905585&permissions=8&scope=bot%20applications.commands")
    let mywebsite = new MessageButton().setStyle("url").setLabel("Website").setURL("https://rabbit.fumigram.com")
    let support = new MessageButton().setStyle("url").setLabel("Support").setURL("https://discord.com/invite/ghdvMDVFse")
    var buttonarray = [inviteme, mywebsite, support]  
    const invitee = new Discord.MessageEmbed()
    .setTitle(`RABBIT BOT`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("#ff690e")
    .setDescription(`
    Invite me to your server using [Link](https://discord.com/oauth2/authorize?client_id=734522699228905585&permissions=8&scope=bot%20applications.commands)
    Website for some details about me [Info](https://rabbit.fumigram.com/)
    Vote for me using links [Void](https://voidbots.net/bot/734522699228905585/), [Bot List](https://discordbotlist.com/bots/rabbit-1895), [Boats](https://discord.boats/bot/734522699228905585), [Milrato Bots](https://botlist.milrato.eu/bot/734522699228905585)
    `)
    .setFooter(`~${client.user.username} created by ${config.author}`, config.Kotlin);
   return message.channel.send({ embed: invitee, buttons: buttonarray });
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
