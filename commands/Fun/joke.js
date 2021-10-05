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
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
   }
  })();
 },
};
