const Discord = require("discord.js");
const embGen = require("../../utilities/embedGenerator");
const sql = require("../../utilities/database");

module.exports = {
 name: "warn",
 aliases: [],
 description: "Send a warning to any user that tries shit.",
 category: "Moderation",
 usage: "Warn <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("KICK_MEMBERS")) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`**You don't have permissions to warn members!**`)
    .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
    .setTimestamp();
    return message.channel.send(Nopermission8);
   }
       const user = message.author;
       const offender = message.mentions.members.first();
       const reason = args.slice(1).join(" ");
       const embedGen = new embGen();
       const warnMsg = embedGen.generateUserWarn(client,user,message,offender,reason);
       if (!offender) {message.lineReply("<:xvector:869193619318382602> **| You need to tag the offender!**");}
       else if (
         message.member.roles.highest.comparePositionTo(offender.roles.highest) > 0
       ) {
         if (reason.length === 0) {
           message.lineReply(`<:xvector:869193619318382602> | **Please give me a reason to warn this user!**`);
         } else {
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
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => {          
                const filter = (m) =>
                m.content.includes("yes") && m.author.id === message.author.id;
                message.lineReply(`<:thinkingface:867897965380108288> **| Hmm are you sure you want to warn? \`${offender.user.username}\`**`)
                .then((reply) => {
                    reply.channel
                    .awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] })
                    .then((collected) => {
                        let confirmation = collected.first();
                        reply.delete();
                        confirmation.delete();
                        const UpdateGID = offender.guild.id;
                        const UpdateGMember = offender.user.id;
                        let guiMemSQL = "UPDATE members SET warning=warning+1 WHERE guildId = ? AND userId = ?";
                        sql.query(guiMemSQL, [UpdateGID, UpdateGMember], (error, result) => {
                        if (error) console.log(error);
                        message.lineReply(`<:checkvector:869193650184269834> **| Uh-oh \`${offender.user.username}\` Just recieved a warning**`);
                        });
                        log.send(warnMsg);
                    })
                    .catch((collected) => {
                        message.lineReply(`<:xvector:869193619318382602> **| You didn't warn \`${offender.user.username}\`**`);
                        return collected;
                    });
                });
                });
             })();
            });
         }
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
