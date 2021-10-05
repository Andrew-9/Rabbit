const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "loop",
    category: "Music",
    aliases: ["repeat"],
    usage: "loop <0/1/2> |",
    description: "Enables loop for a song or queue\nOff the loop = 0\nloop a song = **1**\nloop the whole queue = **2**",
    run: async (client, message, args) => {
        ///if not a dj, return error
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

        //if no arguments return error
        if (!args[0]) {
        const Usage = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ADD A LOOP STYLE OPTION!")
        .setDescription(`
        <:bluebullet:887635391866372106> **Options Off** \`0\` loop is off
        <:bluebullet:887635391866372106> **Options Song** \`1\` loop the song.
        <:bluebullet:887635391866372106> **Options Queue** \`2\` loop the queue
        <:bluebullet:887635391866372106> You can also use **song**, **queue** or disable
        `)
        return message.channel.send(Usage);
        }
        
        //set variable
        let loopis = args[0];
        if (args[0].toString().toLowerCase() === "song") loopis = "1";
        else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
        else if (args[0].toString().toLowerCase() === "off") loopis = "0";
        else if (args[0].toString().toLowerCase() === "s") loopis = "1";
        else if (args[0].toString().toLowerCase() === "q") loopis = "2";
        else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
        loopis = Number(loopis);

        message.react("<:musicblues:888396777202520124>");
        
        //change loop state
        if (0 <= loopis && loopis <= 2) {
            await client.distube.setRepeatMode(message, parseInt(args[0]));
            const LoopEnabled = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> REPEAT MODE ENABLED!")
            .setDescription(`Repeat mode set to \`${args[0].replace("0", "Disable the loop").replace("1", "Repeat current song").replace("2", "Repeat the whole queue")}\``)
            return message.channel.send(LoopEnabled);
        } else {
            const validnum = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> NOT A VALID NUMBER")
            .setDescription(`
            <:bluebullet:887635391866372106> **Options Off** \`0\` loop is off
            <:bluebullet:887635391866372106> **Options Song** \`1\` loop the song.
            <:bluebullet:887635391866372106> **Options Queue** \`2\` loop the queue
            <:bluebullet:887635391866372106> Please use a number between **0** and **2**
            `)
            return message.channel.send(validnum);
        }
    }
};