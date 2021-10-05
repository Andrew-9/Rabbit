const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "trash",
 aliases: [],
 description: "Trash?",
 category: "Image",
 usage: "trash [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = await message.lineReply("✨ **Generating Image.**");
   const trash = await canvacord.Canvas.trash(
    User.user.displayAvatarURL({
     dynamic: false,
     format: "png",
     size: 2048,
    })
   );
   const attachment = new Discord.MessageAttachment(trash, "trash.png");
   message.channel.send(attachment);
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
