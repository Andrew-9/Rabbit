const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "djs",
 aliases: ["discordjs", "djsdocs"],
 description: "Look at the discord.js docs",
 category: "Utility",
 usage: "djs (query)",
 run: async (client, message, args) => {
  try {
   const query = args[0];
   let version = message.content.split("--src=")[1];
   if (!version) version = "stable";
   if (!query)
    return message.lineReply("<:xvector:869193619318382602> **| Please enter a term to search!**");
   const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${version}&q=${query}`);
   const body = await res.json();
   return message
    .lineReply({
     embed: body,
    })
    .catch((c) => {
     message.lineReply("<:xvector:869193619318382602> **| Invaild query!**");
    });
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
 },
};
