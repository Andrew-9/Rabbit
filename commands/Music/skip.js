const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "skip",
    category: "Music",
    aliases: ["s"],
    usage: "skip",
    description: "Skips current song",
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

    //send information message
    message.react("<:musicblues:888396777202520124>");
    const skip = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> SKIP SUCCESS!")
    .setDescription(`Successfully skipped the current song`)
    message.channel.send(skip);

    //skip track
    client.distube.skip(message);
    }
};
