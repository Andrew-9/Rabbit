const Discord = require("discord.js");

module.exports = {
 name: "kick",
 aliases: [],
 description: "Kicks a member from guild",
 category: "Moderation",
 usage: "kick <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("KICK_MEMBERS")) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`**You don't have permissions to kick members!**`)
    .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
    .setTimestamp();
    return message.channel.send(Nopermission8);
   }
   let mentioned = await message.mentions.members.first();
   let reason = await args.slice(1).join(" ");
   if (!mentioned) {
    return await message.lineReply("<:xvector:869193619318382602> **| Mention a valid member!**");
   }
   if (!mentioned.kickable) {
    return await message.lineReply("<:xvector:869193619318382602> **| You cannot kick this member!**");
   }
   if (message.author === mentioned) {
    return await message.lineReply("<:xvector:869193619318382602> **| You can't kick yourself!**");
   }
   if (!reason) {
    reason = "You did not provide one.";
   }
   mentioned.kick(reason);
   await message.lineReply("<:rabbitsmirk:868230245176713266> **| " + mentioned.displayName + " has been kicked. | Reason: " + reason + "!**");
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
