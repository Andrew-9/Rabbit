const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "searchrelated",
    category: "Music",
    aliases: ["searchrelated", "searchsimilar", ],
    usage: "searchrelated. 'wait a while' then Enter a number",
    description: "Seraches similar songs of the current track and let u choose which one you want",
    run: async (client, message, args) => {
        
        if (functions.check_if_dj(message)) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
        .setDescription(`Opps you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
        return message.channel.send(Nopermission8);
        }
    
         //If Bot not connected, return error
        if (!message.guild.me.voice.channel){
        const notPlaying = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOTHING PLAYING!")
        .setDescription(`There's currently nothing playing right now`)
        return message.lineReply(notPlaying);
        }

        if (!message.member.voice.channel) {
        const notInChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
        .setDescription(`You have to be in a voice channel to use this command!`)
        return message.lineReply(notInChannel);
        }

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) {
        const notInSameChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
        .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        return message.lineReply(notInSameChannel);
        }
             
        message.react("<:musicblues:888396777202520124>");
        //get the newsong
        let newsong = await client.distube.addRelatedVideo(message);

        //search for newsongs
        let result = newsong.songs;

        //define variable
        let searchresult = "";

        for (let i = 0; i < result.length; i++) {
            try {
                searchresult += await `<:bluepointer:897839647034601492> ...**${i+1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }
        //send information message
        const searchr = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SEARCH RESULTS FOR RELATED SONGS!")
        .setDescription(searchresult)
        message.channel.send(searchr);

        let userinput;
        await message.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 60000,
            errors: ["time"],
        }).then(collected => {
            userinput = collected.first().content;
            if (Number(userinput) <= 0 && Number(userinput) > 10) {
            const notanum = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> NOT A VALID NUMBER!")
            .setDescription(`That's not the right number. so i'll just use number **1**`)
            message.lineReply(notanum);
            userinput = 1;
            } else {
            const adding = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> ADDING THE SONG...!")
            .setThumbnail(result[userinput - 1].thumbnail)
            .setDescription(`Searching for **${result[userinput - 1].name}**`)
            message.channel.send(adding);  
            client.distube.play(message, result[userinput - 1].url)
            }
        }).catch(() => {
            console.error;
            userinput = 404
        });

        //if something went wrong, return error
        if (userinput === 404) {
        const Anerror = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> AN ERROR OCCURED!")
        .setDescription(`Something went wrong! or time ran out`)
        return message.channel.send(Anerror);
        }
    }
};