const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "dashboard",
 aliases: [],
 description: "Provide link to the web-dashboard",
 category: "General",
 usage: "dashboard",
 run: async (client, message, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle(":pleading_face: Sorry!")
     .setDescription("Our dashboard is not working at the moment, please try again later! We are sorry...")
     .setColor("RANDOM")
    return message.lineReply(embed);
   }
   if (message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle("<:happyrabbit:868230223961919548> Hurray!")
     .setDescription("🔗 **| Here's Your server link:** " + process.env.DOMAIN + "/dashboard/" + message.guild.id + "\n🔗 **| Dashboard link:** " + process.env.DOMAIN)
     .setColor("RANDOM")
    message.lineReply(embed);
   } else {
    const embed = new Discord.MessageEmbed()
     .setTitle("<:happyrabbit:868230223961919548> Hurray!")
     .setDescription("🔗 **| Our dashboard link:** " + process.env.DOMAIN)
     .setColor("RANDOM")
    message.lineReply(embed);
   }
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
