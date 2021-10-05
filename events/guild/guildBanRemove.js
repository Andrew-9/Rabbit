const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, guild, user) => {
 try {
  let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", guild.id, function (err, result, fields) {
  if(result[0].enabled == 0) { 
  return;
  } else if (result[0].enabled == 1) {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildId = " + guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    guild.fetchAuditLogs().then((logs) => {
     const userid = logs.entries.first().executor.id;
     const uavatar = logs.entries.first().executor.avatarURL();
     const embed = new Discord.MessageEmbed()
      .setTitle("===  Member Unbanned  ===")
      .setThumbnail(uavatar)
      .setColor("#44f134")
      .addField("__Author:__", `<@${userid}>`)
      .addField("__Unbanned User__", `<@${user.id}> | ${user.tag}`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL());
     log.send(embed);
    });
   })();
});
}
});
} catch (err) {
// console.log(err);
}
};
