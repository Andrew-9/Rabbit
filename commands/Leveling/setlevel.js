const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "setlevel",
    aliases: ["sl"],
    description: "Give a specific amount of levels to any user\nFor example you can increase a user's level to a certain number by just giving it to them. easy and very simple",
    category: "Leveling",
    usage: "setlevel <user> <amount>",
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
                    function setlevel() {
                    try {
                    if (!args[0]) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me the user to set their level*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoUser);
                    }
                    let rankuser = message.mentions.users.first();
                    if (!rankuser) {
                    const NoUser = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKED USER!")
                    .setDescription(`*Give me the user to set their level*`)
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
                    if (!args[1]) {
                    const NoPoint = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:xvector:869193619318382602> ADD SOME LEVELS TO GIVE!")
                    .setDescription(`*Please add the amount of Levels you want to give*`)
                    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                    .setTimestamp();
                    return message.lineReply(NoPoint);
                    }
                    if (Number(args[1]) < 1) args[1] = 1;
                    client.points.set(key, Number(args[1]), `level`); //set level to the wanted level
                    client.points.set(key, 0, `points`); //set the points to 0
                    let newLevel = client.points.get(key, `level`); //set level to the wanted level
                    let counter = Number(newLevel) / 4;
                    client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                    //add 100 for each divideable 4
                    for (let i = 0; i < Math.floor(counter); i++) {
                    client.points.math(key, `+`, 100, `neededpoints`)
                    }
                    message.channel.send(`<@${rankuser.id}> You've just advanced to level **${newLevel}!**`);
                    const addsuccess = new Discord.MessageEmbed()
                    .setColor("#10fcaa")
                    .setDescription(`Successfully set **${rankuser.username}'s level** to level: **${args[1]}**`)
                    message.reply(addsuccess);
                    rankuser.send(`**Hello there** your level was set to level **${args[1]}** in **${message.guild.name}**`);
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
                    setlevel();
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