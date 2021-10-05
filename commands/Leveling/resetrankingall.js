const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "resetrankingall",
    aliases: ["rrall"],
    description: "Reset the ranking of everyone in this server",
    category: "Leveling",
    usage: "resetrankingall",
    run: async (client, message, args) => {
        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                let con = sql.query("SELECT `enabled` FROM `ranking` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                    let isEnabled = result[0].enabled
                    if (isEnabled == 0) {
                    const RankNotEnabled = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> RANKING SYSTEM NOT ENABLED")
                    .setDescription(`*The ranking system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(RankNotEnabled);
                    } else if (isEnabled == 1) {
                    function resetrankingall() {
                    try {
                    let allmembers = message.guild.members.cache.keyArray();
                    for (let i = 0; i < allmembers.length; i++) {
                    let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                    const key = `${message.guild.id}-${rankuser.id}`;
                    client.points.set(key, 0, `level`); //set level to 0
                    client.points.set(key, 0, `points`); //set the points to 0
                    client.points.set(key, 500, `neededpoints`) //set neededpoints to 0 for beeing sure
                    client.points.set(key, "", `oldmessage`); //set old message to 0
                    }
                    const embed = new Discord.MessageEmbed()
                    .setColor("#13f8a1")
                    .setTitle("<:checkvector:869193650184269834> RESET COMPLETE")
                    .setDescription(`Successfully resetted everyone's ranking on the system`)
                    message.lineReply(embed);
                    } catch (error) {
                    const Anerror = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                    .setDescription(`\`\`\`${error}\`\`\``)
                    .setFooter("Error in code: Report this error to kotlin0427")
                    .setTimestamp();
                    return message.lineReply(Anerror);
                    }
                    }
                    resetrankingall();
                    }
                });
            }
            else {
                const Nopermission8 = new Discord.MessageEmbed()
                .setColor("#f04949")
                .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
                .setDescription(`*You don't have permission to use this command!*`)
                .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
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