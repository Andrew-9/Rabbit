const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../config");

module.exports = {
 name: "giveaway",
 aliases: ["create", "gstart", "c-giveaway", "giveaway-start"],
 description: "Give gifts to your members by creating a giveway.",
 category: "Utility",
 usage: "giveaway",
 run: async (client, message, args) => {
  try {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
    let giveawayChannel = ''
    let giveawayDuration = ''
    let giveawayNumberWinners = ''
    let giveawayPrize = ''
    let status = ''
 
    async function part1(){
        const PingChannel = new Discord.MessageEmbed()
        .setColor("#ff3e8d")
        .setTitle(":pushpin: PING A CHANNEL!")
        .setDescription(`*Ping the channel that the giveaway should be in.\nEnter \`cancel\` to stop this action.*`)
        await message.channel.send(PingChannel);
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('<:checkvector:869193650184269834> **| Giveaway command canceled**')
                status = 1
                return
            }else{
              giveawayChannel = collected.first().mentions.channels.first()
            if(!giveawayChannel){
                const NoChannel = new Discord.MessageEmbed()
                .setColor("#fc4242")
                .setTitle("<:blurple_textchannel:867878631854178327> NO CHANNEL!")
                .setDescription(`*No channel was mentioned.\nPlease try the command again*`)
                message.lineReply(NoChannel);
                status = 1
            }}
        }).catch(() => {
            const NoAnswer = new Discord.MessageEmbed()
            .setColor("#fc4242")
            .setTitle("<:blurple_textchannel:867878631854178327> NO ANSWER!")
            .setDescription(`*No answer after 30 minutes..\nPlease try the command again*`)
            message.lineReply(NoAnswer);
            status = 1
    })
    }

    async function part2(){
        const GTime = new Discord.MessageEmbed()
        .setColor("#4264fc")
        .setTitle("🕑 SET A GIVEAWAY TIME!")
        .setDescription(`*How long should the giveaway last?\nYou can enter the time in this format: **20s, 20m, 5h**\nEnter \`cancel\` to stop this action.*`)
        await message.channel.send(GTime);
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
              message.channel.send('<:checkvector:869193650184269834> **| Giveaway command canceled**')
                status = 1
                return
            }else
            if(isNaN(ms(collected.first().content.toLowerCase()))){
                const AValidDuration = new Discord.MessageEmbed()
                .setColor("#fc4242")
                .setTitle("<:xvector:869193619318382602> ENTER VALID DURATION!")
                .setDescription(`You have to specify a valid duration!*`)
                message.channel.send(AValidDuration);
                status = 1
                return
            }else{
                giveawayDuration = collected.first().content
            }
        }).catch(() => {
            const NoAnswer = new Discord.MessageEmbed()
            .setColor("#fc4242")
            .setTitle("<:blurple_textchannel:867878631854178327> NO ANSWER!")
            .setDescription(`*No answer after 30 minutes..\nPlease try the command again*`)
            message.lineReply(NoAnswer);
            status = 1
    })
    }

    async function part3(){
        const GWinners = new Discord.MessageEmbed()
        .setColor("#4264fc")
        .setTitle("<:users:869698487577632778> THE WINNERS!")
        .setDescription(`*How many winners should there be? Max 10\nEnter \`cancel\` to cancel to stop this action.*`)
        await message.channel.send(GWinners);
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('<:checkvector:869193650184269834> **| Giveaway command canceled**')
                status = 1
                return
            }else
            if(isNaN(collected.first().content.toLowerCase()) || (parseInt(collected.first().content.toLowerCase()) <= 0)){
                const AValidWinner = new Discord.MessageEmbed()
                .setColor("#fc4242")
                .setTitle("<:xvector:869193619318382602> VALID WINNERS NUMBERS!")
                .setDescription(`You have to specify a valid number of winners!*`)
                message.channel.send(AValidWinner);
                status = 1
                return
            }else 
            if(collected.first().content.toLowerCase() > 10){
                const MaxNumber = new Discord.MessageEmbed()
                .setColor("#fc4242")
                .setTitle("<:xvector:869193619318382602> MAX NUMBERS IS 10!")
                .setDescription(`You must have less than 10 winners!*`)
                message.channel.send(MaxNumber);
                status = 1
                return
            }else{
                giveawayNumberWinners = collected.first().content
            }
        }).catch(() => {
            const NoAnswer = new Discord.MessageEmbed()
            .setColor("#fc4242")
            .setTitle("<:blurple_textchannel:867878631854178327> NO ANSWER!")
            .setDescription(`*No answer after 30 minutes..\nPlease try the command again*`)
            message.lineReply(NoAnswer);
            status = 1
    })
    }

    async function part4(){
        const GPrize = new Discord.MessageEmbed()
        .setColor("#4264fc")
        .setTitle("<:users:869698487577632778> GIVEAWAY PRIZE!")
        .setDescription(`*What should the giveaway prize be?\nEnter \`cancel\` to stop this action.*`)
        await message.channel.send(GPrize);
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('<:checkvector:869193650184269834> **| Giveaway command canceled**')
                status = 1
                return
            }else{
                giveawayPrize = collected.first().content
            }
        }).catch(() => {
            const NoAnswer = new Discord.MessageEmbed()
            .setColor("#fc4242")
            .setTitle("<:blurple_textchannel:867878631854178327> NO ANSWER!")
            .setDescription(`*No answer after 30 minutes..\nPlease try the command again*`)
            message.lineReply(NoAnswer);
            status = 1
    })
    }

    async function part5(){
        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: parseInt(giveawayNumberWinners),
            hostedBy: config.hostedBy ? message.author : null,
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

    async function main(){
        await part1()
        if(status) return
        await part2()
        if(status) return
        await part3()
        if(status) return
        await part4()
        if(status) return
        await part5()
        }
        main()

    } else {
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
