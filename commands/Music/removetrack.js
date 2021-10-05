const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "removetrack",
    category: "Music",
    aliases: ["rt"],
    usage: "removetrack <track number>",
    description: "Removes a specific track from the queue",
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
        //get queue
        let queue = client.distube.getQueue(message);
        if (!queue) {
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
        .setDescription(`There's currently nothing playing`)
        return message.channel.send(notPlaying);
        }
        if (!args[0]) {
        const AddtrackP = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ADD TRACK POSITION!")
        .setDescription(`Please add the Track Position you want me to remove`)
        return message.channel.send(AddtrackP);
        }      
        //if args too big
        if (isNaN(args[0]) || Number(args[0]) >= queue.songs.length) {
        const OutOfRange = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> TRACK POSITION OUT OF RANGE!")
        .setDescription(`Your track position is out of range. max is **${queue.songs.length}**`)
        return message.channel.send(OutOfRange);
        }

        message.react("<:musicblues:888396777202520124>");
        //save the current track on a variable
        var track = queue.songs[Number(args[0])]
        //clear the queue
        queue.songs.splice(Number(args[0]), Number(args[0]) + 1);

        const Trackremove = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> TRACK REMOVE SUCCESS!")
        .setDescription(`Successfully removed your track \`${track.name}\``)
        return message.channel.send(Trackremove);
    }
};