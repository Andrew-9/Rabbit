const Discord = require("discord.js");
const shorten = require("isgd");
const { MessageButton, default: discordButtons, MessageActionRow } = require("discord-buttons");

module.exports = {
 name: "shortener",
 aliases: ["url-shortener", "link-shortener"],
 description: "Shorter a url",
 category: "Utility",
 usage: "shortener <link>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> **| Please provide a link!**");
   }
   shorten.shorten(args[0], function (res) {
    message.channel.startTyping();
    const urldone = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("Your shortened URL")
     .setDescription(`**Your url is:** **${res}**\n`);
    const url_button = new MessageButton()
     .setStyle("url")
     .setLabel(`go to ${res}`)
     .setURL(`${res}`)
     .setEmoji("🤖");
     message.channel.stopTyping();
    message.lineReply(urldone, url_button);
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
