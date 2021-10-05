const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, member, role) => {
 try {
  let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
  if(result[0].enabled == 0) { 
  return;
  } else if (result[0].enabled == 1) {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildId = " + member.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    const embed = await new Discord.MessageEmbed() // Prettier()
     .setAuthor(`${member.user.tag}`, member.user.avatarURL())
     .setColor("#0059ff")
     .setDescription(`<@${member.user.id}> **was given the \`${role.name}\` role**`)
     .setTimestamp()
     .setFooter(member.guild.name, member.guild.iconURL());
    log.send(embed);
   })();
});
}
});
} catch (err) {
// console.log(err);
}
};
