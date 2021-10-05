const StateManager = require("../../utilities/state_manager");
const config = require("../../config.json")
const Discord = require("discord.js");
const guildPrefix = new Map();
module.exports = {
  name: "join",
  category: "Music",
  aliases: ["connect", "summon", "comehere", "come"],
  usage: "join",
  description: "Tells Rabbit to join the voice channel you're in!",
  run: async (client, message, args) => {
    const prefix = guildPrefix.get(message.guild.id);
    //if user not connected return
    if (!message.member.voice.channel) {
    const notInChannel = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
    .setDescription(`You have to be in a voice channel to use this command!`)
    return message.channel.send(notInChannel);
    }
    
    if(message.guild.me.voice.channel) {
    const alreadycha = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> ALREADY IN A VOICE CHANNEL!")
    .setDescription(`I am already connected to a voice channel`)
    return message.channel.send(alreadycha);
    } 
   
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) {
    const nojoin = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT ABLE TO JOIN!")
    .setDescription(`I am not allowed to \`join\` your channel\nYou can give me permission or use another channel`)
    return message.lineReply(nojoin);
    }

    message.member.voice.channel.join().catch(e=>{
    const nojoin = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT ABLE TO JOIN!")
    .setDescription(`I am not allowed to \`join\` your channel\nYou can give me permission or use another channel`)
    return message.lineReply(nojoin);
    })
   
    message.react("<:musicblues:888396777202520124>");
    //send info msg
    message.channel.send(`<:rabbitsmirk:868230245176713266> **| Joined your channel.** Let's start the party with \`${prefix}play\``);
  }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});