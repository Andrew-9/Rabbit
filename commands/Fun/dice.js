const Discord = require("discord.js");

module.exports = {
 name: "dice",
 aliases: [],
 description: "Roll a dice",
 category: "Fun",
 usage: "dice",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const answers = ["1", "2", "3", "4", "5", "6"];
   const dice = answers[Math.floor(Math.random() * answers.length)];
   message.channel.stopTyping();
   message.lineReply("🎲 The dice rolled **" + dice + "!**");
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
