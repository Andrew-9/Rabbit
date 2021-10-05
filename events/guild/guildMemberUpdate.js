const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, message, oldMember, newMember) => {
 try {
//   const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id;
//   sql.query(sqlquery, function (error, results, fields) {
//    if (error) console.log(error);
//    if (!results || results.length == 0) {
//     return;
//    }
//    (async () => {
//     const logsetup = await results[0].res;
//     const log = await message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
//     // if (message.author.bot) return;
//     if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
//     if (!log) return;

//     const event = await new Discord.MessageEmbed() // Prettier()
//      .setAuthor(`NICKNAME CHANGED: ${newMember.user.tag}`)
//      .setColor("RANDOM")
//      .setDescription(`<@${newMember.user.id}> - *${newMember.user.id}*`)
//      .addFields(
//         { name: '**Old Nickname**', value: `**${oldMember.nickname || oldMember.user.username}**`, inline: true},
//         { name: '**New Nickname**', value: `**${newMember.nickname || newMember.user.username}**`, inline: true}
//       )
//      .setTimestamp()
//      .setFooter(message.guild.name, message.guild.iconURL());
//     await log.send(event);
//    })();
//   });
 } catch (err) {
  console.log(err);
 }
};
