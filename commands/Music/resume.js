const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "resume",
    category: "Music",
    aliases: ["r"],
    usage: "resume",
    description: "Resume the music",
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
        
    //if Bot is not paused, return error
    if (!client.distube.isPaused(message)) {
    const notPaused = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> MUSIC IS NOT PAUSED!")
    .setDescription(`The current song is still playing. pause it first!`)
    return message.channel.send(notPaused);
    } 
    
    message.react("<:musicblues:888396777202520124>");
    //send information embed
    const notPaused = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> MUSIC HAS BEEN RESUMED!")
    .setDescription(`The current song has been resumed. listen carefully!`)
    message.channel.send(notPaused);
    return client.distube.resume(message);
    }
};
