const PlayerMap = new Map();
const config = require(`../botconfig/config.json`);
const settings = require(`../botconfig/settings.json`);
const { MessageButton, MessageActionRow, MessageEmbed } = require(`discord.js`);
const { check_if_dj, delay, createBar } = require("./functions");
module.exports = (client) => {
  try {
    client.distube
      .on(`playSong`, async (queue, track) => {
        client.infos.set("global", Number(client.infos.get("global", "songs")) + 1, "songs");
        try {
          if(!client.guilds.cache.get(queue.id).me.voice.deaf)
            client.guilds.cache.get(queue.id).me.voice.setDeaf(true).catch((e) => {})
        } catch (error) {
          console.log(error)
        }
        try {
          var newQueue = client.distube.getQueue(queue.id)
          var data = receiveQueueData(newQueue, track)
          let currentSongPlayMsg = await queue.textChannel.send(data).then(msg => {
            PlayerMap.set(`currentmsg`, msg.id);
            return msg;
          })
          //create a collector for the thing
          var collector = currentSongPlayMsg.createMessageComponentCollector({
            filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id,
            time: track.duration > 0 ? track.duration * 1000 : 600000
          }); //collector for 5 seconds
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          let lastEdited = false;
          /**
           * @INFORMATION - EDIT THE SONG MESSAGE EVERY 10 SECONDS!
           */
          try{clearInterval(songEditInterval)}catch(e){}
          songEditInterval = setInterval(async () => {
            if (!lastEdited) {
              try{
                var newQueue = client.distube.getQueue(queue.id)
                var data = receiveQueueData(newQueue, newQueue.songs[0])
                await currentSongPlayMsg.edit(data).catch((e) => {})
              }catch (e){
                clearInterval(songEditInterval)
              }
            }
          }, 10000)

          collector.on('collect', async i => {
            let emoji = client.settings.get(i.guild.id, `audioemoji`);
            if(i.customId != `10` && check_if_dj(client, i.member, client.distube.getQueue(i.guild.id).songs[0])) {
              return i.reply({embeds: [new MessageEmbed()
                .setColor(client.settings.get(i.guild.id, `audiomack`))
                .setTitle(`NOT THE SONG AUTHOR!`)
                .setDescription(`
                Hmm... You don't seem to be a DJ or the song author
                You need this **dj roles:** ${check_if_dj(client, i.member, client.distube.getQueue(i.guild.id).songs[0])}
                `)
              ],
              ephemeral: true})
            }
            lastEdited = true;
            setTimeout(() => {
              lastEdited = false
            }, 7000)
            //skip
            if (i.customId == `1`) {
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              const queue = client.distube.getQueue(i.guild.id);
              if (!queue || !newQueue.songs || newQueue.songs.length == 0) {
              return i.reply({ content: `${emoji} **There's currently nothing playing**`, ephemeral: true })
              }
              if (channel.id !== newQueue.voiceChannel.id)
             // if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id)
              return i.reply({ content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`, ephemeral: true })
              if (newQueue.songs.length == 0) {
              i.reply({ content: `${emoji} **Stopped playing and left the channel**`, ephemeral: true })
              clearInterval(songEditInterval);
              await client.distube.stop(i.guild.id)
              return
              }
              //skip the track
              await client.distube.skip(i.guild.id)
              i.reply({
              content: `${emoji} **Skipped to the next song!**`,
              ephemeral: true
              })
            }
            //stop
            if (i.customId == `2`) {
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({ content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`, ephemeral: true })
              //stop the track
              i.reply({
              embeds: [new MessageEmbed()
              .setColor(client.settings.get(member.guild.id, `audiomack`))
              .setTitle("MUSIC HAS STOPPED")
              .setDescription(`Stopped playing and left the channel`)
              ]
              })
              clearInterval(songEditInterval);
              //edit the current song message
              await client.distube.stop(i.guild.id)
            }
            //pause/resume
            if (i.customId == `3`) {
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
              content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
              ephemeral: true
              })
              if (newQueue.playing) {
                await client.distube.pause(i.guild.id);
                var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {

                })
                i.reply({
                  embeds: [new MessageEmbed()
                  .setColor(client.settings.get(member.guild.id, `audiomack`))
                  .setTitle(`MUSIC PAUSED`)
                  .setDescription(`The music has been paused by DJ **${member.user.username}**`)
                ]
                })
              } else {
                //pause the player
                await client.distube.resume(i.guild.id);
                var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {
                  return;
                })
                i.reply({
                  embeds: [new MessageEmbed()
                  .setColor(client.settings.get(member.guild.id, `audiomack`))
                  .setTitle(`MUSIC RESUMED`)
                  .setDescription(`The music was resumed by DJ **${member.user.username}**`)
                  ]
                })
              }
            }
            //autoplay
            if (i.customId == `4`) {
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
              content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
              ephemeral: true
              })
              //pause the player
              await newQueue.toggleAutoplay()
              if (newQueue.autoplay) {
                var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {
                  return;
                })
              } else {
                var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {
                 return;
                })
              }
              //Send Success Message
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(client.settings.get(member.guild.id, `audiomack`))
                  .setDescription(`Autoplay is now **${newQueue.autoplay ? `Activated` :`Deactivated`}**`)
                  .setTitle(`AUTOPLAY!`)
                ],
                ephemeral: true
                })
            }
            //Shuffle
            if(i.customId == `5`){
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              let color = client.settings.get(member.guild.id, `audiomack`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              //if not in the same channel as the player, return Error
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
              content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
              ephemeral: true
              })
              await newQueue.shuffle()
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(color)
                  .setTitle(`SONG SHUFFLED!`)
                  .setDescription(`Successfully shuffled **\`${newQueue.songs.length}\`** songs!`)
                ],
                ephemeral: true
              })
            }
            //Songloop
            if(i.customId == `6`){
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              //if not in the same channel as the player, return Error
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
                content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
                ephemeral: true
              })
              //Disable the Repeatmode
              if(newQueue.repeatMode == 1){
                await newQueue.setRepeatMode(0)
              } 
              //Enable it
              else {
                await newQueue.setRepeatMode(1)
              }
              i.reply({
                embeds: [new MessageEmbed()
                .setColor(client.settings.get(i.guild.id, `audiomack`))
                .setTitle(`SONG LOOP MODE!`)
                .setDescription(`${newQueue.repeatMode == 1 ? `Enabled song Loop Mode!` : `Disabled song Loop Mode!`}`)
                ],
              })
              var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {
               return;
              })
            }
            //Queueloop
            if(i.customId == `7`){
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true });
              //if not in the same channel as the player, return Error
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
                content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
                ephemeral: true
              })
              //Disable the Repeatmode
              if(newQueue.repeatMode == 2){
                await newQueue.setRepeatMode(0)
              } 
              //Enable it
              else {
                await newQueue.setRepeatMode(2)
              }
              i.reply({
                embeds: [new MessageEmbed()
                .setColor(client.settings.get(i.guild.id, `audiomack`))
                .setTitle(`QUEUE LOOP MODE!`)
                .setDescription(`${newQueue.repeatMode == 2 ? `Enabled queue loop Mode!` : `Disabled queue loop Mode!`}`)
                ],
                })
              var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              })
            }
            //Forward
            if(i.customId == `8`){
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              //if not in the same channel as the player, return Error
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
                content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
                ephemeral: true
              })
              let seektime = newQueue.currentTime + 10;
              if (seektime >= newQueue.songs[0].duration) seektime = newQueue.songs[0].duration - 1;
              await newQueue.seek(Number(seektime))
              collector.resetTimer({time: (newQueue.songs[0].duration - newQueue.currentTime) * 1000})
              i.reply({
                embeds: [new MessageEmbed()
                .setColor(client.settings.get(i.guild.id, `audiomack`))
                .setTitle(`SONG FORWARD!`)
                .setDescription(`Forwarded the song by \`10 seconds\``)
                ],
              })
              var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {
                return;
              })
            }
            //Rewind
            if(i.customId == `9`){
              let { member } = i;
              const { channel } = member.voice
              let emoji = client.settings.get(member.guild.id, `audioemoji`);
              if (!channel)
              return i.reply({ content: `${emoji} **You have to be in a voice channel first**`, ephemeral: true })
              //if not in the same channel as the player, return Error
              if (channel.id !== newQueue.voiceChannel.id)
              return i.reply({
                content: `${emoji} **You must be in the same voice channel as me <#${channel.id}>**`,
                ephemeral: true
              })
              let seektime = newQueue.currentTime - 10;
              if (seektime < 0) seektime = 0;
              if (seektime >= newQueue.songs[0].duration - newQueue.currentTime) seektime = 0;
              await newQueue.seek(Number(seektime))
              collector.resetTimer({time: (newQueue.songs[0].duration - newQueue.currentTime) * 1000})
              i.reply({
                embeds: [new MessageEmbed()
                .setColor(client.settings.get(i.guild.id, `audiomack`))
                .setTitle(`SONG FORWARD!`)
                .setDescription(`Rewinded the song by \`10 seconds\``)
                ],
              })
              var data = receiveQueueData(client.distube.getQueue(queue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {
              return;
              })
            }
          });
        } catch (error) {
          console.error(error)
        }
      })
      .on(`addSong`, (queue, song) => {
        queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(client.settings.get(queue.id, `audiomack`))
          .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
          .setTitle(`SONG ADDED TO THE QUEUE`)
          .setDescription(`
          ${client.settings.get(queue.id, `pointer`)} **Song** - [\`${song.name}\`](${song.url})
          ${client.settings.get(queue.id, `pointer`)} **Duration** - \`${song.formattedDuration}\`
          ${client.settings.get(queue.id, `pointer`)} **Requested by** - ${song.user}
          ${client.settings.get(queue.id, `pointer`)} **Estimated Time** - \`${queue.songs.length - 1} song${queue.songs.length > 0 ? "s" : ""}\` - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`
          ${client.settings.get(queue.id, `pointer`)} **Queue duration** - \`${queue.formattedDuration}\`
          `)
          .setFooter(`Song For ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        ]
      })
      })
      .on(`addList`, (queue, playlist) => {
        queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(client.settings.get(queue.id, `audiomack`))
          .setThumbnail(playlist.thumbnail.url ? playlist.thumbnail.url : `https://img.youtube.com/vi/${playlist.songs[0].id}/mqdefault.jpg`)
          .setTitle(`PLAYLIST ADDED TO THE QUEUE`)
          .setDescription(`
          ${client.settings.get(queue.id, `pointer`)} **Playlist** - [\`${playlist.name}\`](${playlist.url ? playlist.url : ""}) - \`${playlist.songs.length} Song${playlist.songs.length > 0 ? "s" : ""}\`
          ${client.settings.get(queue.id, `pointer`)} **Duration** - \`${queue.formattedDuration}\`
          ${client.settings.get(queue.id, `pointer`)} **Requested by** - ${queue.songs[0].user ? queue.songs[0].user : "error"}
          ${client.settings.get(queue.id, `pointer`)} **Estimated Time** - \`${queue.songs.length - - playlist.songs.length} song${queue.songs.length > 0 ? "s" : ""}\` - \`${(Math.floor((queue.duration - playlist.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`
          ${client.settings.get(queue.id, `pointer`)} **Queue duration** - \`${queue.formattedDuration}\`
          `)
          .setFooter(`Playlist For ${playlist.user.tag}`, playlist.user.displayAvatarURL({dynamic: true}))
        ]
      })
    })
      // DisTubeOptions.searchSongs = true
      .on(`searchResult`, (message, result) => {
        let i = 0
        message.channel.send(`${client.settings.get(message.guild.id, `audioemoji`)} **Choose an option from below**\n${result.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join(`\n`)}\nEnter anything else or wait 60 seconds to cancel`)
      })
      // DisTubeOptions.searchSongs = true
      .on(`searchCancel`, message => message.channel.send(`${client.settings.get(message.guild.id, `audioemoji`)} Searching canceled`).catch((e)=>console.log(e)))
      .on(`error`, (channel, e) => {
        channel.send(`🎵 **An error encountered:** \`${e}\``).catch((e)=>console.log(e))
        console.error(e)
      })
      .on(`empty`, channel => channel.send(`**Voice channel is empty! Leaving the channel...**`).catch((e)=>console.log(e)))
      .on(`searchNoResult`, message => message.channel.send(`${client.settings.get(message.guild.id, `audioemoji`)} **No result found!**`).catch((e)=>console.log(e)))
      .on(`finishSong`, (queue, song) => {
        let songtitle = song.name;
        let songName
        if (songtitle.length > 20) songName = songtitle.substr(0, 30) + "...";
        var embed = new MessageEmbed()
        .setColor(client.settings.get(queue.id, `audiomack`))
        .setTitle(`${client.settings.get(queue.id, `audioemoji`)} ${songName}`)
        .setDescription(`
        **Finished Playing** - [${songName}](${song.url})
        Song Requested By  **${song.user.tag}**
        Liking ${client.user.username}? give us a vote at [top.gg](${client.global.get("global", "vote")})
        `)
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        queue.textChannel.messages.fetch(PlayerMap.get(`currentmsg`)).then(currentSongPlayMsg=>{
        currentSongPlayMsg.edit({ embeds: [embed], components: [] }).catch((e) => {
        console.log(e);
        })
        }).catch((e) => {
        console.log(e);
        })
      })
      .on(`finish`, queue => {
        queue.textChannel.send({
          embeds: [
            new MessageEmbed()
            .setColor(client.settings.get(queue.id, `audiomack`))
            .setTitle(`LEFT THE CHANNEL`)
            .setDescription("There are no more songs left to play")
          ]
        })
      })
      .on(`initQueue`, queue => {
        try {
          if(PlayerMap.has(`deleted-${queue.id}`)) {
          PlayerMap.delete(`deleted-${queue.id}`)
          }
          let data = client.settings.get(queue.id)
          queue.autoplay = Boolean(data.defaultautoplay);
          queue.volume = Number(data.defaultvolume);
          queue.setFilter(data.defaultfilters);
        } catch (error) {
          console.error(error)
        }
      });
  } catch (e) {
    console.log(String(e.stack))
  }

  // for normal tracks
  function receiveQueueData(newQueue, newTrack) {
    var djs = client.settings.get(newQueue.id, `djroles`);
    let color = client.settings.get(newQueue.id, `audiomack`);
    let emoji = client.settings.get(newQueue.id, `audioemoji`);
    let pointer = client.settings.get(newQueue.id, `pointer`);
    if(!djs || !Array.isArray(djs)) djs = [];
    else djs = djs.map(r => `<@&${r}>`);
    if(djs.length == 0 ) djs = "`not setup`";
    else djs.slice(0, 15).join(", ");
    if(!newTrack) return message.channel.send({ content: `${emoji} **No song found...**` })
    let songtitle = newTrack.name;
    let songName
    if (songtitle.length > 20) songName = songtitle.substr(0, 35) + "...";
    var embed = new MessageEmbed()
    .setAuthor(newTrack.user.tag.toUpperCase(), newTrack.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
    .setColor(color)
    .setDescription(`
    ${pointer} **PLAYING SONG**
    ${pointer} **Song** - \`${songName}\`
    ${pointer} **Loop** - ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `\`✔ Queue\`` : `\`✔ Song\`` : `\`✖ Off\``}
    ${pointer} **Duration** - \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\`
    ${pointer} **Queue** - \`${newQueue.songs.length} song(s)\` : \`${newQueue.formattedDuration}\`
    ${pointer} **Volume** - \`${newQueue.volume}%\`
    ${pointer} **Autoplay** -  ${newQueue.autoplay ? `\`✔ On\`` : `\`✖ Off\``}
    ${pointer} **Filter${newQueue.filters.length > 0 ? "s": ""}** - ${newQueue.filters && newQueue.filters.length > 0 ? `${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `\`✖ Off\``}
    ${pointer} **DJ-Role${client.settings.get(newQueue.id, "djroles").length > 1 ? "s": ""}** - ${djs}
    ${pointer} **Requested by** -  ${newTrack.user}
    ${pointer} **Download Song** - [\`Click here\`](${newTrack.streamURL})
    ${pointer} **Watch Music Video** - [\`Watch here\`](${newTrack.url})
    `)
    let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji("925725054757650452").setLabel(`Skip`)
    let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("928043900210384997").setLabel(`Stop`)
    let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji("928042760974528553").setLabel(`Pause`)
    let autoplay = new MessageButton().setStyle('SUCCESS').setCustomId('4').setEmoji("928040356526825552").setLabel(`Autoplay`)
    let shuffle = new MessageButton().setStyle('PRIMARY').setCustomId('5').setEmoji("928044516873736244").setLabel(`Shuffle`)
    if (!newQueue.playing) {
      pause = pause.setStyle('SUCCESS').setEmoji("928040977833267274").setLabel(`Resume`)
    }
    if (newQueue.autoplay) {
      autoplay = autoplay.setStyle('SECONDARY')
    }
    let songloop = new MessageButton().setStyle('PRIMARY').setCustomId('6').setEmoji("928040233004593222").setLabel(`Repeat Song`)
    let queueloop = new MessageButton().setStyle('PRIMARY').setCustomId('7').setEmoji("928042036123271178").setLabel(`Repeat Queue`)
    let forward = new MessageButton().setStyle('PRIMARY').setCustomId('8').setEmoji("928960622706720798").setLabel(`Forward +10s`)
    let rewind = new MessageButton().setStyle('PRIMARY').setCustomId('9').setEmoji("928961006191927338").setLabel(`Rewind -10s`)
    if (newQueue.repeatMode === 0) {
      songloop = songloop.setStyle('PRIMARY')
      queueloop = queueloop.setStyle('PRIMARY')
    }
    if (newQueue.repeatMode === 1) {
      songloop = songloop.setStyle('SECONDARY')
      queueloop = queueloop.setStyle('SUCCESS')
    }
    if (newQueue.repeatMode === 2) {
      songloop = songloop.setStyle('SUCCESS')
      queueloop = queueloop.setStyle('SECONDARY')
    }
    if (Math.floor(newQueue.currentTime) < 10) {
      rewind = rewind.setDisabled()
    } else {
      rewind = rewind.setDisabled(false)
    }
    if (Math.floor((newTrack.duration - newQueue.currentTime)) <= 10) {
      forward = forward.setDisabled()
    } else {
      forward = forward.setDisabled(false)
    }
    const row = new MessageActionRow().addComponents([skip, stop, pause, autoplay, shuffle]);
    const row2 = new MessageActionRow().addComponents([songloop, queueloop, forward, rewind]);
    return {
      content: `**${emoji} Setup audiomack's streaming mode** \`/system setupmusic\``,
      embeds: [embed],
      components: [row, row2]
    };
  }
};