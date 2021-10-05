const Discord = require("discord.js");

module.exports = {
 name: "sneeze",
 aliases: [],
 description: "Achoo!",
 category: "Fun",
 usage: "sneeze",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const sneezes = ["***Achoo!***", "*chew!*", "Ah... Ah... **A_CHOO!_**", "_Ah..._***CHOOOOOOOOOOOOOOOOOOOO!***", "*Achoo!* Excuse me!"];
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(sneezes[Math.floor(Math.random() * Math.floor(sneezes.length))])
   message.channel.stopTyping();
   message.lineReply(embed);
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
