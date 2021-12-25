const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require("../../config");

module.exports = {
 name: "uptime",
 aliases: ["bot", "botuptime"],
 description: "Display's the bot uptime",
 category: "General",
 usage: "uptime",
 run: async (client, message, args) => {
  try {
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const date = new Date();
   const timestamp = date.getTime() - Math.floor(client.uptime);
   const embed = new Discord.MessageEmbed()
    .setAuthor("RABBIT BOT UPTIME", client.user.displayAvatarURL())
    .setDescription(`
    <:bluepointer:897839647034601492> **Uptime** - \`${duration}\`
    <:bluepointer:897839647034601492> **Date Restarted ** - \`${moment(timestamp).format("LLLL")}\`
    `)
    .setTimestamp()
    .setFooter(client.user.username + ` - by Kotlin#0427`, config.Kotlin)
    .setColor("00efff");
   message.channel.send(embed);
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
