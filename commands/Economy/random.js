const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const ms = require("parse-ms");
module.exports = {
    name: "random",
    aliases: ["rm"],
    description: "Ramdomize your earnings",
    category: "Economy",
    usage: "random",
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
                    let timeout = 20000;
                    let com = sql.query("SELECT randomize FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let TheTime = result[0].randomize
                    if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                    let time = ms(timeout - (Date.now() - TheTime));
                    message.channel.send(`⏰ **|** You need to wait another **${time.hours}h ${time.minutes}m ${time.seconds}s**\nBefore you can ramdomize your earnings`);
                    } else {
                    const randomize = ["🛺 You woke up early today\nSo have another", "🥓 You brushed brush your teeth\nToday and for that here's", "😤 You're all fired up about\nYour adventures today therefore take", "🚿 You took your shower today\nI judged you **clean** so take", "👱‍♀️ You comb your hair today\nThat's very neat take", "🧹 You kept your home neat today\nTherefore I think you deserve", "🧭 You know your road home\nSome people get lost most times\nAs a reward I'll give you", "🚕 You took a cab today\nSo I might just give you", "💦 You drank water today\nFor keeping yourself healthy here's", "🍝 You eat some food today\nOne must always remain healthy take"];
                    RRandomizeRewards = randomize[Math.floor(Math.random() * randomize.length)];
                    var randomizeAward = Math.floor(Math.random() *(118)) + 0;
                    let RandomAwardGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(randomizeAward);
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
                    let sql4 = 'UPDATE economy SET randomize = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql4);
                    message.channel.send(`${RRandomizeRewards} **${RandomAwardGiven}<:dollars:881559643820793917>**`);
                    let sql3 = 'UPDATE economy SET balance = balance+' + randomizeAward + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql3);
                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let giveamount = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    const Rewards = new Discord.MessageEmbed()
                    .setColor('#125bf8')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`**${message.author.username}** was awarded with **${RandomAwardGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
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