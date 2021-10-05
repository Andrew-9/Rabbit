const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const ms = require("parse-ms");
const guildPrefix = new Map();
module.exports = {
    name: "crime",
    aliases: [""],
    description: "Comit a crime to earn money but careful you can get arrested.",
    category: "Economy",
    usage: "crime",
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
                  let timeout = 55000;
                  let com = sql.query("SELECT crimetime FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                  let TheTime = result[0].crimetime
                  if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                  let time = ms(timeout - (Date.now() - TheTime));
                  message.channel.send(`⏰ **|** You've just committed a crime\nWait **${time.hours}h ${time.minutes}m ${time.seconds}s** for the police to pass by`);
                  } else {
                    var succesrate = Math.floor(Math.random() * (6-0)) + 0;
                    //console.log(succesrate);
                    if (succesrate == '0'){
                        const rand1 = ["🏓 You robbed an old lady\nAnd gained **$50<:dollars:881559643820793917>**", "🏓 You successfully stole **$50<:dollars:881559643820793917>**\nFrom a petrol station", "🏓 You successfully pickpocketed **$50<:dollars:881559643820793917>**\nFrom a stranger on the bus", "🏓 You successfully knocked out a random man\nOn the street and took his wallet gaining **$50<:dollars:881559643820793917>**", "🏓 You successfully screwed a random\nPerson on the street for **$50<:dollars:881559643820793917>**", "🏓 You stole a cell phone and\nSold it for **$50<:dollars:881559643820793917>**", "🏓 You took **$50<:dollars:881559643820793917>** from your\nCompany's bank account", "🏓 You rob a bank but only\nManaged to grab **$50<:dollars:881559643820793917>**", "🏓 You scammed **$50<:dollars:881559643820793917>** from a\nstranger on the street", "🏓 You shot down a police officer and\ntook his wallet but sadly only **$50<:dollars:881559643820793917>** was found", "🏓 You beat down some boys and took\ntheir wallet but found only **$50<:dollars:881559643820793917>** inside", "🏓 You robbed a little kid\n of her **$50<:dollars:881559643820793917>** lunch money", "🏓 You hijacked the bag of a school\n girl and took her **$50<:dollars:881559643820793917>** snack money"];
                        randomNumber1 = rand1[Math.floor(Math.random() * rand1.length)];
                        let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if(result == 0) { 
                        let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0');";
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
                        message.channel.send(randomNumber1);
                        let sql3 = 'UPDATE economy SET balance = balance+50 WHERE userId = ' + message.author.id + '';
                        sql.query(sql3);
                        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        let giveamount = result[0].balance
                        let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                        const Rewards = new Discord.MessageEmbed()
                        .setColor('#0e53e7')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`**${message.author.username}** was awarded with **$50<:dollars:881559643820793917>** \nUser now has  **${AmountGiven}<:dollars:881559643820793917>**`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        log.send(Rewards);
                        let sql8 = 'UPDATE economy SET crime = crime+' + 1 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql8);
                        let sql9 = 'UPDATE economy SET crimetime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql9);
                        });
                        }
                        });
                       }
                    });
                    }
                    }
                    if (succesrate == '1'){
                        const rand2 = ["🛒 You beat down an old\n lady and took **$15<:dollars:881559643820793917>** from her", "🛒 You manage to pickpocket **$15<:dollars:881559643820793917>**\n from a random stranger", "🛒 You manage to scam **$15<:dollars:881559643820793917>**\n from a random stranger on the street.", "🛒 You took **$15<:dollars:881559643820793917>** from\n the register when nobody is looking", "🛒 You created a fake scam project\n but only managed to get **$15<:dollars:881559643820793917>** from it", "🛒 You rob a bank but had\n to flee with only **$15<:dollars:881559643820793917>**", "🛒 You scammed a little kid\n of her **$15<:dollars:881559643820793917>** breakfast money", "🛒 You lied to a sick man and\n scammed him of his last **$15<:dollars:881559643820793917>**"];
                        randomNumber2 = rand2[Math.floor(Math.random() * rand2.length)];
                        let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if(result == 0) { 
                          let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0', '1');";
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
                           let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                           if (result[0].is_jailed == 1) {
                           const beenjailed = new Discord.MessageEmbed()
                           .setColor("#ea4d4d")
                           .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
                           .setThumbnail(message.author.displayAvatarURL())
                           .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
                           message.lineReply(beenjailed);
                          } else {
                          message.channel.send(randomNumber2);
                          let sql3 = 'UPDATE economy SET balance = balance+15 WHERE userId = ' + message.author.id + '';
                          sql.query(sql3);
                          let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                          let giveamount = result[0].balance
                          let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                          const Rewards = new Discord.MessageEmbed()
                          .setColor('#0e53e7')
                          .setAuthor(message.author.tag, message.author.avatarURL())
                          .setDescription(`**${message.author.username}** was awarded with **$15<:dollars:881559643820793917>** \nUser now has **${AmountGiven}<:dollars:881559643820793917>**`)
                          .setThumbnail(message.author.displayAvatarURL())
                          .setTimestamp()
                          .setFooter(message.guild.name, message.guild.iconURL());
                          log.send(Rewards);
                          let sql18 = 'UPDATE economy SET crime = crime+' + 1 + ' WHERE userId = ' + message.author.id + '';
                          sql.query(sql18);
                          let sql19 = 'UPDATE economy SET crimetime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                          sql.query(sql19);
                        });
                        }
                        });
                       }
                    });  
                    }
                    if (succesrate == '2'){
                        const rand3 = ["📌 You successfully robbed\n a bank gaining ", "📌 You spend the night mugging\n random people and gain ", "📌 You steal a few cell phones\n and manage to get ", "📌 You created a scam project\n and managed to gain ", "📌 You steal a bus and sell it for ", "📌 You steal from the\n register and get ", "📌 You beat an old lady\n down and take ", "📌 When no one was looking\n you took from the register ", "📌 You scam a little kid and took", "📌 You lied to a sick\n man and took his", "📌 You robbed a school girl of her", "📌 You shot down 3 police\n officers and took their "];
                        var DollaAward = Math.floor(Math.random() * (121-0)) + 0;
                        let DollaAwardFormat = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(DollaAward);
                        randomNumber3 = rand3[Math.floor(Math.random() * rand3.length)];
                        let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if(result == 0) { 
                        let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0');";
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
                        let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        if (result[0].is_jailed == 1) {
                        const beenjailed = new Discord.MessageEmbed()
                        .setColor("#ea4d4d")
                        .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
                        message.lineReply(beenjailed);
                        } else {
                        message.channel.send(`${randomNumber3} **${DollaAwardFormat}<:dollars:881559643820793917>**`);
                        let sql3 = 'UPDATE economy SET balance = balance+' + DollaAward + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql3);
                        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        let giveamount = result[0].balance
                        let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                        const Rewards = new Discord.MessageEmbed()
                        .setColor('#0e53e7')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`**${message.author.username}** was awarded with **${DollaAwardFormat}<:dollars:881559643820793917>** \nUser now has **${AmountGiven}<:dollars:881559643820793917>**`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        log.send(Rewards);
                        let sql19 = 'UPDATE economy SET crime = crime+' + 1 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql19);
                        let sql12 = 'UPDATE economy SET crimetime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql12);
                        });
                        }
                        });
                       }
                    });           
                    }
                    if (succesrate == '3'){
                        const rand4 = ["🚫 You tried to steal from the register\n but got beaten down by an employee", "🚫 You tried to pickpocket a stranger\n on the street but got busted", "🚫 You try to rob an old lady\n but she fought back hard core", "🚫 You try to create a scam project\n but it was taken down by google", "🚫 You stole a few cell phones but\n UH OH! they tracked you down", "🚫 You try to rob a bank but\n got taken down by security", "🚫 You try to steal a few candy bars\n from the petrol station but forget\n they have security cameras!", "🚫 You try to knock a stranger on the\n street out but got knocked out\n tripping on the sidewalk", "🚫 You tried to scam a little kid\n of her launch money but\n she reported you ", "🚫 You almost shot down 3 police\n officers but shot on the eye", "🚫 You tried to rub a school girl\n of her snack money but got\n beaten up by her boyfriend", "🚫 You almost lied to a sick man\n but got cought by his wife"];
                        randomNumber4 = rand4[Math.floor(Math.random() * rand4.length)];
                        message.channel.send(randomNumber4);
                        let sql14 = 'UPDATE economy SET crime = crime+' + 1 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql14);
                        let sql17 = 'UPDATE economy SET crimetime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql17);
                      }
                    if (succesrate == '4'){
                        const rand5 = ["🚷 You tried to rob a bank but instead\n got sent to prison and fined ", "🚷 You try to steal a traffic\n cone and get fined ", "🚷 You break several traffic\n laws and get fined ", "🚷 You try mugging a stranger but\n he knocks you down and steals\n your money, you lost ", "🚷 You try to rob a house but are\n jumped by a naked man chasing you\n and screaming, while running in horror you drop ", "🚷 You try to sell drugs to little\n kids when you are busted by the Polzei.\n You are sent to prison and fined ", "🚷 You try to pickpocket people on the bus\n when someone notices and beats you down.\n While sobbing and running as fast\n as you can off the bus you drop ", "🚷 You try to scam a little girl of her\n launch money but got\n scammed by her and lost", "🚷 You lied to Kotlin#0427 about this\n big project you're working on and tried\n to scam him but got caught and was fined", "🚷 You tried to scam some police officers\n and got beaten up then taken to police\n station you were fined", "🚷 You have been caught hacking your\n neighbours wifi, and have\n been fined a total of"];
                        randomNumber5 = rand5[Math.floor(Math.random() * rand5.length)];
                        var DollaAward2 = Math.floor(Math.random() *(16001)) + 0;
                        let DollaAwardFormat = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(DollaAward2);
                        let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if(result == 0) { 
                        let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0');";
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
                        let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        if (result[0].is_jailed == 1) {
                        const beenjailed = new Discord.MessageEmbed()
                        .setColor("#ea4d4d")
                        .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
                        message.lineReply(beenjailed);
                        } else {
                        message.channel.send(`${randomNumber5} **${DollaAwardFormat}<:dollars:881559643820793917>**`);
                        let sql3 = 'UPDATE economy SET balance = balance-' + DollaAward2 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql3);
                        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                        let giveamount = result[0].balance
                        let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                        const LostRewards = new Discord.MessageEmbed()
                        .setColor('#e53637')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`**${message.author.username}** lost **${DollaAwardFormat}<:dollars:881559643820793917>**\nUser now has **${AmountGiven}<:dollars:881559643820793917>**`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        log.send(LostRewards);
                        let sql10 = 'UPDATE economy SET crime = crime+' + 1 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql10);
                        let sql15 = 'UPDATE economy SET crimetime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql15);
                        });
                        }
                        });
                       }
                    });
                    }
                    if (succesrate == '5'){
                        const rand6 = ["💥 You tried to rob a bank but\n get arrested and **JAILED!**", "💥 You beat up a homeless man but the\n Police was near and caught\n you and **JAILED!**", "💥 You try to sell fake phones to the\n elderly but get caught by an\n undercover police and got **JAILED!**", "💥 You try to rob a house but get beaten\n up by a huge man and got **JAILED!**", "💥 You stole a little girl's money purse but\n got caught and beaten up terribly by her\n parents then got **JAILED!**"];
                        randomnumber6 = rand6[Math.floor(Math.random() * rand6.length)];
                        let sql5 = 'UPDATE economy SET is_jailed = ' + 1 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql5);
                        message.channel.send(randomnumber6);
                        let sql01 = 'UPDATE economy SET crime = crime+' + 1 + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql01);
                        let sql17 = 'UPDATE economy SET crimetime = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                        sql.query(sql17);
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