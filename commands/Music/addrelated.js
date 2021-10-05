const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "addrelated",
    category: "Music",
    aliases: ["addrelated", "related", "addsimilar", "similar"],
    usage: "addrelated",
    description: "Adds a similar song of the current Track",
    run: async (client, message, args) => {

        if (functions.check_if_dj(message)) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
        .setDescription(`Opps you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
        return message.channel.send(Nopermission8);
        }

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel){
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING PLAYING!")
        .setDescription(`There's currently nothing playing right now`)
        return message.lineReply(notPlaying);
        }

        if (!message.member.voice.channel) {
        const notInChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
        .setDescription(`You have to be in a voice channel to use this command!`)
        return message.lineReply(notInChannel);
        }

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) {
        const notInSameChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
        .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        return message.lineReply(notInSameChannel);
        }
        //get queue
        let queue = client.distube.getQueue(message);

        if (!queue) {
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
        .setDescription(`There's currently nothing playing`)
        return message.lineReply(notPlaying);
        }

        message.react("<:musicblues:888396777202520124>");
        //find related videos
        let newsong = await client.distube.addRelatedVideo(message);

        //send information message
        const adding = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ADDING THE SONG...!")
        .setThumbnail(newsong.songs[0].thumbnail)
        .setDescription(`Searching for **${newsong.songs[0].name}**`)
        message.channel.send(adding);  
        //play track
        return client.distube.play(message, newsong.songs[0].url)
    }
};