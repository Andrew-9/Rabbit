const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "volume",
    category: "Music",
    aliases: ["vol"],
    usage: "volume <number>",
    description: "Control the sound volume",
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
    const addNumber = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> ADD A VALID NUMBER!")
    .setDescription(`Please add a valid volume number\nThe number must be between \`0\` and \`500\``)
    return message.channel.send(addNumber);
    }
        
    //get the Number count if too big return error
    if (Number(args[0]) > 500 && Number(args[0]) < 0) {
    const addNumber = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT A VALID NUMBER!")
    .setDescription(`Please use a volume number between \`0\` and \`500\``)
    return message.channel.send(addNumber);
    }

    //send information message
    message.react("<:musicblues:888396777202520124>");
    const stopped = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> VOLUME SUCCESS!")
    .setDescription(`DJ **${message.author.username}** changed song volume to \`${args[0]}%\``)
    message.channel.send(stopped);
    //set the volume
    await client.distube.setVolume(message, args[0]);
    }
};