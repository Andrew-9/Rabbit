const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
var { getPreview } = require("spotify-url-info");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
module.exports = {
  name: "skipnext",
  category: "Music",
  aliases: ["sn", "nextskip"],
  usage: "skipnext <name> or <url>",
  description: "Play new song and skip the current song",
  run: async (client, message, args) => {
    const prefix = guildPrefix.get(message.guild.id);
    if(functions.check_if_dj(message)) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
    .setDescription(`Oops you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
    return message.channel.send(Nopermission8);
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
    if (!args[0]) {
    const Usage = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> ADD A MUSIC TO PLAY!")
    .setDescription(`<:bluebullet:887635391866372106> **Youtube** \`${prefix}skipnext\` <youtube link | music name | youtube playlist>\n<:bluebullet:887635391866372106> **Spotify** \`${prefix}play\` <spotify song link>`)
    return message.channel.send(Usage);
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
    
    //if bot not connected use play
    if (!message.guild.me.voice.channel) {
      message.react("<:musicblues:888396777202520124>");
      message.channel.send(`<:musicblues:888396777202520124> **| Searching for:** \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 90000 }));
      return client.distube.play(message, args.join(" "));
    }

    //send information message
    message.react("<:musicblues:888396777202520124>");
    message.channel.send(`<:musicblues:888396777202520124> **| Searching and Skipping:** \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 90000 }));
    
    //if its a spotify track then get preview data and use it
    if (args.join(" ").includes("track") && args.join(" ").includes("open.spotify")) {
      let info = await getPreview(args.join(" "));
      return client.distube.playSkip(message, info.artist + " " + info.title);
    } 

    //if its a playlist of some kind send info
    else if (args.join(" ").includes("playlist") || args.join(" ").includes("deezer")) {
    const spotifyf = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> PLAYLISTS IS NOT SUPPORTED!")
    .setDescription(`Playlists are not supported for playskip **(¬‿¬)**`)
    message.channel.send(spotifyf);
    }
    else {
      return client.distube.playSkip(message, args.join(" "));
    }
  }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});