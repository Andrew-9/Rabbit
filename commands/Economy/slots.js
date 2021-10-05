const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const ms = require("parse-ms");
module.exports = {
    name: "slots",
    aliases: [""],
    description: "**Slots** is the greatest way to earn money\nDraw a slots with random money\nWin back a huge bonus if you're lucky",
    category: "Economy",
    usage: "slots",
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
                        let timeout = 30000;
                        let com = sql.query("SELECT slotstime FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        let TheTime = result[0].slotstime
                        if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                        let time = ms(timeout - (Date.now() - TheTime));
                        message.channel.send(`⏰ **|** You need to wait **${time.minutes}m ${time.seconds}s**\nBefore you can slots again. so wait..`);
                        } else {
                        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                            if (result == 0) {
                                let register = "INSERT INTO economy (userId, balance, bank, username, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0', '1');";
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
                                let c = sql.query("SELECT balance, is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                if (result[0].is_jailed == 1) {
                                const beenjailed = new Discord.MessageEmbed()
                                .setColor("#ea4d4d")
                                .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
                                message.lineReply(beenjailed);
                                } else if (result[0].balance < 100) {
                                let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance);
                                let NoMoney = new Discord.MessageEmbed()
                                .setColor('#e53637')
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setDescription("Insufficient Funds. You currently have: **" + TotalBalance + "<:dollars:881559643820793917>**")    
                                .setTimestamp()
                                .setFooter(message.guild.name, message.guild.iconURL());  
                                message.channel.send(NoMoney);
                                } else {
                                let slotsInvest = Math.floor(Math.random() * (9245)) + 0;
                                let sqltime = 'UPDATE economy SET slotstime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                                sql.query(sqltime);
                                let success = 'UPDATE economy SET balance = balance-'+ slotsInvest +' WHERE userId = ' + message.author.id + '';
                                sql.query(success)
                                let slots1 = Math.floor(Math.random() * (3 - 0)) + 0;
                                let slots2 = Math.floor(Math.random() * (3 - 0)) + 0;
                                let slots3 = Math.floor(Math.random() * (3 - 0)) + 0;
                                let slots4 = Math.floor(Math.random() * (3 - 0)) + 0;
                                let slots5 = Math.floor(Math.random() * (3 - 0)) + 0;
        
                                var slot1VAR = 'NULL';
                                var slot2VAR = 'NULL';
                                var slot3VAR = 'NULL';
                                var slot4VAR = 'NULL';
                                var slot5VAR = 'NULL';
        
                                if (slots1 == '0') {
                                    slot1VAR = '🍎';
                                } else if (slots1 == '1') {
                                    slot1VAR = '🍊';
                                } else if (slots1 == '2') {
                                    slot1VAR = '🍋';
                                }
        
                                if (slots2 == '0') {
                                    slot2VAR = '🍎';
                                } else if (slots2 == '1') {
                                    slot2VAR = '🍊';
                                } else if (slots2 == '2') {
                                    slot2VAR = '🍋';
                                }
        
                                if (slots3 == '0') {
                                    slot3VAR = '🍎';
                                } else if (slots3 == '1') {
                                    slot3VAR = '🍊';
                                } else if (slots3 == '2') {
                                    slot3VAR = '🍋';
                                }
        
                                if (slots4 == '0') {
                                    slot4VAR = '🍎';
                                } else if (slots4 == '1') {
                                    slot4VAR = '🍊';
                                } else if (slots4 == '2') {
                                    slot4VAR = '🍋';
                                }
        
                                if (slots5 == '0') {
                                    slot5VAR = '🍎';
                                } else if (slots5 == '1') {
                                    slot5VAR = '🍊';
                                } else if (slots5 == '2') {
                                    slot5VAR = '🍋';
                                }
                                let AmountUsedToSlots = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(slotsInvest);
                                let slotEmbed = new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(slot1VAR + ' ' + slot2VAR + ' ' + slot3VAR + ' ' + slot4VAR + ' ' + slot5VAR + `\nYou've slots with **${AmountUsedToSlots}**`)
                                message.channel.send(slotEmbed);
                                if (slots1 == '0' && slots2 == '0' && slots3 == '0' && slots4 == '0' && slots5 == '0') {
                                    let dollAeward = Math.floor(Math.random() * (100001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let sql5 = 'UPDATE economy SET balance = balance-100 WHERE userId = ' + message.author.id + '';
                                    sql.query(sql5);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                });
                                }
                                if (slots1 == '1' && slots2 == '1' && slots3 == '1' && slots4 == '1' && slots5 == '1') {
                                    let dollAeward = Math.floor(Math.random() * (40001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 == '2' && slots2 == '2' && slots3 == '2' && slots4 == '2' && slots5 == '2') {
                                    let dollAeward = Math.floor(Math.random() * (40001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 != '0' && slots2 == '0' && slots3 == '0' && slots4 == '0' && slots5 != '0') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 != '1' && slots2 == '1' && slots3 == '1' && slots4 == '1' && slots5 != '1') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 != '2' && slots2 == '2' && slots3 == '2' && slots4 == '2' && slots5 != '2') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has  **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 == '0' && slots2 == '0' && slots3 == '0' && slots4 != '0') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 == '1' && slots2 == '1' && slots3 == '1' && slots4 != '1') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots1 == '2' && slots2 == '2' && slots3 == '2' && slots4 != '2') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots2 != '0' && slots3 == '0' && slots4 == '0' && slots5 == '0') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots2 != '1' && slots3 == '1' && slots4 == '1' && slots5 == '1') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
                                if (slots2 != '2' && slots3 == '2' && slots4 == '2' && slots5 == '2') {
                                    let dollAeward = Math.floor(Math.random() * (20001)) + 0;
                                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(dollAeward);
                                    let wonEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                                    .setColor("#0fd129")
                                    .setDescription(`${message.author.username} Congrats, you won **${AmountGiven}<:dollars:881559643820793917>**`)
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    message.channel.send(wonEmbed);
                                    let sql4 = 'UPDATE economy SET balance = balance+' + dollAeward + ' WHERE userId = ' + message.author.id + '';
                                    sql.query(sql4);
                                    let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                                    let giveamount = result[0].balance
                                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                                    const Rewards = new Discord.MessageEmbed()
                                    .setColor('#0e53e7')
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    .setDescription(`**${message.author.username}** was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL());
                                    log.send(Rewards);
                                    });
                                }
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