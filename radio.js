
const Discord = require("discord.js");
const config = require("./config.json")
const { Radiostations } = require("./radiostations.json")
const { MessageButton } = require('discord-buttons');
const radios = require("./radiostations.json")
const StateManager = require("./utilities/state_manager");
const guildPrefix = new Map();
  module.exports = async function (client, message, args) {
      //get the prefix
    const prefix = guildPrefix.get(message.guild.id);

      //LINKS
    if (!args[0])
    return stations(client, prefix, message);

    let { channel } = message.member.voice;
    if (!channel) {
    const notInChannel = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
    .setDescription(`You have to be in a voice channel to use this command!`)
    return message.channel.send(notInChannel);
    }

    if (isNaN(args[0])) {
    const notInChannel = new Discord.MessageEmbed()
    new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setAuthor(`<:musicblues:888396777202520124> NOT A VALID RADIO`, "https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
    .setDescription(`That's not a valid radio station\nPlease use a Number between \`1\` and \`${Radiostations.length}\``)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    return message.channel.send(notInChannel);  
    }
      if (Number(args[1]) > 150) return message.lineReply("<:musicblues:888396777202520124> **Maximum Volume is `150`!**")
      if (Number(args[1]) < 1) return message.lineReply("<:musicblues:888396777202520124> **Minimum Volume is `1`!**")
      let volume;
      if (isNaN(args[1])) {
          volume = 50;
      } else {
          volume = args[1]
      }
      let args2;

      if (Number([args[0]]) > 0 && Number(args[0]) <= 10)
          args2 = radios.EU.United_Kingdom[Number(args[0]) - 1].split(` `);
      else if (Number([args[0]]) > 10 && Number(args[0]) <= 20)
          args2 = radios.EU.Austria[Number(args[0]) - 10 - 1].split(` `);
      else if (Number([args[0]]) > 20 && Number(args[0]) <= 30)
          args2 = radios.EU.Belgium[Number(args[0]) - 20 - 1].split(` `);
      else if (Number([args[0]]) > 30 && Number(args[0]) <= 40)
          args2 = radios.EU.Bosnia[Number(args[0]) - 30 - 1].split(` `);
      else if (Number([args[0]]) > 40 && Number(args[0]) <= 50)
          args2 = radios.EU.Czech[Number(args[0]) - 40 - 1].split(` `);
      else if (Number([args[0]]) > 50 && Number(args[0]) <= 60)
          args2 = radios.EU.Denmark[Number(args[0]) - 50 - 1].split(` `);
      else if (Number([args[0]]) > 60 && Number(args[0]) <= 70)
          args2 = radios.EU.Germany[Number(args[0]) - 60 - 1].split(` `);
      else if (Number([args[0]]) > 70 && Number(args[0]) <= 80)
          args2 = radios.EU.Hungary[Number(args[0]) - 70 - 1].split(` `);
      else if (Number([args[0]]) > 80 && Number(args[0]) <= 90)
          args2 = radios.EU.Ireland[Number(args[0]) - 80 - 1].split(` `);
      else if (Number([args[0]]) > 90 && Number(args[0]) <= 100)
          args2 = radios.EU.Italy[Number(args[0]) - 90 - 1].split(` `);
      else if (Number([args[0]]) > 100 && Number(args[0]) <= 110)
          args2 = radios.EU.Luxembourg[Number(args[0]) - 100 - 1].split(` `);
      else if (Number([args[0]]) > 110 && Number(args[0]) <= 120)
          args2 = radios.EU.Romania[Number(args[0]) - 110 - 1].split(` `);
      else if (Number([args[0]]) > 120 && Number(args[0]) <= 130)
          args2 = radios.EU.Serbia[Number(args[0]) - 120 - 1].split(` `);
      else if (Number([args[0]]) > 130 && Number(args[0]) <= 140)
          args2 = radios.EU.Spain[Number(args[0]) - 130 - 1].split(` `);
      else if (Number([args[0]]) > 140 && Number(args[0]) <= 150)
          args2 = radios.EU.Sweden[Number(args[0]) - 140 - 1].split(` `);
      else if (Number([args[0]]) > 150 && Number(args[0]) <= 160)
          args2 = radios.EU.TURKEY[Number(args[0]) - 150 - 1].split(` `);
      else if (Number([args[0]]) > 160 && Number(args[0]) <= 170)
          args2 = radios.EU.Ukraine[Number(args[0]) - 150 - 1].split(` `);
      else if (Number([args[0]]) > 170 && Number(args[0]) <= (170 + 46))
          args2 = radios.OTHERS.request[Number(args[0]) - 160 - 1].split(` `);
      else if (Number([args[0]]) > 180 && Number(args[0]) <= (180 + 50))
      args2 = radios.AFRICA.Nigeria[Number(args[0]) - 180 - 1].split(` `);
      else {
        const noradio = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> RADIO NOT FOUND!")
        .setDescription(`This radio station was not found`)
        return message.channel.send(noradio);   
      }


      const song = {
        title: args2[0].replace("-", " "),
        url: args2[1],
        thumbnail: client.user.displayAvatarURL(),
      };

      message.lineReply(
        new Discord.MessageEmbed()
        .setTitle("<:musicblues:888396777202520124> RADIO LOADED SUCCESS")
        .setColor(config.colors.playmode)
        .setURL(song.url)
        .setDescription(`
        **Now Playing** - \`${song.title}\`
        This radio will be playing none stop
        It's recommended to use **Headphone**
        for better quility time and quite **(>‿◠)**
        `)
        .setThumbnail(song.thumbnail)
        .setFooter(`Playing radio in ${message.guild.name} `, client.user.displayAvatarURL())
      )

      //If not in the same channel return info
      if (message.guild.me.connection && channel !== message.guild.me.voice.channel) {
        const notInSameChannel = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
        .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        return message.lineReply(notInSameChannel);
      }

      if (!volume) volume = 50

      //try to join the Channel
      let connection = await channel.join().catch(console.error);
      try {
          await connection.voice.setSelfDeaf(true);
      } catch {}
      try {
          await connection.voice.setDeaf(true);
      } catch {}

      try {
          const dispatcher = await connection.play(song.url);
          await dispatcher.setVolumeLogarithmic(volume / 100)
          dispatcher.on("end", end => {
              channel.leave();
          });
          dispatcher.on("error", end => {
              channel.leave();
          });
      } catch (error) {
          console.error(error);
          await channel.leave();
      }

  }

 async function stations(client, prefix, message) {
      let amount = 0;

      let United_Kingdom = "";
      for (let i = 0; i < radios.EU.Germany.length; i++) {
          United_Kingdom += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.United_Kingdom[i].split(" ")[0].replace("-"," ")}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`
      }
      amount++;

      let austria = "";
      for (let i = 0; i < radios.EU.Austria.length; i++) {
          austria += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Austria[i].split(" ")[0].replace("-"," ")}](${radios.EU.Austria[i].split(" ")[1]})\n`
      }

      amount++;
      let Belgium = "";
      for (let i = 0; i < radios.EU.Belgium.length; i++) {
          Belgium += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Belgium[i].split(" ")[0].replace("-"," ")}](${radios.EU.Belgium[i].split(" ")[1]})\n`
      }

      amount++;
      let Bosnia = "";
      for (let i = 0; i < radios.EU.Bosnia.length; i++) {
          Bosnia += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Bosnia[i].split(" ")[0].replace("-"," ")}](${radios.EU.Bosnia[i].split(" ")[1]})\n`
      }

      amount++;
      let Czech = "";
      for (let i = 0; i < radios.EU.Czech.length; i++) {
          Czech += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Czech[i].split(" ")[0].replace("-"," ")}](${radios.EU.Czech[i].split(" ")[1]})\n`
      }

      amount++;
      let Denmark = "";
      for (let i = 0; i < radios.EU.Denmark.length; i++) {
          Denmark += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Denmark[i].split(" ")[0].replace("-"," ")}](${radios.EU.Denmark[i].split(" ")[1]})\n`
      }

      amount++;
      let germany = "";
      for (let i = 0; i < radios.EU.Germany.length; i++) {
          germany += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Germany[i].split(" ")[0].replace("-"," ")}](${radios.EU.Germany[i].split(" ")[1]})\n`
      }

      amount++;
      let Hungary = "";
      for (let i = 0; i < radios.EU.Hungary.length; i++) {
          Hungary += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Hungary[i].split(" ")[0].replace("-"," ")}](${radios.EU.Hungary[i].split(" ")[1]})\n`
      }

      amount++;
      let Ireland = "";
      for (let i = 0; i < radios.EU.Ireland.length; i++) {
          Ireland += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Ireland[i].split(" ")[0].replace("-"," ")}](${radios.EU.Ireland[i].split(" ")[1]})\n`
      }

      amount++;
      let Italy = "";
      for (let i = 0; i < radios.EU.Italy.length; i++) {
          Italy += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Italy[i].split(" ")[0].replace("-"," ")}](${radios.EU.Italy[i].split(" ")[1]})\n`
      }

      amount++;
      let Luxembourg = "";
      for (let i = 0; i < radios.EU.Luxembourg.length; i++) {
          Luxembourg += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Luxembourg[i].split(" ")[0].replace("-"," ")}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`
      }

      amount++;
      let Romania = "";
      for (let i = 0; i < radios.EU.Romania.length; i++) {
          Romania += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Romania[i].split(" ")[0].replace("-"," ")}](${radios.EU.Romania[i].split(" ")[1]})\n`
      }

      amount++;
      let Serbia = "";
      for (let i = 0; i < radios.EU.Serbia.length; i++) {
          Serbia += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Serbia[i].split(" ")[0].replace("-"," ")}](${radios.EU.Serbia[i].split(" ")[1]})\n`
      }

      amount++;
      let Spain = "";
      for (let i = 0; i < radios.EU.Spain.length; i++) {
          Spain += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Spain[i].split(" ")[0].replace("-"," ")}](${radios.EU.Spain[i].split(" ")[1]})\n`
      }

      amount++;
      let Sweden = "";
      for (let i = 0; i < radios.EU.Sweden.length; i++) {
          Sweden += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Sweden[i].split(" ")[0].replace("-"," ")}](${radios.EU.Sweden[i].split(" ")[1]})\n`
      }

      amount++;
      let TURKEY = "";
      for (let i = 0; i < radios.EU.TURKEY.length; i++) {
          TURKEY += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.TURKEY[i].split(" ")[0].replace("-"," ")}](${radios.EU.TURKEY[i].split(" ")[1]})\n`
      }

      amount++;
      let Ukraine = "";
      for (let i = 0; i < radios.EU.Ukraine.length; i++) {
          Ukraine += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.EU.Ukraine[i].split(" ")[0].replace("-"," ")}](${radios.EU.Ukraine[i].split(" ")[1]})\n`
      }

      amount++;
      let Nigeria = "";
      for (let i = 0; i < radios.AFRICA.Nigeria.length; i++) {
        Nigeria += `<:bluebullet:887635391866372106> ...**${i+1+10*amount}** [${radios.AFRICA.Nigeria[i].split(" ")[0].replace("-"," ")}](${radios.AFRICA.Nigeria[i].split(" ")[1]})\n`
      }

        const infoembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> 130 RADIO STATION")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/888393417334345728/blues.png?width=596&height=613")
        .setTimestamp()
        .setDescription(`
        <:bluebullet:887635391866372106> You will see these radio stations for each country
        <:bluebullet:887635391866372106> ... **1** \`United Kingdom\`
        <:bluebullet:887635391866372106> ... **2** \`Austria\`
        <:bluebullet:887635391866372106> ... **3** \`Belgium\`
        <:bluebullet:887635391866372106> ... **4** \`Bosnia & Herzegovina\`
        <:bluebullet:887635391866372106> ... **5** \`Czech\`
        <:bluebullet:887635391866372106> ... **6** \`Denmark\`
        <:bluebullet:887635391866372106> ... **7** \`Germany\`
        <:bluebullet:887635391866372106> ... **8** \`Hungary\`
        <:bluebullet:887635391866372106> ... **9** \`Ireland\`
        <:bluebullet:887635391866372106> ... **10** \`Italy\`
        <:bluebullet:887635391866372106> ... **11** \`Luxembourg\`
        <:bluebullet:887635391866372106> ... **12** \`Romania\`
        <:bluebullet:887635391866372106> ... **13** \`Serbia\`
        <:bluebullet:887635391866372106> ... **14** \`Spain\`
        <:bluebullet:887635391866372106> ... **15** \`Sweden\`
        <:bluebullet:887635391866372106> ... **16** \`Turkey\`
        <:bluebullet:887635391866372106> ... **17** \`Ukraine\`
        <:bluebullet:887635391866372106> ... **18** \`Nigeria\`
        If you want to play a radio station. then use\n\`${prefix}radio <station number> <volume>\`
        For example: \`${prefix}radio 2 80\` \nThis will play a radio station: with the volume \`80\`
        `)

        const United_Kingdomembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> UNITED KINGDON - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-united-kingdom_1f1ec-1f1e7.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(United_Kingdom)
        const austriaembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> AUSTRIA - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-austria_1f1e6-1f1f9.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(austria)
        const Belgiumembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> BELGIUM - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-belgium_1f1e7-1f1ea.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Belgium)
        const Bosniaembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> BOSNIA & HERZEGOVINA - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-bosnia-herzegovina_1f1e7-1f1e6.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Bosnia)
        const Czechembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> CZECH - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-czechia_1f1e8-1f1ff.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Czech)
        const Denmarkembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> DENMARK - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-denmark_1f1e9-1f1f0.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Denmark)
        const germanyembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> GERMANY - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-germany_1f1e9-1f1ea.png")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setDescription(germany)
        const Hungaryembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> HUNGARY - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-hungary_1f1ed-1f1fa.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Hungary)
        const Irelandembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> IRELAND - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-ireland_1f1ee-1f1ea.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Ireland)
        const Italyembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ITALY - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-italy_1f1ee-1f1f9.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Italy)
        const Luxembourgembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> LUXEMBOURG - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-luxembourg_1f1f1-1f1fa.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Luxembourg)
        const Romaniaembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> ROMANIA - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-romania_1f1f7-1f1f4.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Romania)
        const Serbiaembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SERBIA - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-serbia_1f1f7-1f1f8.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Serbia)
        const Spainembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SPAIN - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-spain_1f1ea-1f1f8.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Spain)
        const Swedenembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SWEDEN - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-sweden_1f1f8-1f1ea.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Sweden)
        const TURKEYembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> TURKEY - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-turkey_1f1f9-1f1f7.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(TURKEY)
        const Ukraineembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> UKRAINE - RADIO STATION")
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/flag-ukraine_1f1fa-1f1e6.png")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Ukraine)
        const Nigeriaembed = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> NIGERIA - RADIO STATION")
        .setThumbnail("https://thumbs.dreamstime.com/b/nigeria-logo-map-country-name-flag-artistic-vector-illustration-171028979.jpg")
        .setFooter(`${client.user.username} with love by kotlin#0427 `, client.user.displayAvatarURL())
        .setDescription(Nigeria)

    var radioarray = [
          United_Kingdomembed,
          austriaembed,
          Belgiumembed,
          Bosniaembed,
          Czechembed,
          Denmarkembed,
          germanyembed,
          Hungaryembed,
          Irelandembed,
          Italyembed,
          Luxembourgembed,
          Romaniaembed,
          Serbiaembed,
          Spainembed,
          Swedenembed,
          TURKEYembed,
          Ukraineembed,
          Nigeriaembed
      ];

      let Rkingdom = new MessageButton().setStyle("blurple").setID("Kingdom").setLabel("Kingdom")
      let Raustria = new MessageButton().setStyle("blurple").setID("Austria").setLabel("Austria")
      let RBelgium = new MessageButton().setStyle("blurple").setID("Belgium").setLabel("Belgium")
      let RBosnia = new MessageButton().setStyle("blurple").setID("Bosnia").setLabel("Bosnia")
      let RCzech = new MessageButton().setStyle("blurple").setID("Czech").setLabel("Czech")

      let RDenmark = new MessageButton().setStyle("blurple").setID("Denmark").setLabel("Denmark");
      let Rgermany = new MessageButton().setStyle("blurple").setID("Germany").setLabel("Germany");
      let RHungary = new MessageButton().setStyle("blurple").setID("Hungary").setLabel("Hungary");
      let RIreland = new MessageButton().setStyle("blurple").setID("Ireland").setLabel("Ireland");
      let RItaly = new MessageButton().setStyle("blurple").setID("Italy").setLabel("Italy");
      let RLuxembourg = new MessageButton().setStyle("blurple").setID("Luxembourg").setLabel("Luxembourg");
      let RRomania = new MessageButton().setStyle("blurple").setID("Romania").setLabel("Romania");
      let RSerbia = new MessageButton().setStyle("blurple").setID("Serbia").setLabel("Serbia");
      let RSpain = new MessageButton().setStyle("blurple").setID("Spain").setLabel("Spain");
      let RSweden = new MessageButton().setStyle("blurple").setID("Sweden").setLabel("Sweden");
      let RTurkey = new MessageButton().setStyle("blurple").setID("Turkey").setLabel("Turkey");
      let RUkraine = new MessageButton().setStyle("blurple").setID("Ukraine").setLabel("Ukraine");
      let RNigeria = new MessageButton().setStyle("blurple").setID("Nigeria").setLabel("Nigeria");
      let Home = new MessageButton().setStyle("red").setID("Home").setLabel("🏡 Home");

      let Rvote = new MessageButton().setStyle("url").setLabel("SERVER").setURL("https://discord.com/invite/ghdvMDVFse")
      let Rserver = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discord.boats/bot/734522699228905585")

      let radiobutton = await message.channel.send({ embed: infoembed, radioarray, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] }, { type: 5, components: [RNigeria] } ] })

      const collector = radiobutton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 900000});
      collector.on("collect", (b) => {
          b.reply.defer()
          if(b.id == "Home"){
            radiobutton.edit({ embed: infoembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
          } else if(b.id == "Kingdom"){
            radiobutton.edit({ embed: United_Kingdomembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Austria"){
            radiobutton.edit({ embed: austriaembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Belgium"){
                radiobutton.edit({ embed: Belgiumembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Bosnia"){
                radiobutton.edit({ embed: Bosniaembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Czech"){
                radiobutton.edit({ embed: Czechembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Denmark"){
                radiobutton.edit({ embed: Denmarkembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Germany"){
                radiobutton.edit({ embed: germanyembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Hungary"){
                radiobutton.edit({ embed: Hungaryembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Ireland"){
                radiobutton.edit({ embed: Irelandembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Italy"){
                radiobutton.edit({ embed: Italyembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Luxembourg"){
                radiobutton.edit({ embed: Luxembourgembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Romania"){
                radiobutton.edit({ embed: Romaniaembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Serbia"){
                radiobutton.edit({ embed: Serbiaembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Spain"){
                radiobutton.edit({ embed: Spainembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Sweden"){
                radiobutton.edit({ embed: Swedenembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Turkey"){
                radiobutton.edit({ embed: TURKEYembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Ukraine"){
                radiobutton.edit({ embed: Ukraineembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            } else if(b.id == "Nigeria"){
                radiobutton.edit({ embed: Nigeriaembed, components: [ { type: 1, components: [Rkingdom, Raustria, RBelgium, RBosnia, RCzech] }, { type: 2, components: [RDenmark, Rgermany, RHungary, RIreland, RItaly] }, { type: 3, components: [RLuxembourg, RRomania, RSerbia, RSpain, RSweden] }, { type: 4, components: [RTurkey, RUkraine, Home, Rvote, Rserver] } ] });
            }
      })
  }
  StateManager.on('PrefixFetched', (guildId, prefix) => {
    guildPrefix.set(guildId, prefix);
  });