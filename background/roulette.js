const Discord = require("discord.js");
const sql = require("../../utilities/database");
const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,29,32,34,36];
const black = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const dozen1 = [1,2,3,4,5,6,7,8,9,10,11,12];
const dozen2 = [13,14,15,16,17,18,19,20,21,22,23,24];
const dozen3 = [25,26,27,28,29,30,31,32,33,34,35,36];
const even = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const odd = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const low = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const high = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
const column1 = [1,4,7,10,13,16,19,22,25,28,31,34];
const column2 = [2,5,8,11,14,17,20,23,26,29,32,35];
const column3 = [3,6,9,12,15,18,21,24,27,30,33,36];
const totalbets = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','red','black','dozen1','dozen2','dozen3','even','odd','high','low','column1','column2','column3'];
const jailed = new Set();
const roulettedown = new Set();
module.exports = {
    name: "roulette",
    aliases: ["rou"],
    description: "Gamble and earn a huge bonus money\nThere's a very little chance of a successfully bet\nYou will loose money **a lot** but in return **win** a huge bonus\nPlease note that you will not need any fund to play roulette\nBut your account will be deducted when you loose money.",
    category: "Economy",
    usage: "roulette",
    run: async (client, message, args) => {
        try {
            let con = sql.query("SELECT enabled FROM economy_ward WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            let isEnabled = result[0].enabled
            if(isEnabled == 0) { 
                console.log(isEnabled);
            } else if (isEnabled == 1) {
                let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                    if (error) console.log(error);
                     const logsetup = results[0].res;
                     const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                     if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                     if (!log) return;
                     if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                       message.guild.fetchAuditLogs().then((logs) => {
                        if (jailed.has(message.author.id)) {
                        const isjailed = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> IN JAILED!")
                        .setDescription(`**You have been jailed** *Please Wait 5 minutes from the jailing to continue*`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(isjailed);
                        } else if (roulettedown.has(message.author.id)) {
                        const coolDown = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> COOLDOWN!")
                        .setDescription("**Wait `15` seconds and try again*")
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(coolDown);
                        } else {
                        if (!args.length) {
                        const nobets = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> NO BETS PROVIDED!")
                        .setDescription(`**You didn't provide any bets!**\n${message.author} The current available bets are: \n\`red, black, dozen1, dozen2, dozen3, even, \nOdd, low, high, column1, column2, and column3.\``)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        return message.channel.send(nobets);
                        }
                        if (totalbets.includes(args[0])) {
                        console.log("bet success");
                        let b = sql.query("SELECT balance, bank FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        console.log(result);
                        if (Object.keys(result).length === 0) {
                        let register = "INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
                        sql.query(register)
                        let NoAccount = new Discord.MessageEmbed()
                        .setColor('#e53637')
                        .setThumbnail(message.author.avatarURL({ dynamic:true }))
                        .setAuthor(message.author.tag)
                        .setDescription("You don't have an account.\n**I opened one for you.**\nBut unfortunately this means you \nwill not receive the rewards for this round.")
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        message.channel.send(NoAccount);
                        } else {
                        var roulette1 = Math.floor(Math.random() *(536-0)) + 0;
                        let roulette1Embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription('The number is: **' + roulette1 + '**')
                        .setFooter(message.guild.name, message.guild.iconURL());
                        message.channel.send(roulette1Embed);
                        if (args[0] = 'red') {
                        var roulette1 = Math.floor(Math.random() * (536+0)) + 0;
                        if (red.includes(roulette1) == true) {
                        let sql5 = 'UPDATE economy SET balance = balance+' + roulette1 * 6838 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql5);
                        let wonEmbed = new Discord.MessageEmbed()
                        .setColor('#0fd129')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription("You won **" + roulette1 * 6838 + "$**")
                        .setFooter(message.guild.name, message.guild.iconURL());
                        message.channel.send(wonEmbed);
                        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        let winamount = result[0].balance
                        const Rewards = new Discord.MessageEmbed()
                        .setColor('#125bf8')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`**${message.author.username}** was awarded with **${roulette1 * 6838}$** from playing **roulette**\nUser now has **${winamount}$** in their account balance.`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        log.send(Rewards);
                        })
                        } else {
                        let sql3a = "UPDATE economy SET balance=balance-" + roulette1 + " WHERE userId = " + message.author.id + "";
                        sql.query(sql3a);
                        let lostEmbed = new Discord.MessageEmbed()
                        .setColor('#e53637')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription("You lost **" + roulette1 + "$**")
                        .setFooter(message.guild.name, message.guild.iconURL());
                        message.channel.send(lostEmbed);
                        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        let looseamount = result[0].balance
                        const losemoney = new Discord.MessageEmbed()
                        .setColor('#e44b4b')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`**${message.author.username}** lost **${roulette1}$** while playing **roulette**\nUser now has **${looseamount}$** in their balance.`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        log.send(losemoney);
                        })
                        }
                        } else if (args[0] = 'black') {
                            if (black.includes(roulette1) == true) {
                                let wonEmbed = new Discord.MessageEmbed()
                                .setColor('#0fd129')
                                .setAuthor(message.author.username)
                                .setThumbnail(message.author.avatarURL({dynamic: true}))
                                .setDescription("You Won **" + roulette1 * 2 + "**");
                                message.channel.send(wonEmbed);
                                let sql5 = 'UPDATE economy SET balance = balance+' + roulette1 * 2 + ' WHERE userId = ' + message.author.id + '';
                                sql.query(sql5);
                            } else {
                                let lostEmbed = new Discord.MessageEmbed()
                                .setColor('#e53637')
                                .setAuthor(message.author.username)
                                .setThumbnail(message.author.avatarURL({dynamic: true}))
                                .setDescription("**You Lost!**");
                                message.channel.send(lostEmbed);
                                let sql5 = 'UPDATE economy SET balance = balance-' + roulette1 + ' WHERE userId = ' + message.author.id + '';
                                sql.query(sql5);
                            }
                        }

                        }
                   });
                  }
                 } 
                });
                });
            }
        });
        } catch (err) {
            console.log(err);
            message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
        }
    },
};