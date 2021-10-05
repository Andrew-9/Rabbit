const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "removepoints",
    aliases: ["st"],
    description: "Remove a specific amount of **points** from any user. This command will remove a specific amount of points from that user dosen't matter how many points they have you can remove them anytime and down that user's level",
    category: "Leveling",
    usage: "removepoints <user> <amount>",
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
                    function removepoints(amount) {
                    try {
                    if (!args[0]) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me a user to remove their points*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoUser);
                    }
                    let rankuser = message.mentions.users.first();
                    if (!rankuser) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me a user to remove their points*`)
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
                    
                    const curPoints = client.points.get(key, `points`);
                    const neededPoints = client.points.get(key, `neededpoints`);
                    if (!args[1] && !amount) {
                    const NoPoint = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD SOME POINTS TO REMOVE!")
                    .setDescription(`*Please add the amount of **points** you want to remove*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoPoint);
                    }
                    if (!amount) amount = Number(args[1]);
                    if (amount < 0) addpoints(amount);
                    removingpoints(amount, curPoints);
                    function removingpoints(amount, curPoints) {
                    if (amount > curPoints) {
                    let removedpoints = amount - curPoints - 1;
                    client.points.set(key, neededPoints - 1, `points`); //set points to 0
                    if (client.points.get(key, `level`) == 1) {  
                    const PointAtZero = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> USER ALREADY AT 0 POINTS!")
                    .setDescription(`*That user's point is already at **0***`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(PointAtZero)
                    }
                    client.points.dec(key, `level`); //remove 1 from level
                    //HARDING UP!
                    const newLevel = client.points.get(key, `level`); //get current NEW level
                    if ((newLevel + 1) % 4 === 0) { //if old level was divideable by 4 set neededpoints && points -100
                    client.points.math(key, `-`, 100, `points`)
                    client.points.math(key, `-`, 100, `neededpoints`)
                    }
                    const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                    //send ping and embed message only IF the removing will be completed!
                    if (amount - removedpoints < neededPoints)
                    message.channel.send(`<@${rankuser.id}> You've leveled down to level **${newLevel}!**`);
                    rankuser.send(`You've just leveled down to level **${newLevel}!** in **${message.guild.name}**`);
                    removingpoints(amount - removedpoints, newneededPoints);
                    } else {
                    client.points.math(key, `-`, Number(amount), `points`)
                    }
                    }
                    const embed = new Discord.MessageEmbed()
                    .setColor("#05eeb3")
                    .setDescription(`Successfully removed **${amount} Points** from: **${rankuser.tag}**`)
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
                    removepoints();
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