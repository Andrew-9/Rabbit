const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const StateManager = require("../../utilities/state_manager");
const { MessageButton } = require('discord-buttons');
const guildPrefix = new Map();
module.exports = {
  name: "myplaylist",
  category: "Music",
  aliases: ["mpl"],
  usage: "myplaylist <add>, <remove>, <play> or <reset> [LINK]",
  description: "Creates a personal playlist for yourself\nPlay your custom created playlist!",

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
    return message.channel.send(notInChannel);
    }

    let playlist = client.custom2.get(message.author.id, "myplaylists");
    if (args[0] === "add" || args[0] === "set" || args[0] === "use" || args[0] === "pull") {
      if (!args[1].includes("http")){
      const notlink = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> INVALID LINK")
      .setDescription(`That is not a valid link.\nAdd a valid link. for example: \`https://www.youtube.com/watch?v=dQw4w9WgXcQ\``)
      return message.channel.send(notlink);
      }
      
      if (playlist.includes(args[1])) {
      const already = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> SONG ALREADY EXSIT")
      .setDescription(`The Song already exsit in your playlist\nYou can't have double songs. add another song`)
      return message.channel.send(already);
      }

      message.react("<:musicblues:888396777202520124>");
      client.custom2.push(message.author.id, args[1], "myplaylists");
      const addplay = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> SONG ADDED SUCCESS")
      .setDescription(`Successfully added the song to your playlist\nThere are now a total of \`${playlist.length+1}\` songs in the personal playlist`)
      return message.channel.send(addplay);

    }
    if (args[0] === "reset" || args[0] === "clean" || args[0] === "purge" || args[0] === "wipe") {
      const psure = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> ARE YOU SURE ABOUT THIS?")
      .setDescription(`Are you sure you want to reset your custom playlist?\nReply with **\`yes\`** if you're so sure about this else **\`no\`**`)
      return message.channel.send(psure).then(msg =>{
      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
          if (collected.first().content.includes("yes")) {
            try {
              await client.custom2.delete(message.author.id, "myplaylists");
            } catch { }
            message.react("<:musicblues:888396777202520124>");
            client.custom2.ensure(message.author.id, { myplaylists: [] });
            const resetp = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> RESET SUCCESS")
            .setDescription(`Successfully Resetted the your custom playlist`)
            return message.channel.send(resetp);
          } else if (collected.first().content.includes("no")) {
            const resetp = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> ACTION CANCELED")
            .setDescription(`This action has been successfully canceled`)
            return message.channel.send(resetp);
          }
        }).catch(error => {
          const Anerror = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> AN ERROR OCCURED!")
          .setDescription(`Something went wrong! or time ran out`)
          return message.channel.send(Anerror);
        })
      })
    }
    if (args[0] === "play" || args[0] === "start" || args[0] === "hear" || args[0] === "listen") {
      client.distube.playCustomPlaylist(message, playlist, { name: message.author.username + "'s Playlist" });
      message.react("<:musicblues:888396777202520124>");
      const playing = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> PLAYING CUSTOM PLAYLIST!")
      .setDescription(`Your custom playlist is being added to the queue`)
      return message.channel.send(playing);
    }
    if (args[0] === "remove" || args[0] === "delete" || args[0] === "del" || args[0] === "rem") {
      if (!args[1]) {
        const addsongp = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ADD A SONG LINK TO REMOVE")
        .setDescription(`Please add a song link that you want to remove!`)
        return message.channel.send(addsongp);
      }
      if (!playlist.includes(args[1])) {
        const snotp = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SONG NOT IN YOUR PLAYLIST")
        .setDescription(`Oops this song is not in your custom playlist`)
        return message.channel.send(snotp);
      }
      message.react("<:musicblues:888396777202520124>");
      client.custom2.remove(message.author.id, args[1], "myplaylists");
      const resetp = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> REMOVE SUCCESS")
      .setDescription(`Successfully Removed the song from your playlist`)
      return message.channel.send(resetp);
    }  else {
      let string = playlist.join("\n");
      customplay(message, string, playlist)
      message.react("<:musicblues:888396777202520124>");
      const plist = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> CUSTOM PLAYLIST HELP")
      .setDescription(`
      This command includs the following categories you can use. Read it first
      **Note:** You'll have to add the \`myplaylist\` tag. **Eg:** \`${prefix}myplaylist add\` [link]
      <:bluepointer:897839647034601492> ... **1** - \`add\` | \`set\` | \`use\` | \`pull\` add songs to your custom playlist
      <:bluepointer:897839647034601492> ... **2** - \`reset\` | \`clean\` | \`purge\` |\`wipe\` reset songs in your playlist
      <:bluepointer:897839647034601492> ... **3** - \`play\` | \`start\` | \`hear\` | \`listen\` play song that are in your playlist
      <:bluepointer:897839647034601492> ... **4** - \`remove\` | \`delete\` | \`del\` | \`rem\` delete song from your playlist
      <:bluepointer:897839647034601492> ... **Currently** there are **${playlist.length}** songs in your custom playlist! **(¬‿¬)**
      `)
      return message.channel.send(plist);
    }
  }
};
async function customplay(client, message, string, cursong) {
  let currentPage = 0;
  const embeds = functions.customplaylistembed(client, message, string, cursong);

  let backtbutton = new MessageButton().setStyle("green").setID("back").setLabel("⏪ Back")
  let homebutton = new MessageButton().setStyle("blurple").setID("home").setLabel("🏡 Home")
  let forwardbutton = new MessageButton().setStyle("green").setID("forward").setLabel("⏩ Forward")
  let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")

  var buttonarray = [backtbutton, forwardbutton, homebutton, linkbutton]

 // const queueEmbed = await message.channel.send( `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]  );

  let queueEmbed = await message.channel.send({ embed: embeds[currentPage], buttons: buttonarray })

  const collector = queueEmbed.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
  collector.on("collect", (b) => {
      b.reply.defer()
      if(b.id == "home"){
        currentPage = 0;
        queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
      }
      else if(b.id == "back"){
          if(currentPage !==0){
              --currentPage;
              //queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage], buttons[buttonarray]);
              queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
          } else {
              currentPage = embeds.length -1;
              queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
          }
      } else if(b.id == "forward"){
          if(currentPage < embeds.length -1){
              currentPage++;
              queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
          } else {
              currentPage = 0;
              queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
          }
      }
  })
}
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});
