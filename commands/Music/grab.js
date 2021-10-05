const functions = require("../../utilities/music-function")
const StateManager = require("../../utilities/state_manager");
const config = require("../../config.json")
const Discord = require("discord.js");
const guildPrefix = new Map();
module.exports = {
    name: "grab",
    category: "Music",
    aliases: ["save", "steal"],
    usage: "grab",
    description: "Saves the current playing song in your DM",
    run: async (client, message, args) => {
        const prefix = guildPrefix.get(message.guild.id);
        if(functions.check_if_dj(message)) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
        .setDescription(`Oops you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
        return message.channel.send(Nopermission8);
        }

        if (!message.guild.me.voice.channel) {
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
        //get queue
        let queue = client.distube.getQueue(message);
        if (!queue) {
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
        .setDescription(`There's currently nothing playing`)
        return message.channel.send(notPlaying);
        }

        message.react("<:musicblues:888396777202520124>");
        //send info msg
        return message.author.send(new Discord.MessageEmbed()
        .setAuthor(`CURRENT PLAYING SONG`, queue.songs[0].user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(`https://img.youtube.com/vi/${queue.songs[0].id}/mqdefault.jpg`)
        .setColor(config.colors.playmode)
        .setDescription(`
        <:bluebullet:887635391866372106> **SONG SAVED**
        <:bluebullet:887635391866372106> **Duration** - \`${queue.songs[0].formattedDuration}\`
        <:bluebullet:887635391866372106> **Requested by** - ${queue.songs[0].user.tag}
        <:bluebullet:887635391866372106> **Download this song** - [\`CLICK HERE\`](${queue.songs[0].streamURL})
        <:bluebullet:887635391866372106> **You Play it with** - \`${prefix}play ${queue.songs[0].url}\`
        `)
        .setFooter(client.user.username + ` | Playing music in ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
        )
    }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});
