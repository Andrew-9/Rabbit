const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const ms = require("parse-ms");
module.exports = {
    name: "loot",
    aliases: ["l"],
    description: "Loot for money",
    category: "Economy",
    usage: "loot",
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
                    let timeout = 60000;
                    let com = sql.query("SELECT loottime FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let TheTime = result[0].loottime
                    if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                    let time = ms(timeout - (Date.now() - TheTime));
                    message.channel.send(`⏰ **|** You need to wait **${time.minutes}m ${time.seconds}s**\nBefore you can loot again.`);
                    } else {
                    const loot = ["🪓 Digging through your mails\nYou found a check with", "🧹 Sweeping the floor of your house\nYou found a letter with the amount of", "🚈 Railing through the roads\nYou stumbled upon a bag of", "🪓 Digging through your messages\nYou happen to find", "🧥 Wearing your coat you found", "🧱 Grinding the dust you found", "🗑 Taking out the trash you found", "🐎 Breading your horses\nYou stumbled upon"];
                    randomloot = loot[Math.floor(Math.random() * loot.length)];
                    var LootAward = Math.floor(Math.random() *(1001)) + 0;
                    let LootAwardGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(LootAward);
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
                    let sql4 = 'UPDATE economy SET loottime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql4);
                    message.channel.send(`${randomloot} **${LootAwardGiven}<:dollars:881559643820793917>**`);
                    let sql3 = 'UPDATE economy SET balance = balance+' + LootAward + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql3);
                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let giveamount = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    const Rewards = new Discord.MessageEmbed()
                    .setColor('#125bf8')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`**${message.author.username}** was awarded with **${LootAwardGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
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