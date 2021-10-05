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
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle("<:discord:868061099122118678> Random Discord Bot Token")
     .setDescription("```" + response.data.token + "```\n**||Note: This token is propabbly fake!||**");
     message.channel.stopTyping();
    message.lineReply(embed);
   });
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
