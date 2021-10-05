const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "invite",
 aliases: [],
 description: "Invite me to your server",
 category: "General",
 usage: "invite",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setTitle(`<:happyrabbit:868230223961919548> YAY!`, message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
    .setColor("#ff690e")
    .setDescription(`<:happyrabbit:868230223961919548> **[Click this link to invite me!](https://discord.com/api/oauth2/authorize?client_id=734522699228905585&permissions=158913785591&scope=bot%20applications.commands)** **__[Recomended!]__**`)
    .setFooter(`~${client.user.username} created by ${config.author}`, config.Kotlin);
   return message.lineReply(embed);
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
