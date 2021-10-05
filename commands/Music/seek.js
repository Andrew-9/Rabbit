const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "seek",
    category: "Music",
    usage: "seek <duration>",
    description: "Moves in the song by seconds",
    run: async (client, message, args) => {
    //if not a dj, return error
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

    if (!args[0]) {
    const notPlaying = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
    .setDescription(`Please add the amount in seconds you wanna seek to`)
    return message.channel.send(notPlaying);
    }
    message.react("<:musicblues:888396777202520124>");
    const jumped = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> SEEK SUCCESS!")
    .setDescription(`Successfully seeked the song to \`${args[0]}\` seconds`)
    message.channel.send(jumped);
    //Seek
    client.distube.seek(message, Number(args[0] * 1000));
    }
};