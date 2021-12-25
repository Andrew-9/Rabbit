const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "hug",
 aliases: [],
 description: "Give a hug to mention user",
 category: "Fun",
 usage: "hug <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return message.lineReply("<:xvector:869193619318382602> **| You must mention someone to hug...**");
    }
    if (user == message.author) {
     return message.lineReply({
      embed: {
       color: 5294200,
       description: "<:winkingface:869178569606193192> **You can't hug yourself but. Ok, get the hug from me ( ^o^ ) !**",
      },
     });
    }
    if (user == client.user) {
     return message.lineReply({
      embed: {
       color: 5294200,
       description: "<:winkingface:869178569606193192> **Oh, you tried to hug me but u can't. for I'm not real. But I can hug you ( ^o^ )**",
      },
     });
    }
    message.channel.startTyping();
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle(user.username + " Just got a hug from " + message.author.username, message.guild.iconURL({dynamic: true,format: "png"}))
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription(user.toString() + " Got a hug from " + message.author.toString())
     .setFooter(
      "Requested by " + `${message.author.username}` + " • (this is so cute ＼( ^o^ )／)",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
    message.channel.stopTyping();
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
  })();
 },
};
