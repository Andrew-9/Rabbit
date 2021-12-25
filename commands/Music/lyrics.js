const { KSoftClient } = require('@ksoft/api');
const config = require("../../config.json")
const Discord = require("discord.js");
const ksoft = new KSoftClient(config.ksoftapi);
const functions = require("../../utilities/music-function")
module.exports = {
    name: "lyrics",
    category: "Music",
    aliases: ["ly", "songinfo"],
    useage: "lyrics",
    description: "Shows you the lyrics for the current playing song",
    run: async (client, message, args) => {
        
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

        //get the queue
        let queue = client.distube.getQueue(message);

        //if no queue return error
        if (!queue) {
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
        .setDescription(`There's currently nothing playing`)
        return message.channel.send(notPlaying);
        }

        message.react("<:musicblues:888396777202520124>");
        let cursong = queue.songs[0];
        message.channel.send(`<:musicblues:888396777202520124> **| Searching for:** \`${cursong.name}\``).then(msg => msg.delete({ timeout: 90000 }));
        let lyrics;

        await ksoft.lyrics.get(cursong.name).then(
            async track => {
                if (!track.lyrics) return message.lineReply(`<:musicblues:888396777202520124> **| No lyrics found**`);
                lyrics = track.lyrics;
            
            let currentPage = 0;
            const embeds = functions.lyricsEmbed(client, message, lyrics, cursong);

            const queueEmbed = await message.channel.send(
                `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
            );

            try {
                await queueEmbed.react("⬅️");
                await queueEmbed.react("➡️");
                await queueEmbed.react("⏹");
            } catch (error) {
                console.error(error);
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }

            const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.id || reaction.emoji.name) && message.author.id === user.id;
            const collector = queueEmbed.createReactionCollector(filter, {
                time: 60000
            });

            collector.on("collect", async (reaction, user) => {
                try {
                    if (reaction.emoji.id === "➡️" || reaction.emoji.name === "➡️") {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else if (reaction.emoji.id === "➡️" || reaction.emoji.name === "⬅️") {
                        if (currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                } catch (error) {
                    functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
                    functions.errorbuilder(error.stack.toString().substr(0, 2000))
                }
            });

        });
    }
};
