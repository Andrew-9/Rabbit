const Discord = require("discord.js");

module.exports = {
 name: "fetch-giveaway",
 aliases: ["gfetch", "glist", "giveaway-list"],
 description: "Fetch server's current running giveaways",
 category: "Utility",
 usage: "fetch-giveaway",
 run: async (client, message, args) => {
  try {
   const giveaways = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id);
   let giveawaysarr = [];
   const giveaways1 = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id);
   const giveaways2 = giveaways1.filter((g) => !g.ended);
   const giveaways3 = giveaways2.forEach((thisGiveaway) => {
    let winners = "";
    if (thisGiveaway.winnerCount == 1) {
     winners = "winner";
    } else {
     winners = "winners";
    }
    giveawaysarr.push(`Channel <#${thisGiveaway.channelID}> **| ${thisGiveaway.winnerCount}** ${winners} \nPrize: **${thisGiveaway.prize} |** [Giveaway Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`);
   });
   const embed = new Discord.MessageEmbed()
   .setColor("#24a9fa")
   .setTitle("CURRENT GIVEAWAYS")
   .setDescription(giveawaysarr.join("\n") || "No giveaways are currently running!")
   message.channel.send(embed);
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
