const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "posterize",
 aliases: [],
 description: "Posterize the user avatar",
 category: "Image",
 usage: "posterize [user mention, user id, user name] [posterize]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   const posterize = args[0] || 9;
   if (!User) {
    return message.lineReply("<:xvector:869193619318382602> **| Please mention a user!**");
   }
   if (isNaN(args[0])) {
    return message.lineReply("<:xvector:869193619318382602> **| Posterize must be a number!**");
   }
   if (message.content.includes("-")) {
    return message.lineReply("<:xvector:869193619318382602> **| Posterize cannot be negative!**");
   }
   if (args[0] < 2) {
    return message.lineReply("<:xvector:869193619318382602> **| Posterize must be higher than 2!**");
   }
   if (args[0] > 40) {
    return  message.lineReply("<:xvector:869193619318382602> **| Posterize must be lower than 40!**");
   }
   const wait = await message.lineReply("✨ **Generating Image.**");
   const buffer = await AmeAPI.generate("posterize", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048,
    }),
    posterize: posterize,
   });
   const attachment = new Discord.MessageAttachment(buffer, "posterize.png");
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
