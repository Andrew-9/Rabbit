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
    name: "admingive",
    aliases: ["adgive"],
    description: "Give moeny to people as an administrator.\nThis command goes against **rabbit's** banking system\nThat's why only **admins** can use this command.",
    category: "Economy",
    usage: "admingive <menion> <amount>",
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
                    if (message.member.hasPermission("ADMINISTRATOR")){
                        if (!args.length) {
                        const agive = new Discord.MessageEmbed()
                        .setColor("#fb8c1b")
                        .setTitle("<:xvector:869193619318382602> GIVE ME AMOUNT!!")
                        .setDescription(`**You didn't provide the amount! ${message.author}**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        return message.lineReply(agive);
                        }
                        if (message.mentions.members.size != 0){
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
                        } else if (toFixed(args[1]) > 0){
                        if (toFixed(args[1]) > 0){
                        let user = message.mentions.users.first();
                        let addbank = 'UPDATE economy SET balance = balance+' + args[1] + ' WHERE userId = ' + user.id + '';
                        sql.query(addbank);
                        let gaveAmount = args[1];
                        let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(gaveAmount);
                        let balEmbed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription('Gave **' + AmountGiven + '<:dollars:881559643820793917>** to ' + user.username + '** as admin**')    
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());  
                        message.channel.send(balEmbed);
                        const AdminGaveMoneyLog = new Discord.MessageEmbed()
                        .setColor('#125bf8')
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`Ara Ara **${message.author.username}** Gave **${AmountGiven}<:dollars:881559643820793917>** \nTo ${user.username} ** as an admin**`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL());
                        log.send(AdminGaveMoneyLog);
                        } else {
                        const adgive = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> ADMINGIVE FAILED!")
                        .setDescription(`**Amount must not be below 0**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(adgive);
                        }
                        } else {
                        const admgive = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> ADMINGIVE FAILED!")
                        .setDescription(`**An Account Error!**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(admgive);
                        }
                        })
                        } else {
                        const admingive = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> ADMINGIVE FAILED!")
                        .setDescription(`**Member Error! It would seem**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(admingive);
                        }
                        } else {
                        const admgivef = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> NO PERMISSION!!")
                        .setDescription("**You can't run this. you need `ADMINISTRATOR` permission!!**")
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(admgivef);
                        }
                    });
            });
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