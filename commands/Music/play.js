const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const StateManager = require("../../utilities/state_manager");
// const scdl = require("soundcloud-downloader").default;
var { getPreview, getTracks } = require("spotify-url-info");
const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
const guildPrefix = new Map();
module.exports = {
  name: "play",
  category: "Music",
  aliases: [""],
  description: "Play any music from **Youtube,** **Spotify** or a **Custom playlist**\nEndeless streaming of musics with custom playlist",
  usage: "play <name> or <url>",
  run: async (client, message, args) => {
    const prefix = guildPrefix.get(message.guild.id);
    //if not a dj, return error Disabled - Because not needed 
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
    .setDescription(`<:bluebullet:887635391866372106> **Youtube** \`${prefix}play\` <youtube link | youtube video name | youtube playlist>\n<:bluebullet:887635391866372106> **Spotify** \`${prefix}play\` <spotify song link> | spotify playlist **coming soon**`)
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
   
    //If all is well send send searching message
    message.react("<:musicblues:888396777202520124>");
    message.channel.send(`<:musicblues:888396777202520124> **| Searching for:** \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 90000 }));
    

    // if it's a soundcloud url
    if (args.join(" ").includes("soundcloud")){
      // message.react("<:musicblues:888396777202520124>");
      // message.channel.send(`<:musicblues:888396777202520124> **| Searching for:** \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 90000 }));
      // scdl.search('tracks', args.join(" "))
      // .then(async results => {
      //   functions.embedbuilder(client, 10000, message, config.colors.yes, "🔎 Playing!", `[${results.collection[0].permalink}](${results.collection[0].permalink_url})`, results.collection[0].artwork_url)
      //   return client.distube.play(message, results.collection[0].permalink_url)
      // })
     console.log("Soundcloud track")
    } 

    //get deezer song if it's dezzer url or so
    else if (args.join(" ").includes("deezer")) {
      const deezerf = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> THIS FEATURE IS NOT OUT")
      .setDescription(`The deezer feature is not developed **stay tuned**`)
      message.channel.send(deezerf);
      //Get album list for the given artist id
      // let track = args.join(" ").split("/")
      // track = track[track.length - 1]
      // deezer.playlist.tracks(track).then(async function (result) {
      //   let items = result.data;
      //   let songsarray = [];
      //   let tracklength = items.length;

      //   const dezzerf = new Discord.MessageEmbed()
      //   .setColor("#00f7ff")
      //   .setTitle("<:musicblues:888396777202520124> FETCHING DEZZER SONG!")
      //   .setDescription(`This will take me around about: **${tracklength / 2 }** seconds`)
      //   message.channel.send(dezzerf);
        
      //   for (let i = 0; i < 25; i++) {
      //     let result = await client.distube.play(items[i].title);
      //     songsarray.push(result[0].url)
      //   }
      //   client.distube.playCustomPlaylist(message, songsarray, { name: message.author.username + "'s Deezer Playlist" });
      // });
    } 

    //do the same things for spotify track
    else if (args.join(" ").includes("track") && args.join(" ").includes("open.spotify")) {
      message.react("<:musicblues:888396777202520124>");
      let info = await getPreview(args.join(" "));
      return client.distube.play(message, info.artist + " " + info.title);
    } 

    //same for spotify playlist
    else if (args.join(" ").includes("playlist") && args.join(" ").includes("open.spotify")) {
      let items = await getTracks(args.join(" "));
      const spotifyf = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> SPOTIFY PLAYLIST IS NOT OUT!")
      .setDescription(`The spotify has not been developed yet. **stay tuned**`)
      message.channel.send(spotifyf);
      // let songsarray = [];
      // let tracklength = items.length;
      // if (tracklength > 25) {
      // const ptracklength = new Discord.MessageEmbed()
      // .setColor(config.colors.playmode)
      // .setTitle("<:musicblues:888396777202520124> PLAYLIST TRACK LENGTH")
      // .setDescription(`The maximum amount of tracks in spotify playlists must be **25** tracks\nPlace your suggestions if you want more playlist tracks`)
      // message.lineReply(ptracklength);
      // tracklength = 25;
      // } else {
      // const spotifyf = new Discord.MessageEmbed()
      // .setColor(config.colors.playmode)
      // .setTitle("<:musicblues:888396777202520124> FETCHING SPOTIFY SONG!")
      // .setDescription(`This will take me around about: **${tracklength / 2 }** seconds`)
      // message.channel.send(spotifyf);

      // for (let i = 0; i < 25; i++) {
      //   await client.distube.play(message, items[i].title);
      //   songsarray.push(result[0].url)
      // }
      // client.distube.playCustomPlaylist(message, songsarray, {
      //   name: message.author.username + "'s Spotify Playlist"
      // });
      // }
    } 

    //just play the song
    else {
      return client.distube.play(message, args.join(" "));
    }
  }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});