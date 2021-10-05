const client = require("nekos.life");
const Discord = require("discord.js");
const neko = new client();

module.exports = {
 name: "cat-emoji",
 aliases: [],
 description: "Cats is cute",
 category: "Fun",
 usage: "cat-emoji",
 run: async (client, message, args) => {
 message.channel.startTyping();
  (async () => {
   try {
    let text = await neko.sfw.catText();
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(text.cat)
     message.channel.stopTyping();
    message.lineReply(embed);
   } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
   }
  })();
 },
};
