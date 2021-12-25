const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const chalk = require("chalk");
const gradient = require("gradient-string");
const table = new ascii();
const Discord = require("discord.js")
table.setHeading("Command", "Category", "Load status");
table.setTitleAlign(table.CENTER);
const config = require("../config.json")
const functions = require("../utilities/music-function")

module.exports = (client) => {
 readdirSync("./commands/").forEach((dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
  for (let file of commands) {
   let pull = require(`../commands/${dir}/${file}`);
   try {
    if (typeof pull.name != "string" || typeof pull != "object") throw new Error("Missing a name or name is not a string");
    if (pull.category && typeof pull.category !== "string") throw new Error("Category is not a string");
    if (pull.description && typeof pull.description !== "string") throw new Error("Description is not a string");
    if (pull.usage && typeof pull.usage !== "string") throw new Error("Usage is not a string");
    if (pull.name && pull.category) {
     client.commands.set(pull.name, pull);
     table.addRow(pull.name, pull.category, "OK");
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
   } catch (error) {
    table.addRow(file, "-", `ERROR -> ${error}`);
   }
  }
 });

 //////////////////////////

//  const guildonlycounter = new Map();
//  client.on("ready", () => {
//      setInterval(() => {
//          client.guilds.cache.forEach(async guild => {
//              await functions.delay(client.ws.ping);
//              let member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
//              //if not connected
//              if (!member.voice.channel)
//                  return;
//              if (member.voice.channel.members.size === 1) {
//                  if (!guildonlycounter.has(guild.id)) return guildonlycounter.set(guild.id);
//                  try {
//                      guildonlycounter.delete(guild.id);
//                      return member.voice.channel.leave();
//                  } catch {}
//              }
//          });
//      }, (30 * 1000));
//  });

 ////////////////////////
 client.distube
 .on("playSong", async (message, queue, song) => {
     client.infos.set("global", Number(client.infos.get("global", "songs")) + 1, "songs");
     try {
         queue.connection.voice.setDeaf(true);
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
     try {
         queue.connection.voice.setSelfDeaf(true);
     } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // message.channel.send(Anerror);
     }
     try {
         functions.playsongyes(client, message, queue, song);
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
 })
 .on("addSong", (message, queue, song) => {
     try {
        const songadd = new Discord.MessageEmbed()
        .setColor(config.colors.music)
        .setThumbnail(song.thumbnail)
        .setTitle(`<:musicblues:888396777202520124> SONG ADDED TO THE QUEUE`)
        .setDescription(`
        <:bluepointer:897839647034601492> **Song** - \`${song.name}\`
        <:bluepointer:897839647034601492> **Duration** - \`${song.formattedDuration}\`
        <:bluepointer:897839647034601492> **Requested by** - ${song.user}
        <:bluepointer:897839647034601492> **Estimated Time** - \`${queue.songs.length - 1}\` song(s) - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`
        <:bluepointer:897839647034601492> **Queue duration** - \`${queue.formattedDuration}\`
        `)
        .setFooter(`${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        message.channel.send(songadd).then(msg => msg.delete({ timeout: 60000 }));
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
 })
 .on("playList", (message, queue, playlist, song) => {
     try {
        queue.connection.voice.setDeaf(true);
     } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // message.channel.send(Anerror);
     }
     try {
         queue.connection.voice.setSelfDeaf(true);
     } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // message.channel.send(Anerror);
     }
     const playadd =  new Discord.MessageEmbed()
     .setColor(config.colors.music)
     .setThumbnail(playlist.thumbnail.url ? playlist.thumbnail.url : "")
     .setTitle(`<:musicblues:888396777202520124> PLAYLIST ADDED TO THE QUEUE`)
     .setDescription(`
     <:bluepointer:897839647034601492> **Playlist** - \`${playlist.name}\`
     <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedDuration}\`
     <:bluepointer:897839647034601492> **Requested by** - ${queue.songs[0].user ? queue.songs[0].user : "error"}
     <:bluepointer:897839647034601492> **Estimated Time** - \`${playlist.songs.length ? playlist.songs.length : "undefinied"} \` songs
     <:bluepointer:897839647034601492> **Queue duration** - \`${queue.formattedDuration}\`
     `)
     .setFooter(`${playlist.user.tag}`, playlist.user.displayAvatarURL({dynamic: true}))
     message.channel.send(playadd).then(msg => msg.delete({ timeout: 70000 }));
     try {
         functions.playsongyes(client, message, queue, queue.songs[0]);
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
 })
 .on("addList", (message, queue, playlist) => {
     try {
        const listadd =  new Discord.MessageEmbed()
        .setColor(config.colors.music)
        .setThumbnail(playlist.thumbnail.url ? playlist.thumbnail.url : "")
        .setTitle(`<:musicblues:888396777202520124> ADDED A PLAYLIST TO THE QUEUE`)
        .setDescription(`
        <:bluepointer:897839647034601492> **Playlist** - \`${playlist.name}\`
        <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedDuration}\`
        <:bluepointer:897839647034601492> **Requested by** - ${queue.songs[0].user ? queue.songs[0].user : "error"}
        <:bluepointer:897839647034601492> **Estimated Time** - \`${playlist.songs.length ? playlist.songs.length : "undefinied"} \` songs
        <:bluepointer:897839647034601492> **Queue duration** - \`${queue.formattedDuration}\`
        `)
        .setFooter(`${playlist.user.tag}`, playlist.user.displayAvatarURL({dynamic: true}))
        message.channel.send(listadd).then(msg => msg.delete({ timeout: 70000 }));
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
 })
 .on("searchResult", (message, result) => {
     try {
         let i = 0;
         const sresult = new Discord.MessageEmbed()
         .setColor(config.colors.music)
         .setThumbnail(playlist.thumbnail.url ? playlist.thumbnail.url : "")
         .setTitle(`<:musicblues:888396777202520124> CHOOSE AN OPTION BELOW`)
         .setDescription(`${result.map(song => `<:bluepointer:897839647034601492> **${++i}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}`)
         .setFooter(`Enter a number. will cancel after 60 seconds`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
         return message.channel.send(sresult)
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
 })
 .on("searchCancel", (message) => {
     try {
        message.react("❌")
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
     try {
        const canceled = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:musicblues:888396777202520124> SEARCHING CANCELED")
        .setDescription(`The music search was canceled`)
        return message.channel.send(canceled);
     } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // message.channel.send(Anerror);
     }
 })
 .on("error", (message, err) => {
     try {
         message.react("❌")
     } catch (error) {
        console.log(error)
        const Anerror = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin0427")
        .setTimestamp();
        message.channel.send(Anerror);
     }
     console.log(err);
     try {
        // const Anerrore = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${err}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // return message.channel.send(Anerrore);
     } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // message.channel.send(Anerror);
     }
 })
 .on("finish", message => {
     try {
        const ended = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> LEFT THE CHANNEL")
        .setDescription(`There are no more songs left to play`)
        return message.channel.send(ended);
     } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // message.channel.send(Anerror);
     }
 })
 .on("empty", message => {
     try {
        const ended = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> LEFT THE CHANNEL")
        .setDescription(`Left the channel because it's empty!`)
        return message.channel.send(ended);
     } catch (error) {
         console.error(error)
        //  const Anerror = new Discord.MessageEmbed()
        //  .setColor("#e63064")
        //  .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        //  .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        //  .setFooter("Error in code: Report this error to kotlin0427")
        //  .setTimestamp();
        //  message.channel.send(Anerror);
     }
 })
 .on("noRelated", message => {
     try {
        const norelated = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO RELATED VIDEO FOUND")
        .setDescription(`Can't find related video to play. Stop playing music.`)
        return message.channel.send(norelated);
     } catch (error) {
         console.error(error)
         const Anerror = new Discord.MessageEmbed()
         .setColor("#e63064")
         .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
         .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
         .setFooter("Error in code: Report this error to kotlin0427")
         .setTimestamp();
         message.channel.send(Anerror);
     }
 })
 .on("initQueue", queue => {
     try {
         queue.autoplay = false;
         queue.volume = 50;
         queue.filter = "bassboost6";
     } catch (error) {
         console.error(error)
        //  const Anerror = new Discord.MessageEmbed()
        //  .setColor("#e63064")
        //  .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        //  .setDescription(`\`\`\`${error.stack.toString().substr(0, 2000)}\`\`\``)
        //  .setFooter("Error in code: Report this error to kotlin0427")
        //  .setTimestamp();
        //  message.channel.send(Anerror);
     }
 });

 const logo =
  gradient.pastel.multiline(
   [
    " ____      _    ____  ____ ___ _____ ",
    "|  _ \\    / \\  | __ )| __ )_ _|_   _| ",
    "| |_) |  / _ \\ |  _ \\|  _ \\| |  | |  ",
    "|  _ <  / ___ \\| |_) | |_) | |  | |  ",
    "|_| \\_\\/_/   \\_\\____/|____/___| |_|  ",

   ].join("\n")
  ) + "\n       -- By Kotlin#0427 --       \n\n";
 console.log(chalk.bold.bgBlack(logo));
 console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(" Please wait... Loading commands..."));
 console.log(chalk.cyan.bold(table.toString()));
 console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + " commands!"));
};
