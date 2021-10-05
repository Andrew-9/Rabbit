const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "slap",
 aliases: [],
 description: "Slap a user",
 category: "Fun",
 usage: "slap <user>",
 run: async (client, message, args) => {
  try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return message.lineReply("<:xvector:869193619318382602> **| Mention a valid member of this server!**");
   }
   if (message.author === member || message.member == member) {
    return await message.lineReply("<:xvector:869193619318382602> **| You cant slap yourself!**");
   }
   (async () => {
    message.channel.startTyping();
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new Discord.MessageEmbed() // Prettier()
     .setColor("RANDOM")
     .setTitle(member.user.username + " just got slapped by " + message.author.username)
     .setFooter(
      "That must hurt ._. | Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setImage(body.url);
     message.channel.stopTyping();
    message.lineReply(embed);
   })();
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
