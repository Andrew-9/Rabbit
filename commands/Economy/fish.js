const Discord = require("discord.js");
const sql = require("../../utilities/database");
const ms = require("parse-ms");
const fishes = require('../../lib/json/fishes.json');
const { randomRange } = require('../../utilities/functions');
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
module.exports = {
    name: "fish",
    aliases: ["f"],
    description: `Catch a fish from a vast ocean\nCheck rewards with \`prefix fish rewards\` or \`prefix fish list\``,
    category: "Economy",
    usage: "fish",
    run: async (client, message, args) => {
        try {
            const prefix = guildPrefix.get(message.guild.id);
            let user = message.author;
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => { 
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
                    let con = sql.query("SELECT fish FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    if (!args[0]) {
                    const fishID = Math.floor(Math.random() * (20)) + 1;
                    let rarity;
                    if (fishID < 5) rarity = 'junk';
                    else if (fishID < 8) rarity = 'fine';
                    else if (fishID < 12) rarity = 'common';
                    else if (fishID < 16) rarity = 'uncommon';
                    else if (fishID < 20) rarity = 'rare';
                    else rarity = 'legendary';
                    const fishh = fishes[rarity];
                    const worth = randomRange(fishh.min, fishh.max);
                    let timeout = 60000;
                    let fishWorth = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(worth);
                    let com = sql.query("SELECT fishtime FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let TheTime = result[0].fishtime
                    if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                    let time = ms(timeout - (Date.now() - TheTime));
                    return message.channel.send(`⏰ **|** You've recently casted a line.\nfish again after **${time.minutes}m ${time.seconds}s**`);
                    } else {
                    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
                    message.channel.send(`You caught a **${capitalizeFirstLetter(rarity)}** ${fishh.symbol} fish\nThis will be worth around **${fishWorth}**<:dollars:881559643820793917>`);
                    let sql3 = 'UPDATE economy SET fish = fish+' + 1 + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql3);
                    let sql4 = 'UPDATE economy SET fishtime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql4);
                    let sql5 = 'UPDATE economy SET balance = balance+' + worth + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql5);
                    let scon = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let giveamount = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    const Rewards = new Discord.MessageEmbed()
                    .setColor('#125bf8')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`**${message.author.username}** was awarded with **${fishWorth}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL());
                    log.send(Rewards);
                    });
                    }
                    })
                    }
                    if (args[0] === 'list' || args[0] === 'rewards') {
                    let lEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0d87')
                    .setAuthor(`LIST OF FISH AND REWARDS`, message.author.avatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`
                    🔧 **Junk** | Max Reward: **$30.00**, Min Reward: **$1.00**<:dollars:881559643820793917>
                    🐡 **Fine** | Max Reward: **$70.00**, Min Reward: **$30.00**<:dollars:881559643820793917>
                    🐟 **Common** | Max Reward: **$170.00**, Min Reward: **$10.00**<:dollars:881559643820793917>
                    🐠 **Uncommon** | Max Reward: **$190.00**, Min Reward: **$18.00**<:dollars:881559643820793917>
                    🦑 **Rare** | Max Reward: **$275.00**, Min Reward: **$30.00**<:dollars:881559643820793917>
                    🐋 **Legendary** | Max Reward: **$500.00**, Min Reward: **$50.00**<:dollars:881559643820793917>
                    **PS:** It can be higher or lower based on randomized settings **(>‿◠)**
                    `)
                    return message.channel.send(lEmbed);
                    }
                    })
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