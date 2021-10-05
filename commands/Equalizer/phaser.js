const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "Equalizer",
    usage: `<${path.parse(__filename).name}>`,
    description: "*Adds a Filter named " + path.parse(__filename).name,
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

    //get the filter from the content
    let filter = path.parse(__filename).name;

    //if its the same filter as the current one, use bassboost6
    if (filter === queue.filter) filter = "bassboost6";

    //set the new filter
    message.react("<:musicblues:888396777202520124>");
    filter = await client.distube.setFilter(message, filter);

    //send information message
    const adding = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
    .setDescription(`Adding the filter \`${filter}\` hold on...`)
    await message.channel.send(adding);
    }
};
