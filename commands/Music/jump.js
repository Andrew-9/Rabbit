const StateManager = require("../../utilities/state_manager");
const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const guildPrefix = new Map();
module.exports = {
    name: "jump",
    category: "Music",
    aliases: ["skipto"],
    usage: "jump <query number>",
    description: "Jump to a song in the music queue",
    run: async (client, message, args) => {
        const prefix = guildPrefix.get(message.guild.id);
        //if not a dj, return error
        if(functions.check_if_dj(message)) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
        .setDescription(`Oops you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
        return message.channel.send(Nopermission8);
        }

        if (!message.guild.me.voice.channel) {
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
        //if no args return error
        if (!args[0]) {
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ADD THE SONG NUMBER!")
        .setDescription(`Please add the song position to which you want to jump to`)
        return message.channel.send(notPlaying);
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

        message.react("<:musicblues:888396777202520124>");
        
        if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
            const jumped = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> JUMP SUCCESS!")
            .setDescription(`Successfully Jumped \`${parseInt(args[0])}\` songs!`)
            message.channel.send(jumped);
            return client.distube.jump(message, parseInt(args[0]))
        } else {
            const plist = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> USE A SONG NUMBER")
            .setDescription(`Please use the number of each song **${DisTube.getQueue(message).length}**`)
            return message.channel.send(plist);
        }
    }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
    guildPrefix.set(guildId, prefix);
});
