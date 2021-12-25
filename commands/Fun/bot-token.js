const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "bot-token",
 aliases: ["discord-token", "discord-bot-token"],
 description: "Generate (fake) random Discord Bot token",
 category: "Fun",
 usage: "bot-token",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/bottoken",
   };
   axios.request(options).then((response) => {
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("<:checkvector:869193650184269834> Random Discord Bot Token")
     .setDescription("```" + response.data.token + "```\n**||Note: This token is propabbly fake!||**");
     message.channel.stopTyping();
    message.lineReply(embed);
   });
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
