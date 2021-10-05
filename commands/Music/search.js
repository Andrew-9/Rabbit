const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
module.exports = {
    name: "search",
    category: "Music",
    usage: "search <name> or <url>",
    description: "Search and select music or videos to play",
    run: async (client, message, args) => {
        const prefix = guildPrefix.get(message.guild.id);
        if (functions.check_if_dj(message)) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
        .setDescription(`Opps you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
        return message.channel.send(Nopermission8);
        }

        if (!message.member.voice.channel) {
        const notInChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
        .setDescription(`You have to be in a voice channel to use this command!`)
        return message.channel.send(notInChannel);
        }

        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) {
        const notInSameChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
        .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        return message.channel.send(notInSameChannel);
        }

        if (!args[0]) {
        const Usage = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ADD A MUSIC TO SEARCH!")
        .setDescription(`<:bluebullet:887635391866372106> **Search** \`${prefix}search\` kygo`)
        return message.channel.send(Usage);
        }
    
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")){
        const nojoin = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT ABLE TO JOIN!")
        .setDescription(`I am not allowed to \`join\` your channel\nYou can give me permission or use another channel`)
        return message.channel.send(nojoin);
        }
        //If bot not connected, join the channel
        if(!message.guild.me.voice.channel)
        message.member.voice.channel.join().catch(e=>{
        const nojoin = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT ABLE TO JOIN!")
        .setDescription(`I am not allowed to \`join\` your channel\nYou can give me permission or use another channel`)
        return message.channel.send(nojoin);
        })
        
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) {
        const nojoin = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT ABLE TO SPEAK!")
        .setDescription(`I am not allowed to \`speak\` in your channel\nYou can give me permission or use another channel`)
        return message.lineReply(nojoin);
        }

        message.react("<:musicblues:888396777202520124>");
        //If all is well send send searching message
        message.channel.send(`<:musicblues:888396777202520124> **| Searching** \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 30000 }));

        //search tracks and send first 10 results etc
        let result = await client.distube.search(args.join(" "));

        //create variable
        let searchresult = "";

        //create string information
        for (let i = 0; i < 50; i++) {
            try {
                searchresult += await `<:bluebullet:887635391866372106> ...**${i+1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }

        //send search result embed
        const searchr = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SEARCH RESULTS!")
        .setDescription(searchresult)
        message.channel.send(searchr);

        //wait for userinput
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
            //send info message
            const searchtr = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> SEARCHING FOR THE SONG...!")
            .setThumbnail(result[userinput - 1].thumbnail)
            .setDescription(`Searching for **${result[userinput - 1].name}**`)
            message.channel.send(searchtr);        
            //play track
            client.distube.play(message, result[userinput - 1].url)
            }
        }).catch(() => {
            console.error;
            userinput = 404
        });

        //if smt went wrong return error
        if (userinput === 404) {
            const Anerror = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> AN ERROR OCCURED!")
            .setDescription(`Something went wrong! or time ran out`)
            return message.channel.send(Anerror);
        }
    }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});