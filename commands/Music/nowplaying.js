const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const Canvas = require('canvas');
//require('canvas').registerFont("lib/fonts/FengardoNeue_Regular", { family: "FengardoNeue" });
module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: ["np", "current", "currentsong", "cursong"],
    usage: "nowplaying",
    description: "Display now playing song",
    run: async (client, message, args) => {
        
        if (functions.check_if_dj(message)) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
        .setDescription(`Opps you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
        return message.channel.send(Nopermission8);
        }

        if (!message.guild.me.voice.channel){
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING PLAYING!")
        .setDescription(`There's currently nothing playing right now`)
        return message.channel.send(notPlaying);
        }

        if (!message.member.voice.channel) {
        const notInChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
        .setDescription(`You have to be in a voice channel to use this command!`)
        return message.channel.send(notInChannel);
        }

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) {
        const notInSameChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
        .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        return message.channel.send(notInSameChannel);
        }

        //get the queue
        let queue = client.distube.getQueue(message);

        if (!queue) {
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
        .setDescription(`There's currently no song playing right now`)
        return message.channel.send(notPlaying);
        }

        let queuesong = queue.formattedCurrentTime;
        let cursong = queue.songs[0];
        let cursongtimes = 0;
        let cursongtimem = 0;
        let cursongtimeh = 0;
        let queuetimes = 0;
        let queuetimem = 0;
        let queuetimeh = 0;
        if (cursong.formattedDuration.split(":").length === 3) {
            cursongtimes = cursong.formattedDuration.split(":")[2]
            cursongtimem = cursong.formattedDuration.split(":")[1]
            cursongtimeh = cursong.formattedDuration.split(":")[0]
        }
        if (queuesong.split(":").length === 3) {
            queuetimes = queuesong.split(":")[2]
            queuetimem = queuesong.split(":")[1]
            queuetimeh = queuesong.split(":")[0]
        }
        cursongtimes = cursong.formattedDuration.split(":")[1]
        cursongtimem = cursong.formattedDuration.split(":")[0]
        queuetimes = queuesong.split(":")[1]
        queuetimem = queuesong.split(":")[0]
        let maxduration = Number(cursongtimes) + Number(cursongtimem) * 60 + Number(cursongtimeh) * 60 * 60;
        let minduration = Number(queuetimes) + Number(queuetimem) * 60 + Number(queuetimeh) * 60 * 60;
        let percentduration = Math.floor((minduration / maxduration) * 100);

        // Canvas.registerFont("../../lib/fonts/FengardoNeue_Black.otf", { family: "FengardoNeue" });
        Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
        let songtitle = cursong.name;
        let curtime = cursong.formattedDuration;
        let oftime = `${queue.formattedCurrentTime}/${cursong.formattedDuration}`
        const canvas = Canvas.createCanvas(800, 200);
        const ctx = canvas.getContext('2d');
        // const background = await Canvas.loadImage('.');
        const background = await Canvas.loadImage('./song.png');

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const url = `https://img.youtube.com/vi/${cursong.id}/mqdefault.jpg`
        const avatar = await Canvas.loadImage(url);
        ctx.drawImage(avatar, 10, 10, 192, 108);
        

        var textString = songtitle.substr(0, 35);
        ctx.font = 'bold 40px FengardoNeue';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(textString, 10 + 192 + 10, 10 + 25);
        let textStringt
        if (songtitle.length > 40) textStringt = songtitle.substr(35, 32) + "...";
        else textStringt = "";
        ctx.font = 'bold 40px FengardoNeue';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(textStringt, 10 + 192 + 10, 10 + 25 + 40);

        ctx.font = 'bold 30px FengardoNeue';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(oftime, 10 + 192 + 10, 10 + 25 + 30 + 50);

        let percent = percentduration;
        let index = Math.floor(percent) || 10;
        let left = Number(".".repeat(index).length) * 7.9;

        if (left < 50) left = 50;

        let x = 10;
        let y = 200 - 63;
        let width = left;
        let height = 43;
        let radius = 1;

        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();

        ctx.fillStyle = '#00ffff';
        ctx.fill();

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'nowplaying.png');

        message.react("<:musicblues:888396777202520124>");

        let nowplaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle(cursong.name)
        .setURL(cursong.url)
        .setImage("attachment://nowplaying.png")
        .attachFiles(attachment)
        await message.channel.send(nowplaying);
        return;
    }
};