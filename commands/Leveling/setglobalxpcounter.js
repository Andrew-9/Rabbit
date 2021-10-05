const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "setglobalxpcounter",
    aliases: ["sgxc", "sgxp"],
    description: "Sets the global **xp** to count when members of the guild sends a messages. standard is 1",
    category: "Leveling",
    usage: "setglobalxpcounter <amount>",
    run: async (client, message, args) => {
        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
            let con = sql.query("SELECT `enabled` FROM `ranking` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                let isEnabled = result[0].enabled
                if (isEnabled == 0) {
                    function databasing(rankuser) {
                    if (rankuser && rankuser.bot) return;
                    client.points.ensure(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, {
                    user: rankuser ? rankuser.id : message.author.id,
                    usertag: rankuser ? rankuser.tag : message.author.tag,
                    xpcounter: 1,
                    guild: message.guild.id,
                    points: 0,
                    neededpoints: 500,
                    level: 0,
                    oldmessage: "",
                    });
                    client.points.set(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, rankuser ? rankuser.tag : message.author.tag, `usertag`);
                    client.points.set(message.guild.id, 1, `setglobalxpcounter`);
                    }
                    databasing();
                    const RankNotEnabled = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> RANKING SYSTEM NOT ENABLED")
                    .setDescription(`*The ranking system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(RankNotEnabled);
                } else if (isEnabled == 1) {
                    if (!args[0]) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD POINTS TO COUNT!")
                    .setDescription(`*Give me the amount of **xp** to count Example: **\`sgxp 2\`***`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoUser);
                    }
                    client.points.set(message.guild.id, Number(args[0]), `setglobalxpcounter`); //set points to 0
                    const embed = new Discord.MessageEmbed()
                    .setColor("#e82fbb")
                    .setDescription(`Successfully set **Global Xp** counter to **${args[0]}x** for: **${message.guild.name}**`)
                    message.reply(embed);
                }
            });
        }
        else{
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
        .setDescription(`*You don't have permission to use this command!*`)
        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        return await message.channel.send(Nopermission8);
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