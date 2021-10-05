const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "setpoints",
    aliases: ["st"],
    description: "Set a specific amount of **points** to any user. unlike the add points which adds more point to the users points like a **+** this command will set the users point to the number you want. dosen't matter how many points the user had before you can set it back to 5 or more. **Eg:** setpoints Kotlin#0427 **10** and all my points will be set to **10**",
    category: "Leveling",
    usage: "setpoints <user> <amount>",
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
                    function setpoints() {
                    try {
                    if (!args[0]) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me the user to set their points*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoUser);
                    }
                    let rankuser = message.mentions.users.first();
                    if (!rankuser) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me the user to set their points*`)
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
                    let toaddpoints = Number(args[1]);
                    if (!args[1]) {
                    const NoPoint = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD SOME POINTS TO SET!")
                    .setDescription(`*Give me the amount of points you want to set*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoPoint);
                    }
                    if (Number(args[1]) < 0) args[1] = 0;
                    const neededPoints = client.points.get(key, `neededpoints`);
                    addingpoints(toaddpoints, neededPoints);
                    function addingpoints(toaddpoints, neededPoints) {
                    if (toaddpoints >= neededPoints) {
                    client.points.set(key, 0, `points`); //set points to 0
                    client.points.inc(key, `level`); //add 1 to level
                     //HARDING UP!
                    const newLevel = client.points.get(key, `level`); //get current NEW level
                    if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)
                    const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                    message.channel.send(`<@${rankuser.id}> You've just advanced to level **${newLevel}!**`);
                    rankuser.send(`You've just advanced to level **${newLevel}!** in **${message.guild.name}**`);
                    addingpoints(toaddpoints - neededPoints, newneededPoints); //there are still points left. so add it for the user
                    } else {
                    client.points.set(key, Number(toaddpoints), `points`)
                    }
                    }
                    const embed = new Discord.MessageEmbed()
                    .setColor("#ff0efa")
                    .setDescription(`Successfully set **${rankuser.username}'s** points to **${toaddpoints}**`)
                    message.channel.send(embed);
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
                    setpoints();
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