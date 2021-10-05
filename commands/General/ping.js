const Discord = require("discord.js");

module.exports = {
 name: "ping",
 aliases: [],
 description: "Show client ping",
 category: "General",
 usage: "ping",
 run: async (client, message, args) => {
  try {
   const ping = new Discord.MessageEmbed()
    .setTitle(":ping_pong: Pong!")
    .addField("My ping: ", `${(Date.now() - message.createdTimestamp).toString().replace(/-/g, "")} ms`)
    .addField("API ping (Websocket): ", `${Math.round(client.ws.ping)} ms`)
    .setColor("RANDOM")
    .setTimestamp();
   message.lineReply(ping);
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
