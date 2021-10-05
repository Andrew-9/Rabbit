const radio = require("../../radio")
const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "radio",
    category: "Music",
    usage: "radio <radiostation> <volume>",
    description: "Play one of the 200 Radio Station, or see them by just typing radio!",
    run: async (client, message, args) => {
    if (message.guild.me.voice.channel && args[0]) {
    //if not a dj, return info
    if(functions.check_if_dj(message)) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
    .setDescription(`Oops you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
    return message.channel.send(Nopermission8);
    }

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

    if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) {
    const notInSameChannel = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
    .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
    return message.lineReply(notInSameChannel);
    }

    //if not allowed to CONNECT to the CHANNEL
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) {
    const nojoin = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT ABLE TO JOIN!")
    .setDescription(`I am not allowed to \`join\` your channel\nYou can give me permission or use another channel`)
    return message.lineReply(nojoin);
    } 
    //If bot not connected, join the channel
    if(!message.guild.me.voice.channel)
    message.member.voice.channel.join().catch(e=>{
    const nojoin = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT ABLE TO JOIN!")
    .setDescription(`I am not allowed to \`join\` your channel\nYou can give me permission or use another channel`)
    return message.lineReply(nojoin);
    })
    
    //if not allowed to CONNECT to the CHANNEL
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) {
    const nojoin = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT ABLE TO SPEAK!")
    .setDescription(`I am not allowed to \`speak\` in your channel\nYou can give me permission or use another channel`)
    return message.lineReply(nojoin);
    }

    //stop the Distube
    message.react("<:musicblues:888396777202520124>");
    try{
    client.distube.stop(message);
    }catch{
    console.log("JUST PLAY RADIO")
    }

    //execute the radio module
    return radio(client, message, args); //get the radio module
    } else {
    //execute the radio module
    return radio(client, message, args); //get the radio module
    }
    }
};