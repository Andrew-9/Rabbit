const Discord = require("discord.js");

module.exports = {
 name: "id",
 aliases: ["get-id"],
 description: "Display a mentioned user ID (Yes, you can copy this directly from Discord too)",
 category: "Moderation",
 usage: "id <mention>",
 run: async (client, message, args) => {
  try {
   const mention = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   if (!mention) {
    return message.lineReply("<:xvector:869193619318382602> **| You must mention a user!**");
   }
   const userid = new Discord.MessageEmbed()
    .setThumbnail(mention.user.avatarURL())
    .setColor("RANDOM")
    .setDescription("**Here is " + `${mention.user.username} ID -** \`` + mention.id + "`");
   message.lineReply(userid);
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
