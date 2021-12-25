const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
//CHARTS
let {
  playlist1,
  playlist2,
  playlist3,
  playlist4,
  playlist5,
  playlist6,
  playlist7,
  playlist8
} = require("../../playlists.json")
module.exports = {
  name: "botplaylist",
  category: "Music",
  aliases: ["botpl", "botplaylist", "pl"],
  usage: "botplaylist <playlist number>",
  description: "Play some of the premade playlists. **Enjoy**",

  run: async (client, message, args) => {

    if (args[0]) {
      switch (args[0].toLowerCase()) {
        case "1":
        message.react("<:musicblues:888396777202520124>");
        const clist = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> LOADING CHARTS PLAYLIST")
        .setDescription(`This may take a few seconds. Hold on...`)
        message.channel.send(clist);
          return client.distube.playCustomPlaylist(message, playlist1, {
            name: "Charts playlist"
          });
          break;
        case "charts":
          message.react("<:musicblues:888396777202520124>");
          const cdlist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING CHARTS PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(cdlist);
          return client.distube.playCustomPlaylist(message, playlist1, {
            name: "Charts playlist"
          });
          break;

        case "2":
          message.react("<:musicblues:888396777202520124>");
          const chlist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING CHRISTMAS PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(chlist);
          return client.distube.playCustomPlaylist(message, playlist2, {
            name: "Christmas playlist"
          });
          break;
        case "christmas":
          message.react("<:musicblues:888396777202520124>");
          const chmlist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING CHRISTMAS PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(chmlist);
          return client.distube.playCustomPlaylist(message, playlist2, {
            name: "Christmas playlist"
          });
          break;

        case "3":
          message.react("<:musicblues:888396777202520124>");
          const jlist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING JAZZ PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(jlist);
          return client.distube.playCustomPlaylist(message, playlist3, {
            name: "Jazz playlist"
          });
          break;
        case "jazz":
          message.react("<:musicblues:888396777202520124>");
          const jzlist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING JAZZ PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(jzlist);
          return client.distube.playCustomPlaylist(message, playlist3, {
            name: "Jazz playlist"
          });
          break;

        case "4":
          message.react("<:musicblues:888396777202520124>");
          const blist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING BLUES PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(blist);
          return client.distube.playCustomPlaylist(message, playlist4, {
            name: "Blues playlist"
          });
          break;
        case "blues":
          message.react("<:musicblues:888396777202520124>");
          const bllist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING BLUES PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(bllist);
          return client.distube.playCustomPlaylist(message, playlist4, {
            name: "Blues playlist"
          });
          break;

        case "5":
          message.react("<:musicblues:888396777202520124>");
          const coulist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING COUNTRY PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(coulist);
          return client.distube.playCustomPlaylist(message, playlist5, {
            name: "Country playlist"
          });
          break;
        case "country":
          message.react("<:musicblues:888396777202520124>");
          const colist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING COUNTRY PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(colist);
          return client.distube.playCustomPlaylist(message, playlist5, {
            name: "Country playlist"
          });
          break;

        case "6":
          message.react("<:musicblues:888396777202520124>");
          const rolist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING ROCK PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(rolist);
          return client.distube.playCustomPlaylist(message, playlist6, {
            name: "Rock playlist"
          });
          break;
        case "rock":
          message.react("<:musicblues:888396777202520124>");
          const rlist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> LOADING ROCK PLAYLIST")
          .setDescription(`This may take a few seconds. Hold on...`)
          message.channel.send(rlist);
          return client.distube.playCustomPlaylist(message, playlist6, {
            name: "Rock playlist"
          });
          break;
          case "7":
            message.react("<:musicblues:888396777202520124>");
            const klist = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> LOADING KYGO PLAYLIST")
            .setDescription(`This may take a few seconds. Hold on...`)
            message.channel.send(klist);
            return client.distube.playCustomPlaylist(message, playlist7, {
              name: "Kygo playlist"
            });
            break;
          case "kygo":
            message.react("<:musicblues:888396777202520124>");
            const kylist = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> LOADING KYGO PLAYLIST")
            .setDescription(`This may take a few seconds. Hold on...`)
            message.channel.send(kylist);
            return client.distube.playCustomPlaylist(message, playlist7, {
              name: "Kygo playlist"
            });
          break;
          case "8":
            message.react("<:musicblues:888396777202520124>");
            const hlist = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> LOADING HOLLOW COVES PLAYLIST")
            .setDescription(`This may take a few seconds. Hold on...`)
            message.channel.send(hlist);
            return client.distube.playCustomPlaylist(message, playlist8, {
              name: "Hollow Coves playlist"
            });
            break;
          case "Hollow":
            message.react("<:musicblues:888396777202520124>");
            const Hclist = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> LOADING HOLLOW COVES PLAYLIST")
            .setDescription(`This may take a few seconds. Hold on...`)
            message.channel.send(Hclist);
            return client.distube.playCustomPlaylist(message, playlist8, {
              name: "Hollow Coves playlist"
            });
          break;
        default:
          const plist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> AVAILABLE PLAYLISTS TO PLAY!")
          .setDescription(`
          <:bluepointer:897839647034601492> .... **1** - Charts
          <:bluepointer:897839647034601492> .... **2** - Christmas
          <:bluepointer:897839647034601492> .... **3** - Jazz
          <:bluepointer:897839647034601492> .... **4** - Blues
          <:bluepointer:897839647034601492> .... **5** - Country
          <:bluepointer:897839647034601492> .... **6** - Rock
          <:bluepointer:897839647034601492> .... **7** - Kygo
          <:bluepointer:897839647034601492> .... **8** - Hollow Coves
          `)
          message.channel.send(plist);
          break;
      }
      } else {
          const plist = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> AVAILABLE PLAYLISTS TO PLAY!")
          .setDescription(`
          <:bluepointer:897839647034601492> .... **1** - Charts
          <:bluepointer:897839647034601492> .... **2** - Christmas
          <:bluepointer:897839647034601492> .... **3** - Jazz
          <:bluepointer:897839647034601492> .... **4** - Blues
          <:bluepointer:897839647034601492> .... **5** - Country
          <:bluepointer:897839647034601492> .... **6** - Rock
          <:bluepointer:897839647034601492> .... **7** - Kygo
          <:bluepointer:897839647034601492> .... **8** - Hollow Coves
          `)
          message.channel.send(plist);
    }
  }
};
