const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "rewind",
    category: "Music",
    aliases: ["rew"],
    usage: "rewind <duration>",
    description: "Rewinds the song back by seconds",
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
      //get the Queue
      let queue = client.distube.getQueue(message);
      if (!queue) {
      const notPlaying = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
      .setDescription(`There's currently nothing playing`)
      return message.channel.send(notPlaying);
      }
     //if no arguments, return error message
     if (!args[0]) {
      const notPlaying = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
      .setDescription(`Please add the amount in seconds you wanna rewind`)
      return message.channel.send(notPlaying);
     }

    //get seektime
    message.react("<:musicblues:888396777202520124>");
    let seektime = queue.currentTime - Number(args[0]) * 1000;
    if (seektime < 0) seektime = 0;
    if (seektime >= queue.songs[0].duration - queue.currentTime) seektime = 0;
    //seek
    client.distube.seek(message, Number(seektime));

    //send information message
    const Rewinded = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> SONG HAS BEEN REWINDED!")
    .setDescription(`Rewinded the song by \`${args[0]}\` seconds`)
    message.channel.send(Rewinded);
    }
};