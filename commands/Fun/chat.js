const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config");

module.exports = {
 name: "chat",
 aliases: [],
 description: "Chat with bot AI",
 category: "Fun",
 usage: "chat <message>",
 run: async (client, message, args) => {
  (async () => {
   const aimessage = args.join(" ");
   const brainid = config.brainid;
   const brainkey = config.brainkey;
   const uid = `rabbit-` + message.author.id;
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> **| Hey! Please provide some message to talk to me :(**");
   }
   if (message.mentions.members.first()) {
    return message.lineReply("<:xvector:869193619318382602> **| Hey! Please don't ping people >:(**");
   }
   try {
    const response = await fetch(`http://api.brainshop.ai/get?bid=${brainid}&key=${brainkey}&uid=${uid}&msg=${aimessage}`);
    const body = await response.json();
    if (body.cnt == 0) {
     return message.lineReply("<:errorcode:868245243357712384> **| Some error occured with my brain cells... Please try again later**");
    } else {
     message.channel.startTyping();
     const embed = new Discord.MessageEmbed()
      .setDescription(body.cnt)
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.stopTyping();
     message.lineReply(embed);
    }
   } catch (err) {
    console.log(err);
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
