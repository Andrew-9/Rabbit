const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, channel, message) => {
 try {
  client.settings.remove(channel.guild.id, channel.id, `botchannel`);
  let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", channel.guild.id, function (err, result, fields) {
  if(result[0].enabled == 0) { 
  return;
 } else if (result[0].enabled == 1) {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildId = " + channel.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await channel.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!channel.guild) return;
    if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (channel.type === "text") {
     type = "Text";
    } else if (channel.type === "voice") {
     type = "Voice";
    } else if (channel.type === "category") {
     type = "Category";
    } else if (channel.type === "news") {
     type = "News Feed";
    } else if (channel.type === "store") {
     type = "Store channel";
    } else if (!channel.type) {
     type = "?";
    }
    channel.guild.fetchAuditLogs().then((logs) => {
     const userid = logs.entries.first().executor.id;
     const event = new Discord.MessageEmbed() // Prettier()
     .setAuthor(channel.guild.name, channel.guild.iconURL())
      .setDescription(`**Channel Deleted:** **#${channel.name}**`)
      .setColor("#f13434")
      .setTimestamp()
      .setFooter(`ID: ${channel.id}`);
     log.send(event);
    });
   })();
  });
 }
 });
} catch (err) {
//console.log(err);
}
};
