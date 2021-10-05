const Discord = require("discord.js");
const sql = require("../../utilities/database");
function toFixed(x) {
if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
      }
    }
return x;
}
module.exports = {
    name: "withdraw",
    aliases: ["with"],
    description: "Withdraw moeny from your bank account to use anytime",
    category: "Economy",
    usage: "withdraw <amount>",
    run: async (client, message, args) => {
        try {
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => { 
                if (!args.length) {
                const noamount = new Discord.MessageEmbed()
                .setColor("#fb8c1b")
                .setTitle("<:xvector:869193619318382602> GIVE ME AMOUNT!!")
                .setDescription(`You didn't provide the amount! **${message.author.username}**`)
                return message.lineReply(noamount);
                }
                let b = sql.query("SELECT balance, bank FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                if (Object.keys(result).length === 0) {
                let register ="INSERT INTO economy (userId, balance, bank, username, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '1');";
                sql.query(register)
                let NoAccount = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setThumbnail(message.author.avatarURL({ dynamic:true }))
                .setAuthor(message.author.tag)
                .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                 message.channel.send(NoAccount);
                } else if (toFixed(args[0]) <= toFixed(result[0].bank)){
                if (toFixed(args[0]) > 0){
                let rembal = 'UPDATE economy SET balance = balance+' + args[0] + ' WHERE userId = ' + message.author.id + '';
                sql.query(rembal);
                let addbank = 'UPDATE economy SET bank = bank-' + args[0] + ' WHERE userId = ' + message.author.id + '';
                sql.query(addbank);
                let WithdrawAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(args[0]);
                let balEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Withdrawn **' + WithdrawAmount + '<:dollars:881559643820793917>** from bank!')    
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());  
                message.channel.send(balEmbed);
                const WithdrawnLog = new Discord.MessageEmbed()
                .setColor('#125bf8')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`**${message.author.username}** withdrawed **${WithdrawAmount}<:dollars:881559643820793917>**\nfrom their bank account!`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                log.send(WithdrawnLog);
                }
                } else { 
                let WithdrawAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(args[0]);
                let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].bank);
                let NoMoney = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Insufficient Funds. You currently have: **" + TotalBalance + "<:dollars:881559643820793917>**")    
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());  
                message.channel.send(NoMoney);
                const InsufficientFunds = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`**${message.author.username}** couldn't withdraw **${WithdrawAmount}<:dollars:881559643820793917>**\nInsufficient funds to withdraw.\n Their current bank balance: **${TotalBalance}<:dollars:881559643820793917>**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                log.send(InsufficientFunds);
                }
                })
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