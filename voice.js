const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

client.on("ready", async () => { 
    joinChannel("CHANNELID")
    function joinChannel(channelId) {
      client.channels.fetch(channelId).then(channel => {
        const VoiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        })
        const resource = createAudioResource("https://streams.ilovemusic.de/iloveradio109.mp3", {
            inlineVolume: true
        }); 
        resource.volume.setVolume(0.2); 
        const player = createAudioPlayer(); 
        VoiceConnection.subscribe(player); 
        player.play(resource); 
        player.on("idle", () => { 
            try { player.stop(); } catch (e) { } 
            try { VoiceConnection.destroy(); } catch (e) { } n
            joinChannel(channel.id); 
        });
      }).catch(console.error)
    }
});


// const { joinVoiceChannel } = require('@discordjs/voice');
// client.on("ready", async () => { 
//   joinChannel("İD")
  
//   function joinChannel(channelId) {
//     client.channels.fetch(channelId).then(channel => {
//       joinVoiceChannel({
//         channelId: channel.id,
//         guildId: channel.guild.id,
//         adapterCreator: channel.guild.voiceAdapterCreator
//       })
//     }).catch(console.error)
//   }
// });