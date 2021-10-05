const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "removelevel",
    aliases: ["rl"],
    description: "Remove a specific amount of **level** from a user. This command will remove the given amount of levels from that user dosen't matter what level they are you can remove them anytime to down that user's level",
    category: "Leveling",
    usage: "removelevel <user> <amount>",
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
                    function removelevel() {
                    try {
                    if (!args[0]) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me a user to remove their level*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoUser);
                    }
                    let rankuser = message.mentions.users.first();
                    if (!rankuser) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me a user to remove their level*`)
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
                    let newLevel = client.points.get(key, `level`);
                    if (!args[1]) {
                    const NoPoint = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD SOME POINTS TO REMOVE!")
                    .setDescription(`*Please add the amount of **levels** you want to remove*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoPoint);
                    }
                    if (Number(args[1]) < 0) args[1] = 0;
                    for (let i = 0; i < Number(args[1]); i++) {
                    client.points.set(key, 0, `points`); //set points to 0
                    client.points.dec(key, `level`); //add 1 to level
                    //HARDING UP!
                    newLevel = client.points.get(key, `level`); //get current NEW level
                    if(newLevel < 1) client.points.set(key, 1 ,`level`); //if smaller then 1 set to 1
                    }
                    ThenewLevel = client.points.get(key, `level`); //get current NEW level
                    let counter = Number(ThenewLevel) / 4;
                    client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                    //add 100 for each divideable 4
                    for (let i = 0; i < Math.floor(counter); i++) {
                    client.points.math(key, `+`, 100, `neededpoints`)
                    }
                    message.channel.send(`<@${rankuser.id}> You've leveled down to level **${newLevel}!**`);
                    rankuser.send(`You've just leveled down to level **${newLevel}!** in **${message.guild.name}**`);
                    const embed = new Discord.MessageEmbed()
                    .setColor("#05eeb3")
                    .setDescription(`Successfully removed **${args[1]} levels** from:  **${rankuser.tag}**`)
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
                    removelevel();
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