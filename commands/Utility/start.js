const ms = require('ms');
const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "start",
 aliases: [""],
 description: "Start giveaways quickly in your server",
 category: "Utility",
 usage: "start <channel> <duration> <winners> <prize>",
 run: async (client, message, args) => {
  try {
    // If the member doesn't have enough permissions
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ENTER A CHANNEL!")
    .setDescription(`You have to mention a valid channel`)
    return message.channel.send(noId);
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ENTER A DURATION!")
    .setDescription(`You have to specify a valid duration`)
    return message.channel.send(noId);
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ENTER WINNERS NUMBER!")
    .setDescription(`You have to specify a valid number of winners!`)
    return message.channel.send(noId);
    } else if (giveawayNumberWinners > 10){
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ONLY 10 NUMBERS")
    .setDescription(`You must have less than 10 winners!`)
    return message.channel.send(noId);
    }
    
    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ENTER GIVEAWAY PRICE")
    .setDescription(`You have to specify a valid prize!`)
    return message.channel.send(noId);
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+ config.giveawayEmoji + "** GIVEAWAY **" + config.giveawayEmoji,
            giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+ config.giveawayEmoji + "** GIVEAWAY ENDED **" + config.giveawayEmoji,
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with " + config.reaction + " to participate!",
            winMessage: config.giveawayEmoji + " {winners} won **{prize}**!",
            embedFooter: config.botName,
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    const NoAnswer = new Discord.MessageEmbed()
    .setColor("#1cfa91")
    .setTitle("<:checkvector:869193650184269834> GIVEAWAY SUCCESS!")
    .setDescription("Giveaway successfully created in " + `${giveawayChannel}` + "")
    .setFooter("Created by " + `${message.author.username}`, message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048}))
    .setTimestamp();
    message.lineReply(NoAnswer);

}
else {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`You don't have permission to use this command!`)
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