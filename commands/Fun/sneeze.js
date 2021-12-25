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
   const sneezes = ["**Achoo!**", "*chew!*", "Ah... Ah... **A_CHOO!_**", "_Ah..._**CHOOOOOOOOOOOOOOOOOOOO!**", "**Achoo!** Excuse me!"];
   message.channel.send(sneezes[Math.floor(Math.random() * Math.floor(sneezes.length))]);
   message.channel.stopTyping();
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
