const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = async (client, oldState, newState) => {
 try { 
      let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", oldState.guild.id, function (err, result, fields) {
        if(result[0].enabled == 0) { 
        return;
        } else if (result[0].enabled == 1) {
        const sqlquery = "SELECT channelid AS res FROM logs WHERE guildId = " + oldState.guild.id;
        sql.query(sqlquery, function (error, results, fields) {
        if (error) console.log(error);if (!results || results.length == 0) {return;}
        (async () => {
        const logsetup = await results[0].res;
        const log = await oldState.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!oldState.guild) return;
        if (!oldState.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        oldState.guild.fetchAuditLogs().then((logs) => {
        if (oldState.channel === null && newState.channel === null) return;
        let oldchanelid = "unknown"
        if (oldState && oldState.channelID) oldchanelid = oldState.channelID
        let newchanelid = "unknown"
        if (newState && newState.channelID) newchanelid = newState.channelID
        if (oldState.channelID && oldState.channel) {
        if (typeof oldState.channel.parent !== "undefined") {
        oldState.channelID = `${oldState.channelID}`
        } else {
        oldState.channelID = `${oldState.channelID}`
        }}
        if (newState.channelID && newState.channel) {
        if (typeof newState.channel.parent !== "undefined") {
        newState.channelID = `${newState.channelID}`
        } else {
        newState.channelID = `${newState.channelID}`
        }}
        // JOINED CHANNEL
        if (!oldState.channelID && newState.channelID && !oldState.channel && newState.channel) {
        const Joined = new Discord.MessageEmbed()
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL())
        .setDescription(`<@${newState.member.user.id}> **joined voice channel** **<#${newState.channelID}>**`)
        .setColor("#1ccf00")
        .setTimestamp()
        .setFooter(oldState.guild.name, oldState.guild.iconURL());
        log.send(Joined);
        }
        // LEFT CHANNEL
        if (oldState.channelID && !newState.channelID && oldState.channel && !newState.channel) {
        const Left = new Discord.MessageEmbed()
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL())
        .setDescription(`<@${newState.member.user.id}> **left the voice channel** **<#${oldState.channelID}>**`)
        .setColor("#d34242")
        .setTimestamp()
        .setFooter(oldState.guild.name, oldState.guild.iconURL());
        log.send(Left);
        }
      // SWITCH CHANNEL
      if (oldState.channelID && newState.channelID && oldState.channel && newState.channel) {
      if (oldState.channelID !== newState.channelID) {
        const Switch = new Discord.MessageEmbed()
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL())
        .setDescription(`<@${newState.member.user.id}> **switched voice channel** **<#${oldState.channelID}>** **->** **<#${newState.channelID}>**`)
        .setColor("#005dfe")
        .setTimestamp()
        .setFooter(oldState.guild.name, oldState.guild.iconURL());
        log.send(Switch);
        }
      }
    });
  })();
});
}
});
if (newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false) {
  try {
      const channel = newState.member.guild.channels.cache.find(
          channel =>
          channel.type === "text" &&
          (channel.name.includes("cmd") || channel.name.includes("command") || channel.name.includes("bot")) &&
          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
      );
      channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
      newState.setDeaf(true);
  } catch (error) {
      try {
          const channel = newState.member.guild.channels.cache.find(
              channel =>
              channel.type === "text" &&
              channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
          );
          channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
          newState.setDeaf(true);
      } catch (error) {
          newState.setDeaf(true);
      }
  }
}
} catch (err) {
// console.log(err);
}
};
