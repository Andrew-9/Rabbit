const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = async (client, oldUser, newUser) => {
 try {
  let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", oldUser.guild.id, function (err, result, fields) {
  if(result[0].enabled == 0) { 
  return;
  } else if (result[0].enabled == 1) {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildId = " + oldUser.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await oldUser.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!oldUser.guild) return;
    if (!oldUser.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    oldUser.guild.fetchAuditLogs().then((logs) => {
    client.guilds.cache.forEach(function (guild, guildid) {
    guild.members.cache.forEach(function (member, memberid) {
    if (newUser.id === memberid) {
    var member = client.guilds.get(guildid).members.get(member.id)
    // USERNAME CHANGED
    if (oldUser.username !== newUser.username) {
    const NewUser = new Discord.MessageEmbed()
    .setAuthor(newUser.tag, newUser.displayAvatarURL())
    .setDescription(`<@${newUser.id}> **updated their profile!**`)
    .addField("**Username**", `${oldUser.username} **->** ${newUser.username}`)
    .setColor("#005dfe")
    .setThumbnail(newUser.displayAvatarURL())
    .setTimestamp()
    .setFooter(oldUser.guild.name, oldUser.guild.iconURL());
    log.send(NewUser);
    }
    // DISCRIMINATOR CHANGED V12
    if (oldUser.discriminator !== newUser.discriminator) {
    const NewDiscriminator = new Discord.MessageEmbed()
    .setAuthor(newUser.tag, newUser.displayAvatarURL())
    .setDescription(`<@${newUser.id}> **updated their profile!**`)
    .addField("**Discriminator**", `${oldUser.discriminator} **->** ${newUser.discriminator}`)
    .setColor("#005dfe")
    .setThumbnail(newUser.displayAvatarURL())
    .setTimestamp()
    .setFooter(oldUser.guild.name, oldUser.guild.iconURL());
    log.send(NewDiscriminator);
    }
    // AVATAR CHANGED V12
    if (oldUser.avatar !== newUser.avatar) {
    const NewAvatarr = new Discord.MessageEmbed()
    .setAuthor(newUser.tag, newUser.displayAvatarURL())
    .setDescription(`<@${newUser.id}> **updated their profile!**`)
    .addField("**Discriminator**", `${oldUser.discriminator} **->** ${newUser.discriminator}`)
    .setColor("#005dfe")
    .setThumbnail(newUser.displayAvatarURL())
    .addField(`[Before](${oldUser.displayAvatarURL()})`)
    .setURL()
    .setFooter(oldUser.guild.name, oldUser.guild.iconURL());
    log.send(NewAvatarr);
    }
   }
  })
 })   
 });
 })();
});
}
});
} catch (err) {
// console.log(err);
}
};
