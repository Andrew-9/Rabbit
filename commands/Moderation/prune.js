const Discord = require("discord.js");

module.exports = {
 name: "prune",
 aliases: ["clear", "purge", "pruge", "purne", "clean", "trash"],
 description: "Removes up to 100 messages",
 category: "Moderation",
 usage: "prune <amount>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`**You don't have permissions to prune messages!**`)
    .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
    .setTimestamp();
    return message.channel.send(Nopermission8).then(msg => msg.delete({timeout: 3000}));
   }
   if (isNaN(args[0])) {
     return await message.lineReply("<:xvector:869193619318382602> **| Please input a vaild number!**");
   }
   if (args[0] > 100) {
     return await message.lineReply("<:xvector:869193619318382602> **| Insert a number less than 100!**");
   }
   if (args[0] < 2) {
     return await message.lineReply("<:xvector:869193619318382602> **| Insert a number more than 1!**");
   }
   await message.delete();
   await message.channel.bulkDelete(args[0]).then((messages) => {
   message.channel.send("<:xtrash:869668999582056448> **| Deleted " + `\`${messages.size}/${args[0]}\`` + " messages.**").then(msg => msg.delete({timeout: 7000}));
   });
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
