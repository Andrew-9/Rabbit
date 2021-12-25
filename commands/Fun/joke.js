const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "joke",
 aliases: ["dad-joke", "dadjoke"],
 description: "Display a random dad joke",
 category: "Fun",
 usage: "joke",
 run: async (client, message, args) => {
  (async () => {
   try {
    const response = await fetch("http://icanhazdadjoke.com/", {
     method: "get",
     headers: {
      Accept: "application/json",
     },
    });
    const body = await response.json();
    message.channel.startTyping();
    const embed = new Discord.MessageEmbed()
     .setTitle("Random Dad joke", message.guild.iconURL())
     .setDescription("Dad said: " + body.joke)
     .setColor("RANDOM")
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
