const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cuddle",
 aliases: [],
 description: "Give a cuddle to mentioned user",
 category: "Fun",
 usage: "cuddle <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return message.lineReply("<:xvector2:869193716575911966> You must mention user to cuddle!");
    }
    if (user == message.author) {
     return message.lineReply("<:xvector2:869193716575911966> You can't cuddle yourself ;-;");
    }
    if (user == client.user) {
     return message.lineReply("<:winkingface:869178569606193192> Oh, you tried to hug me but u can't\nFor I'm not real. just a darling bot...");
    }
    message.channel.startTyping();
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setAuthor(user.username + " Just got a cuddle from " + message.author.username, message.guild.iconURL({dynamic: true,format: "png"}))
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048}))
     .setTimestamp()
     .setURL(body.url);
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
