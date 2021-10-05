const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, message, guild, role) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    // let roleCreate = new Discord.MessageEmbed()
    // .setAuthor(guild.name, guild.iconURL())
    // .setDescription(`**Role Created: ${role.name}**`)
    // .setColor("#0066ff")
    // .setTimestamp()
    // .setFooter(`ID: ${role.id}`);
    // log.send(roleCreate);
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
