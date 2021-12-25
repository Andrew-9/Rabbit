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
    return message.lineReply("<:xvector2:869193716575911966> Please provide some messages to talk to me :(");
   }
   if (message.mentions.members.first()) {
    return message.lineReply("<:xvector2:869193716575911966> Would you please don't ping people >:(");
   }
   try {
    const response = await fetch(`http://api.brainshop.ai/get?bid=${brainid}&key=${brainkey}&uid=${uid}&msg=${aimessage}`);
    const body = await response.json();
    if (body.cnt == 0) {
     return message.lineReply("<:xvector2:869193716575911966> Some error occured with my brain cells\nPlease do try again some other time");
    } else {
     message.channel.startTyping();
     message.channel.send(body.cnt)
     message.channel.stopTyping();
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
