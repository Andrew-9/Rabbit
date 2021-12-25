const Discord = require("discord.js");
const progressbar = require("percentagebar");

module.exports = {
 name: "ship",
 aliases: [],
 description: "Ship members",
 category: "Fun",
 usage: "ship <member> <member>",
 run: async (client, message, args) => {
  try {
   const user1 = args[0];
   if (!user1) {
    return message.lineReply("<:xvector:869193619318382602> **| Please mention a user to ship!**");
   }
   const user2 = args[1];
   if (!user2) {
    return message.lineReply("<:xvector:869193619318382602> **| Please mention a secound user to ship!**");
   }
   const ship = Math.floor(Math.random() * 100) + 1;
   const bar = progressbar(100, ship, 10, "<:happyrabbit:868230223961919548>", "<:happyrabbit:868230223961919548>", "💔 ", " ❤️", false);
   const mehh = new Discord.MessageEmbed()
    .setTitle(":twisted_rightwards_arrows: This isn't a match")
    .setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1")
    .setDescription(`I shipped \`${user1}\` with \`${user2}\` and it is \`${ship}\`%\n\`${bar}\``)
    .setColor("RED");
   const love = new Discord.MessageEmbed()
    .setTitle(
     ":twisted_rightwards_arrows: They are born for each others!",
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it's **${ship}%**\n${bar}`)
    .setColor("GREEN");
   if (ship > 50) {
    message.lineReply(love);
   } else {
    message.lineReply(mehh);
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
