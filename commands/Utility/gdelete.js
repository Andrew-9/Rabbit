const Discord = require("discord.js");

module.exports = {
 name: "delete-giveaway",
 aliases: ["gdelete", "dg"],
 description: "Delete a giveaway",
 category: "Utility",
 usage: "delete-giveaway <giveaway id>",
 run: async (client, message, args) => {
  try {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
   const messageID = args[0];
   if (!messageID) {
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ENTER AN ID!")
    .setDescription(`Please enter a giveaway message ID`)
    return message.lineReply(noId);
   }
   let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
   if (!giveaway) {
    const NoGiveaway = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> CAN'T FIND THE GIVEAWAY!")
    .setDescription("Unable to find a giveaway for `" + args.join(" ") + "`")
    return message.lineReply(NoGiveaway);
   }
   client.giveawaysManager
    .delete(messageID)
    .then(() => {
    const Giveawaydel = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:checkvector:869193650184269834> DELETE SUCCESS!")
    .setDescription("Successfully deleted the giveaway")
    return message.lineReply(Giveawaydel);
    })
    .catch((err) => {
    const noGfound = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> NO GIVEAWAY FOUND!")
    .setDescription("No giveaway found for \`" + messageID + "\` please check and try again")
    return message.lineReply(noGfound);
    });
  }
  else {
      const Nopermission8 = new Discord.MessageEmbed()
      .setColor("#f04949")
      .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
      .setDescription(`You don't have permission to use this command!`)
      return await message.channel.send(Nopermission8);
  }
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
