const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "sleeptimer",
    category: "Music",
    aliases: ["sleep"],
    usage: "sleeptimer <duration in hours>",
    description: "Sets a sleep timer which will stop the bot.\nThe bot will leave the voice channel\nAnd he will kick you out of the channel\n After the hours of duration you set are up.",
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
    const addNumber = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> ADD A SLEEP TIMER!")
    .setDescription(`Please add the amount of \`sleep\` timer you wanna add, in hours.`)
    return message.channel.send(addNumber);
    }
    //send information message
    message.react("<:musicblues:888396777202520124>");
    const sleepin = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> SLEEPTIMER HAS BEEN SET!")
    .setDescription(`I will leave the voice channel in \`${args[0]} hours\``)
    message.channel.send(sleepin);

    //wait until the time ended
    setTimeout(() => {
    //Send information message
    const sleeped = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> STOPPED THE MUSIC!")
    .setDescription(`**Timer** is up and music has been stopped`)
    message.channel.send(sleeped);
     //kick the user
    message.member.voice.setChannel(null)
    //send information to the user
    const stopped = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> YOUR MUSIC HAS BEEN STOPPED!")
    .setDescription(`Your **timer** was up so i stopped the music\nAnd also you have been removed from the voice channel`)
    message.author.send(stopped);
    //stop distube
    client.distube.stop(message);
    //leave the channel
    message.member.voice.channel.leave();
    }, Number(args[0]) * 1000 * 60 * 60)
    }
};