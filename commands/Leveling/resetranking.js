const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "resetranking",
    aliases: ["rr"],
    description: "Resets the ranking of a user back to zero and nothing.",
    category: "Leveling",
    usage: "resetranking <user>",
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
                    function resetranking() {
                    try {
                    let rankuser = message.mentions.users.first();
                    if (!rankuser) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me a user so that i can reseet their ranking*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoUser);
                    }
                    if (rankuser.bot) {
                    const NoRankForBots = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> NO RANK FOR BOTS!")
                    .setDescription(`*It's a **bot** and bots can't have ranks*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoRankForBots);
                    }
                    const key = `${message.guild.id}-${rankuser.id}`;
                    databasing(rankuser);
                    client.points.set(key, 0, `level`); //set level to 0
                    client.points.set(key, 0, `points`); //set the points to 0
                    client.points.set(key, 500, `neededpoints`) //set neededpoints to 0 for beeing sure
                    client.points.set(key, "", `oldmessage`); //set old message to 0

                    const Sendembed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({dynamic: true}))
                    .setDescription(`Your ranking and levels has been resetted to level: **\`0\`**!\n And you points: **\`0\` / \`500\`** in **${message.guild.name}**`)
                    .setColor("#ff8100");
                    rankuser.send(Sendembed);
                    const Doneembed = new Discord.MessageEmbed()
                    .setColor("#00ff96")
                    .setDescription(`Successfully resetted **${rankuser.username}'s** ranking`)
                    message.channel.send(Doneembed);
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
                    resetranking();
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