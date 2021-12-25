const Discord = require("discord.js");

module.exports = {
 name: "flipcoin",
 aliases: [],
 description: "Flip a virtual coin",
 category: "Fun",
 usage: "flipcoin",
 run: async (client, message, args) => {
  try {
   const answers = ["Heads", "Tails"];
   const answer = answers[Math.floor(Math.random() * answers.length)];
   message.channel.startTyping();
   message.lineReply(`🪙 I got: **\`${answer}\`**`);
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
