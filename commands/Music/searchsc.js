const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
//const scdl = require("soundcloud-downloader").default;
module.exports = {
    name: "searchsc",
    category: "Music",
    usage: "searchsc <url> or <name>",
    description: "Searches for 15 results in soundcloud",
    run: async (client, message, args) => {

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

    //if no arguments added, return error
    if (!args[0]) {
    const Usage = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> ADD A MUSIC TO PLAY!")
    .setDescription(`Please add something you wanna search for`)
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

    //send information message
    message.react("<:musicblues:888396777202520124>");
    message.channel.send(`<:musicblues:888396777202520124> **| Searching for:** \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 190000 }));

        //search in soundcloud
        scdl.search('tracks', args.join(" "))
            .then(async results => {
                //for each result do this
                let searchresult = "";
                for (let i = 0; i < results.collection.length; i++) {
                    try {
                        let mins = Math.floor((results.collection[i].full_duration / 1000) / 60);
                        let secs = Math.floor((results.collection[i].full_duration / 1000) % 60);
                        if (mins < 10) mins = "0" + mins;
                        if (secs < 10) secs = "0" + secs;
                        let durr = mins + ":" + secs;
                        searchresult += await `<:bluebullet:887635391866372106> ...**${i+1}**. [${results.collection[i].permalink}](${results.collection[i].permalink_url}) - \`${durr}\`\n`;
                    } catch {
                        searchresult += await " ";
                    }
                }

                //send information message
                const searchr = new Discord.MessageEmbed()
                .setColor(config.colors.playmode)
                .setTitle("<:musicblues:888396777202520124> SEARCH RESULTS!")
                .setDescription(searchresult)
                message.channel.send(searchr);
      
                //wait for userinput with 60 sec. delay
                let userinput;
                await message.channel.awaitMessages(m => m.author.id == message.author.id, {
                max: 1,
                time: 60000,
                errors: ["time"],
                }).then(collected => {
                userinput = collected.first().content;
                if (Number(userinput) <= 0 && Number(userinput) > 15) {
                const notanum = new Discord.MessageEmbed()
                .setColor(config.colors.playmode)
                .setTitle("<:musicblues:888396777202520124> NOT A VALID NUMBER!")
                .setDescription(`That's not the right number. so i'll just use number **1**`)
                message.lineReply(notanum);
                userinput = 1;
                }
                }).catch(() => {
                    console.error;
                    userinput = 404
                });
                //if something went wrong send error
                if (userinput === 404) {
                const Anerror = new Discord.MessageEmbed()
                .setColor(config.colors.playmode)
                .setTitle("<:musicblues:888396777202520124> AN ERROR OCCURED!")
                .setDescription(`Something went wrong! or time ran out`)
                return message.channel.send(Anerror);
                }

                //send information message
                const searchtr = new Discord.MessageEmbed()
                .setColor(config.colors.playmode)
                .setTitle("<:musicblues:888396777202520124> SEARCHING FOR THE SONG...!")
                .setThumbnail(results.collection[userinput - 1].artwork_url)
                .setDescription(`Searching for: [${results.collection[userinput - 1].permalink}](${results.collection[userinput - 1].permalink_url})`)
                message.channel.send(searchtr);  
                //play the track
                client.distube.play(message, results.collection[userinput - 1].permalink_url)
            })
            .catch(err => console.log(err))
    }
};
