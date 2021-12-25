const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
 name: "set-proverb",
 aliases: ["proverb-set", "p-set", "pset", "set-proverb-channel"],
 description: "Set a proverb's channel for the guild",
 category: "Moderation",
 usage: "set-proverb <channel>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`You don't have permission to set proverb's channel!`)
    return message.channel.send(Nopermission8);
   }
   const channel = message.mentions.channels.first();
   if (!channel) {
    const enterac = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO VALID CHANNEL!")
    .setDescription(`You have to enter a valid channel`)
    return message.channel.send(enterac);
   }
   const sqlquery = "SELECT proverbs AS res FROM guilds WHERE guildId = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     const update = "UPDATE guilds SET proverbs = " + channel.id + " WHERE guildId = " + message.guild.id;
     sql.query(update, function (error, results, fields) {
      if (error) console.log(error);
      const ProChannel = new Discord.MessageEmbed()
      .setColor("#00bfff")
      .setTitle("<:bxcheck:895478636046606346> PROVERBS CHANNEL SUCCESS!")
      .setDescription(`Successfully! updated proverbs channel\nNew proverbs channel is ${channel}`)
      message.lineReply(ProChannel);
      const NewProChannel = new Discord.MessageEmbed()
      .setColor("#00bfff")
      .setTitle("<:bxcheck:895478636046606346> PROVERBS CHANNEL SUCCESS!")
      .setDescription(`${message.author} has set this channel for receiving **Proverbs Insights**\nType in this channel with \`do you know\`, \`do you know that\`, or \`proverb\``)
      channel.send(NewProChannel);
     });
    } else {
    // In case for unknows reasons there was no entry for your guild in the db this code will prevent the bot from crashing. NOTE IT AND LEAVE IT.
     const insert = "INSERT INTO `proverbs` (`guildId`, `guild_prefix`, `rules`, `embed_channel`, `embed_color`, `proverbs`) VALUES (" + message.guild.id + ", 'r!', '0', '0', '0', " + channel.id + ");";
     sql.query(insert, function (error, results, fields) {
      if (error) console.log(error);
      const BProChannel = new Discord.MessageEmbed()
      .setColor("#00bfff")
      .setTitle("<:xvector:869193619318382602> NEW PROVERBS CHANNEL SUCCESS!")
      .setDescription(`Successfully! updated proverbs channel\nNew proverbs channel is ${channel}`)
      message.lineReply(BProChannel);
     });
    }
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
