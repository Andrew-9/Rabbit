const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
module.exports = {
  name: "mylist",
  category: "Music",
  aliases: ["myplaylistsong"],
  usage: "mylist",
  description: "Displays the urls of each songs in your playlist",
  run: async (client, message, args, cmduser, text, prefix) => {
      
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

    let playlist = client.custom2.get(message.author.id, "myplaylists");
    message.react("<:musicblues:888396777202520124>");
    let currentPage = 0;
    const embeds = functions.customplaylistembed(client, playlist);


    let backtbutton = new MessageButton().setStyle("green").setID("back").setLabel("⏪ Back")
    let homebutton = new MessageButton().setStyle("blurple").setID("home").setLabel("🏡 Home")
    let forwardbutton = new MessageButton().setStyle("green").setID("forward").setLabel("⏩ Forward")
    let linkbutton = new MessageButton().setStyle("url").setLabel("SERVER").setURL("https://discord.com/invite/ghdvMDVFse")
  
    var buttonarray = [backtbutton, forwardbutton, homebutton, linkbutton]
    
    let queueEmbed = await message.channel.send({ embed: embeds[currentPage], buttons: buttonarray })

    //let queueEmbed = await message.channel.send( `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);

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
                //queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
            } else {
                currentPage = 0;
                queueEmbed.edit({ embed: embeds[currentPage], buttons: buttonarray })
            }
        }
    })
  }
}
