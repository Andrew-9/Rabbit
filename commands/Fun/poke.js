const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "poke",
 aliases: [],
 description: "Poke user",
 category: "Fun",
 usage: "poke <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return message.lineReply("<:xvector:869193619318382602> **| You must mention someone to poke!**");
    }
    if (user == message.author) {
     return message.lineReply("<:What:868050544151900170> **| You can't poke yourself tfu!**");
    }
    if (user == client.user) {
     return message.lineReply("🤦 **| Oh, you tried to poke me but u cant hehe (hopefully)**");
    }
    message.channel.startTyping();
    const response = await fetch("https://nekos.life/api/v2/img/poke");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setAuthor(
      user.username + " just got poked by " + message.author.username,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription(user.toString() + " **got a poke from** " + message.author.toString())
     .setFooter(
      "Requested by " + `${message.author.username}` + " • (rip)",
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
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
   }
  })();
 },
};
