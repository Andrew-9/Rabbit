const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "addrandomall",
    aliases: ["arall"],
    description: "Add a random amount of Points to everyone on the server",
    category: "Leveling",
    usage: "addrandomall",
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
                    const key = `${message.guild.id}-${message.author.id}`;
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
                    function addrandomall() {
                    try {
                    function Giving_Ranking_Points(thekey, maxnumber) {
                    let setglobalxpcounter = client.points.get(message.guild.id, "setglobalxpcounter")
                    if (!maxnumber) maxnumber = 10;
                    var randomnum = (Math.floor(Math.random() * Number(maxnumber)) + 5) * setglobalxpcounter;
                    randomnum *= Number(client.points.get(key, `xpcounter`));
                    randomnum = Number(Math.floor(randomnum));
                  
                    const curPoints = client.points.get(thekey ? thekey : key, `points`);
                    const neededPoints = client.points.get(thekey ? thekey : key, `neededpoints`);
                    let leftpoints = neededPoints - curPoints;
                  
                    let toaddpoints = randomnum;
                    addingpoints(toaddpoints, leftpoints);
                  
                    function addingpoints(toaddpoints, leftpoints) {
                    if (toaddpoints >= leftpoints) {
                    client.points.set(thekey ? thekey : key, 0, `points`); //set points to 0
                    client.points.inc(thekey ? thekey : key, `level`); //add 1 to level    
                    //HARDING UP!
                    const newLevel = client.points.get(thekey ? thekey : key, `level`); //get current NEW level 
                    if (newLevel % 4 === 0) client.points.math(thekey ? thekey : key, `+`, 100, `neededpoints`)
                    const newneededPoints = client.points.get(thekey ? thekey : key, `neededpoints`); //get NEW needed Points
                    addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)
                    } else {
                    client.points.math(thekey ? thekey : key, `+`, Number(toaddpoints), `points`)
                    }
                    }
                    }
                    Giving_Ranking_Points();
                    var maxnum = Math.floor(Math.random() * (250)) + 0;
                    let allmembers = message.guild.members.cache.keyArray();
                    for (let i = 0; i < allmembers.length; i++) {
                    let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                    databasing(rankuser);
                    if(rankuser.bot) continue;
                    Giving_Ranking_Points(`${message.guild.id}-${rankuser.id}`, maxnum);
                    //Giving_Ranking_Points(`${message.guild.id}-${message.author.id}`, maxnum);
                    }
                    const embed = new Discord.MessageEmbed()
                    .setColor("#e839a2")
                    .setDescription(`Successfully added **${maxnum}** Points to everyone`)
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
                    addrandomall();
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