const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "baka",
 aliases: [],
 description: "You're a BAKA! or something like that",
 category: "Fun",
 usage: "baka",
 run: async (client, message, args) => {
 message.channel.startTyping();
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/baka");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle("Baka!")
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
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
