const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "3000years",
 aliases: ["3kyears", "3ky"],
 description: "3000 Years later",
 category: "Image",
 usage: "3000years [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = await message.lineReply("✨ **Generating Image.**");
   message.channel.startTyping();
   const buffer = await AmeAPI.generate("3000years", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048,
    }),
   });
   const attachment = new Discord.MessageAttachment(buffer, "3000years.png");
   message.channel.stopTyping();
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
