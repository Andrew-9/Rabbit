const Discord = require("discord.js")
const config = require("../config.json")
const { MessageButton,  MessageActionRow } = require('discord-buttons');
module.exports.formatDate = formatDate;
module.exports.promptMessage = promptMessage;
module.exports.embedbuilder = embedbuilder;
module.exports.errorbuilder = errorbuilder;
module.exports.customplaylistembed = customplaylistembed;
module.exports.serverplaylistembed = serverplaylistembed;
module.exports.lyricsEmbed = lyricsEmbed;
module.exports.playsongyes = playsongyes;
module.exports.curembed = curembed;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.QueueEmbed = QueueEmbed;
module.exports.check_if_dj = check_if_dj;
function check_if_dj(message, member) {
    if(!message) return false;
    var client = message.client;

    if (!member) member = message.member;
    //get the adminroles
    var roleid = client.settings.get(message.guild.id, `djroles`)
    if (String(roleid) == "") return false;

    var isdj = false,
        string = "";

    //loop through the roles
    for (let i = 0; i < roleid.length; i++) {
        if (!message.guild.roles.cache.get(roleid[i])) continue;
        if (member.roles.cache.has(roleid[i])) isdj = true;
        string += "<@&" + roleid[i] + "> | "
    }
    //if no dj and not an admin, return the string
    if (!isdj && !member.hasPermission("ADMINISTRATOR"))
        return string;
    else
        return false;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US').format(date)
}
async function promptMessage(message, author, time, validReactions) {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
        .awaitReactions(filter, {
            max: 1,
            time: time
        })
        .then(collected => collected.first() && collected.first().emoji.name);
}

function embedbuilder(client, deletetime, message, color, title, description, thumbnail) {
    try {
        if (title.includes("filter") && title.includes("Adding")) {
            client.infos.set("global", Number(client.infos.get("global", "filters")) + 1, "filters");
        }
    } catch {}
    try {
        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic: true }))
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (thumbnail) embed.setThumbnail(thumbnail)
        if (!deletetime || deletetime === undefined || deletetime === "null") {
            message.channel.send(embed)
                .then(msg => {
                    try {
                        if (msg.channel.type === "news")
                            msg.crosspost()
                    } catch (error) {
                        console.log(error)
                        errorbuilder(error.stack.toString().substr(0, 2000))
                    }
                })
            return;
        }
        return message.channel.send(embed).then(msg => msg.delete({ timeout: deletetime }));
    } catch (error) {
        console.log(error)
        // const Anerror = new Discord.MessageEmbed()
        // .setColor("#e63064")
        // .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        // .setDescription(`\`\`\`${error.toString().substr(0, 100) }\`\`\``)
        // .setFooter("Error in code: Report this error to kotlin0427")
        // .setTimestamp();
        // return message.channel.send(Anerror);
    }
}

function errorbuilder(error) {
    console.log(error)
}

function QueueEmbed(client, queue) {
    try {
        let embeds = [];
        let k = 10;
        //defining each Pages
        for (let i = 0; i < queue.songs.length; i += 10) {
            let qus = queue.songs;
            const current = qus.slice(i, k)
            let j = i;
            k += 15;
            const info = current.map((track) => `<:bluepointer:897839647034601492> .. **${j++} - ** [\`${track.name}\`](${track.url})`).join("\n")
            const embed = new Discord.MessageEmbed()
            .setTitle(`<:musicblues:888396777202520124> SERVER QUEUE FOR THIS GUILD`)
            .setColor(config.colors.playmode)
            .setDescription(`<:bluepointer:897839647034601492> **Current Song** - \`${qus[0].name}\` \n\n${info} `)
            .setFooter(client.user.username + ` - by Kotlin#0427`, client.user.displayAvatarURL())
            embeds.push(embed);
        }
        //returning the Embed
        return embeds;
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
}

function serverplaylistembed(client, playlist) {
    if (!playlist) playlist = "There are no songs in the playlist!";
    try {
        let embeds = [];
        let k = 10;
        for (let i = 0; i < playlist.length; i += 10) {
        const current = playlist.slice(i, k)
        let j = i;
        k += 15;
        const playlistinfo = current.map((current) => `**${j++} - **${current}`).join("\n")
        const embed = new Discord.MessageEmbed()
        .setTitle(`<:musicblues:888396777202520124> YOUR PERSONAL PLAYLIST`)
        .setColor(config.colors.playmode)
        .setDescription(playlistinfo)
        embeds.push(embed);
        }
        return embeds;
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
}

function customplaylistembed(client, playlist) {
    if (!playlist) playlist = "There are no songs in the playlist!";
    try {
        let embeds = [];
        let k = 10;
        for (let i = 0; i < playlist.length; i += 10) {
        const current = playlist.slice(i, k)
        let j = i;
        k += 15;
        const playlistinfo = current.map((current) => `**${j++} - **${current}`).join("\n")
        const embed = new Discord.MessageEmbed()
        .setTitle(`<:musicblues:888396777202520124> YOUR PERSONAL PLAYLIST`)
        .setColor(config.colors.playmode)
        .setDescription(playlistinfo)
        embeds.push(embed);
        }
        return embeds;
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
}

function lyricsEmbed(client, message, lyrics, song) {
    try {
        let embeds = [];
        let k = 1000;
        for (let i = 0; i < lyrics.length; i += 1000) {
        const current = lyrics.slice(i, k);
        k += 1000;
        const embed = new Discord.MessageEmbed()
        .setTitle("Lyrics - " + song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setColor("#00ffff")
        .setDescription(current)
        embeds.push(embed);
        }
        return embeds;
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
}

async function playsongyes(client, message, queue, song) {
    try {
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "No Roles Yet"
        else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
        djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
        }
        let songtitle = song.name;
        let songName
        if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
        else songName = "";
        let embed1 = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        .setDescription(`
        <:bluepointer:897839647034601492> **PLAYING SONG**
        <:bluepointer:897839647034601492> **Song** - \`${songName}\`
        <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
        <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
        <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
        <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
        <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
        <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
        <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
        <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
        <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
        `)
        .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
        let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
        let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
        let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
        let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
        let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
        //////////////////////////////////////////////////////////////////////////////////////////////
        
        let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
        let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
        let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
        let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
         //////////////////////////////////////////////////////////////////////////////////////////////
        const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
        const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);

        var playingMessage = await message.channel.send({ embed: embed1, components: [buttonRow1, buttonRow2] });

        client.settings.set(message.guild.id, playingMessage.id, "playingembed")
        client.settings.set(message.guild.id, message.channel.id, "playingchannel")

        const collector = playingMessage.createButtonCollector((button) => button.clicker.user.id === message.author.id, {  time: song.duration > 0 ? song.duration * 1000 : 600000 });

        collector.on("collect", async (b, user) => {
            //return if no queue available
            if (!queue) return;
            b.reply.defer()
            if(b.id == "skip"){
            function Rskip(){
            client.distube.skip(message);
            playingMessage.delete({ embed: embed1, components: [buttonRow1, buttonRow2] });
            }
            Rskip();
            } else if(b.id == "stop"){
            function Rstop(){
            client.distube.stop(message);
            playingMessage.delete({ embed: embed1, components: [buttonRow1, buttonRow2], timeout: client.ws.ping });
            const stopped = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setTitle("<:musicblues:888396777202520124> MUSIC STOPPED")
            .setDescription(`DJ **${message.author.username}** stopped the music`)
            message.channel.send(stopped);
            }
            Rstop();
            } else if(b.id == "shuffle"){
            function Rshuffle(){
            client.distube.shuffle(message);
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Shuffled** - \`${queue.songs.length}\` songs. Time Left - \`${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] });  
            } 
            Rshuffle();
            } else if(b.id == "autoplay"){
            async function Rautoplay(){
            client.distube.toggleAutoplay(message)
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Autoplay** is now activated.
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] });  
            }
            Rautoplay();
            } else if(b.id == "forward"){
            async function Rforward(){
            let seektime2 = queue.currentTime + 10000;
            if (seektime2 >= queue.songs[0].duration * 1000) {
            seektime2 = queue.songs[0].duration * 1000 - 1;
            }
            await client.distube.seek(message, seektime2);
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Forwarded** - \`10 Seconds\` of the song
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] }); 
            }
            Rforward(); 
            } else if(b.id == "rewind10s"){
            async function Rrewind10s(){
            let seektime = queue.currentTime - 10000;
            if (seektime < 0) seektime = 0;
            await client.distube.seek(message, Number(seektime));
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Rewinded** - \`10 Seconds\` of the song
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] });  
            }
            Rrewind10s();
            } if(b.id == "volumeDown"){
            async function RvolumeDown(){
            await client.distube.setVolume(message, Number(queue.volume) - 10);
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Reduced** - the Volume to \`${queue.volume}\`
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] });  
            }
            RvolumeDown();
            } if(b.id == "volumeUp"){
            async function RvolumeUp(){
            await client.distube.setVolume(message, Number(queue.volume) + 10);
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Raised** - the Volume to \`${queue.volume}\`
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] });  
            }
            RvolumeUp();
            } if(b.id == "repeatSong"){
            function RrepeatSong(){
            let cursong = queue.songs[0];
            client.distube.seek(message, 0);
            let songtitle = song.name;
            let songName
            if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
            else songName = "";
            let embed1 = new Discord.MessageEmbed()
            .setColor(config.colors.playmode)
            .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setDescription(`
            <:bluepointer:897839647034601492> **PLAYING SONG**
            <:bluepointer:897839647034601492> **Song** - \`${songName}\`
            <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
            <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
            <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
            <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
            <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
            <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
            <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
            <:rabbitpoint:897844154258841620> **Replaying** - the current track
            <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
            <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
            `)
            .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
            let skip = new MessageButton().setStyle('blurple').setID('skip').setLabel("⏩ Skip")
            let stop = new MessageButton().setStyle('red').setID('stop').setLabel("⏹ Stop")
            let shuffle = new MessageButton().setStyle('blurple').setID('shuffle').setLabel("🔀 Shuffle")
            let repeatSong = new MessageButton().setStyle('green').setID('repeatSong').setLabel("🔂 Repeat Song")
            let autoplay = new MessageButton().setStyle('blurple').setID('autoplay').setLabel("🔄 Autoplay")
            //////////////////////////////////////////////////////////////////////////////////////////////
            
            let forward = new MessageButton().setStyle('blurple').setID('forward').setLabel("Forward +10s")
            let rewind10s = new MessageButton().setStyle('blurple').setID('rewind10s').setLabel("Rewind -10s")
            let volumeDown = new MessageButton().setStyle('red').setID('volumeDown').setLabel("🔉 Volume Down")
            let volumeUp = new MessageButton().setStyle('blurple').setID('volumeUp').setLabel("🔊 Volume Up")
             //////////////////////////////////////////////////////////////////////////////////////////////
            const buttonRow1 = new MessageActionRow().addComponents([skip, stop, autoplay, shuffle, repeatSong]);
            const buttonRow2 = new MessageActionRow().addComponents([forward, rewind10s, volumeDown, volumeUp]);
            playingMessage.edit({ embed: embed1, components: [buttonRow1, buttonRow2] }); 
            }
            RrepeatSong();
            }
        });
        collector.on("end", () => {
        // const ended = new Discord.MessageEmbed()
        // .setColor(config.colors.playmode)
        // .setTitle("<:musicblues:888396777202520124> MUSIC QUEUE ENDED")
        // .setDescription(`The music has enbed so I'v left the voice channel`)
        // message.channel.send(ended);
        playingMessage.delete({ embed: embed1, components: [buttonRow1, buttonRow2], timeout: client.ws.ping });
        })
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
}

function curembed(client, message) {
    try {
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "No Roles Yet"
        else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
        djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
        }
        let queue = client.distube.getQueue(message); //get the current queue
        let song = queue.songs[0];
        let songtitle = song.name;
        let songName
        if (songtitle.length > 20) songName = songtitle.substr(0, 32) + "...";
        else songName = "";
        let newembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setAuthor(message.author.tag.toUpperCase(), message.member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        .setDescription(`
        <:bluepointer:897839647034601492> **PLAYING SONG**
        <:bluepointer:897839647034601492> **Song** - \`${songName}\`
        <:bluepointer:897839647034601492> **Loop** - ${queue.repeatMode ? queue.repeatMode === 2 ? "<:musicblues:888396777202520124> Queue" : "<:musicblues:888396777202520124> Song" : "Nope"}
        <:bluepointer:897839647034601492> **Duration** - \`${queue.formattedCurrentTime} / ${song.formattedDuration}\`
        <:bluepointer:897839647034601492> **Queue** - \`${queue.songs.length} song(s) - ${queue.formattedDuration}\`
        <:bluepointer:897839647034601492> **Volume** - \`${queue.volume} %\`
        <:bluepointer:897839647034601492> **Autoplay** -  ${queue.autoplay ? "Yeap" : "Nope"}
        <:bluepointer:897839647034601492> **Filter** - \`${queue.filter || "No Filter"}\`
        <:bluepointer:897839647034601492> **DJ-Role** - ${djs}
        <:bluepointer:897839647034601492> **Requested by** -  ${song.user}
        <:bluepointer:897839647034601492> **Watch Music Video** - [\`Click here\`](${song.url})
        `)
        .setFooter(client.user.username + ` | Playing Music Blues In ${message.guild.name}`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
        return newembed;
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
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}