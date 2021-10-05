const Discord = require("discord.js");

module.exports = {
 name: "unban",
 aliases: ["ub"],
 description: "Unbans a member from the server",
 category: "Moderation",
 usage: "unban <user> [reason]",
 run: async (client, message, args) => {
  try {
   if(!message.member.hasPermission("BAN_MEMBERS")) {
      const Nopermission8 = new Discord.MessageEmbed()
      .setColor("#f04949")
      .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
      .setDescription(`**You don't have permissions to unban members!**`)
      .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
      .setTimestamp();
      return message.channel.send(Nopermission8);
   }
   const id = args[0];
   const rgx = /^(?:<@!?)?(\d+)>?$/;
   if (!id) {
    return message.lineReply("<:xvector:869193619318382602> **| Please provide user id!**");
   }
   if (!rgx.test(id)) {
    return message.lineReply("<:xvector:869193619318382602> **| Please provide vaild user id!**");
   }
   const bannedUsers = await message.guild.fetchBans();
   const user = bannedUsers.get(id).user;
   if (!user) {
    return message.lineReply("<:xvector:869193619318382602> **| Unable to find user, please check the provided ID**");
   }
   let reason = args.slice(1).join(" ");
   if (!reason) reason = "`None`";
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   await message.guild.members.unban(user, reason);
   const embed = new MessageEmbed()
    .setTitle("Unbanned Member")
    .setDescription(`${user.tag} was successfully unbanned.`)
    .addField("Unnbaned by", message.member, true)
    .addField("Member", user.tag, true)
    .addField("Reason", reason)
    .setFooter(
     message.member.displayName,
     message.author.displayAvatarURL({
      dynamic: true,
     })
    )
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
   message.lineReply(embed);
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
