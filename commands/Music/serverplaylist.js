const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const { MessageButton } = require('discord-buttons');
const Discord = require("discord.js");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
module.exports = {
  name: "serverplaylist",
  category: "Music",
  aliases: ["sp", "serverp", "splaylist"],
  usage: "serverplaylist <add>, <remove>, <play> or <reset> [LINK]",
  description: "This command will add a playlist\nRemove a playlist\nPlay a custom created playlist!",

  run: async (client, message, args) => {
    const prefix = guildPrefix.get(message.guild.id);
    let playlist = client.custom.get(message.guild.id, "playlists");
    if (args[0] === "add" || args[0] === "set" || args[0] === "use") {
      if (!args[1].includes("http")) {
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
      .setDescription(`The Song already exsit in the server's playlist`)
      return message.channel.send(already);
      }
      message.react("<:musicblues:888396777202520124>");
      client.custom.push(message.guild.id, args[1], "playlists");
      const addplay = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> SONG ADDED SUCCESS")
      .setDescription(`Successfully added the song to the server's playlist\nThere are now a total of \`${playlist.length}\` songs in the server's playlist`)
      return message.channel.send(addplay);
    }
    if (args[0] === "reset" || args[0] === "res" || args[0] === "purge") {
      const psure = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> ARE YOU SURE ABOUT THIS?")
      .setDescription(`Are you sure you want to reset your server's playlist?\nReply with **\`yes\`** if you're so sure about this else **\`no\`**`)
      return message.channel.send(psure).then(msg =>{
      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
          if (collected.first().content.includes("yes")) {
            try {
              await client.custom.delete(message.guild.id, "playlists");
            } catch { }
            message.react("<:musicblues:888396777202520124>");
            client.custom.ensure(message.guild.id, { playlists: [] });
            const resetp = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> RESET SUCCESS")
            .setDescription(`Successfully Resetted the server custom playlist`)
            return message.channel.send(resetp);
          } else if (collected.first().content.includes("no")) {
            message.react("<:musicblues:888396777202520124>");
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
    } else if (args[0] === "play" || args[0] === "p" || args[0] === "hear" || args[0] === "listen") {
      client.distube.playCustomPlaylist(message, playlist, { name: message.guild.name + "'s Playlist" });
      message.react("<:musicblues:888396777202520124>");
      const playing = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> PLAYING SERVER'S PLAYLIST!")
      .setDescription(`The server's playlist is being added to the queue`)
      return message.channel.send(playing);
    } else if (args[0] === "remove" || args[0] === "delete" || args[0] === "del" || args[0] === "rem") {
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
        .setTitle("<:musicblues:888396777202520124> SONG NOT IN SERVER PLAYLIST")
        .setDescription(`Oops this song is not in the server's playlist`)
        return message.channel.send(snotp);
      }
      message.react("<:musicblues:888396777202520124>");
      client.custom.remove(message.guild.id, args[1], "playlists");
      const resetp = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> REMOVE SUCCESS")
      .setDescription(`Successfully Removed the song from server playlist`)
      return message.channel.send(resetp);
    } else {
      let string = playlist.join("\n");
      message.react("<:musicblues:888396777202520124>");
      customplay(message, string, playlist[0])
      const plist = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> SERVER PLAYLIST HELP")
      .setDescription(`
      This command includs the following categories you can use. Read it first
      **Note:** You'll have to add the \`serverplaylist\` tag. **Eg:** \`${prefix}serverplaylist add\` link
      <:bluepointer:897839647034601492> ... **1** - \`add\` | \`set\` | \`use\` add songs to the server playlist
      <:bluepointer:897839647034601492> ... **2** - \`reset\` | \`res\` | \`purge\` reset songs in the server playlist
      <:bluepointer:897839647034601492> ... **3** - \`play\` | \`listen\` | \`hear\` play song that are in the server playlist
      <:bluepointer:897839647034601492> ... **4** - \`remove\` | \`delete\` | \`del\` | \`rem\` delete song from the server playlist
      <:bluepointer:897839647034601492> ... **Currently** there are **${playlist.length}** songs in the server playlist! **(¬‿¬)**
      `)
      return message.channel.send(plist);
    }
  }
};
async function customplay(client, message, string, cursong) {
  let currentPage = 0;
  const embeds = functions.serverplaylistembed(client, message, string, cursong);

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