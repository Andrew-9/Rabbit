const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const ms = require("parse-ms");
module.exports = {
    name: "work",
    aliases: ["w"],
    description: "Work for moeny and earn rewards for doing a fine job",
    category: "Economy",
    usage: "work",
    run: async (client, message, args) => {
        try {
            const prefix = guildPrefix.get(message.guild.id);
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => { 
                    let timeout = 560000;
                    let com = sql.query("SELECT worktime FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let TheTime = result[0].worktime
                    if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                    let time = ms(timeout - (Date.now() - TheTime));
                    message.channel.send(`⏰ **|** You need to wait another **${time.minutes}m ${time.seconds}s**\nBefore you can use this command.`);
                    } else {
                    const work = ["You work at a grocery\nStore and earn", "You work at a petrol\nStation and earn", "You work as a\nCleaner and earn", "You work as a house\nMaid and earn", "You work as a\nDriver and earn", "You work as an\nAccountant and earn", "You work for an amusement\nPark and earn", "You work at prison\nAnd earn another", "You work at a restaurant\nAand earn another", "You work at a hospital\nAnd earn up to", "You work as a bus\nDriver and earn another", " You work as a banker\nAnd earn up to", " You work as a programmer\nAnd earn another", "You work for Kotlin#0427\nSo her gave you", "You invited me to your\nServer and earn", "You used my command\nToday and earn", "You work as a professional\nWorker and earn", "You work as an engineer\nAnd earn another"];
                    randomWork = work[Math.floor(Math.random() * work.length)];
                    var WorkAward = Math.floor(Math.random() *(901)) + 0;
                    let WorkAwardGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(WorkAward);
                    let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                    if(result == 0) { 
                    let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0', '1');";
                    sql.query(register)
                    let NoAccount = new Discord.MessageEmbed()
                    .setColor('#e53637')
                    .setThumbnail(message.author.avatarURL({ dynamic:true }))
                    .setAuthor(message.author.tag)
                    .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you\nBut you will not receive the rewards for this round.`)
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL());
                     message.channel.send(NoAccount);
                    } else { 
                    let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    if (result[0].is_jailed == 1) {
                    const beenjailed = new Discord.MessageEmbed()
                    .setColor("#ea4d4d")
                    .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
                    message.lineReply(beenjailed);
                    } else {
                    let sql8 = 'UPDATE economy SET worktime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql8);
                    let sql30 = 'UPDATE economy SET work = work+' + 1 + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql30);
                    // let workEmbed = new Discord.MessageEmbed()
                    // .setColor("RANDOM")
                    // .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                    // .setDescription(`${randomWork} **${WorkAwardGiven}<:dollars:881559643820793917>**`)
                    //if (TheTime !== null && timeout - (Date.now() - TheTime) > 0)
                    message.channel.send(`${randomWork} **${WorkAwardGiven}<:dollars:881559643820793917>**`);
                    let sql3 = 'UPDATE economy SET balance = balance+' + WorkAward + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql3);
                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let giveamount = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    const Rewards = new Discord.MessageEmbed()
                    .setColor('#125bf8')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`**${message.author.username}** was awarded with **${WorkAwardGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL());
                    log.send(Rewards);
                    });
                    }
                   });
                    }
                });
                } 
                
               });
              });
            })
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
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});