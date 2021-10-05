const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "setxpcounter",
    aliases: ["sxp", "sxp"],
    description: "Changes the amount of how much **xp** to count when a user messages **x1, x2, x3**\nwith this you can slow down the amount of **xp** a user gets while messaging\nthat also applies for speeding up the amount of **xp** for the user\nAs an example you can use \`setxpcounter @kotlin0427 5\`",
    category: "Leveling",
    usage: "setxpcounter <user> <amount>",
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
                    try {
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
                        if (!args[0]) {
                            const NoArgs = new Discord.MessageEmbed()
                            .setColor("#e63064")
                            .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKUSER!")
                            .setDescription(`*Give me a user to set their **xp** counter*`)
                            .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                            .setTimestamp();
                            return message.lineReply(NoArgs);
                        }
                        let rankuser = message.mentions.users.first() || message.author;
                        if (!rankuser) {
                            const NoUser = new Discord.MessageEmbed()
                            .setColor("#e63064")
                            .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKUSER!")
                            .setDescription(`*Give me a user to set their **xp** counter*`)
                            .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                            .setTimestamp();
                            return message.lineReply(NoUser);
                        }
                        if (rankuser.bot) {
                            const NoRankForBots = new Discord.MessageEmbed()
                            .setColor("#e63064")
                            .setTitle("<:xvector:869193619318382602> NO RANK FOR BOTS!")
                            .setDescription(`*It's a **bot** and bots can't have a rank*`)
                            .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                            .setTimestamp();
                            return message.lineReply(NoRankForBots);
                        }
                        const key = `${message.guild.id}-${rankuser.id}`;
                        databasing(rankuser);
                        if (!args[1]){
                            const NoArgs1 = new Discord.MessageEmbed()
                            .setColor("#ff336d")
                            .setTitle("<:xvector:869193619318382602> PLEASE GIVE ME A USER!")
                            .setDescription(`*You can use \`setxpcounter @kotlin0427 5\`*`)
                            .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                            .setTimestamp();
                            return message.lineReply(NoArgs1);
                        }
                        client.points.set(key, Number(args[1]), `xpcounter`); //set points to 0
                        const embed = new Discord.MessageEmbed()
                        .setColor("#00ff7e")
                        .setDescription(`Successfully set **xp** counter to **${args[1]}x** for: **${rankuser.tag}**`)
                        message.reply(embed);
                        rankuser.send(`Your **xp** counter was set to **${args[1]}x** in **${message.guild.name}**`);
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