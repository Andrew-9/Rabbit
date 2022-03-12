const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require(`discord.js`);
module.exports = {
  name: `setupmusic`,
  category: `System`,
  usage: `setupmusic`,
  aliases: [],
  cooldown: 10,
  description: `Setup endless music streaming in a channel`,
  memberpermissions: [`MANAGE_GUILD`], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      const { member } = message;
      const { guild } = member;
      let prefix = client.settings.get(guild.id, "prefix");
			let color = client.settings.get(guild.id, `setupcolor`);
			let emoji = client.settings.get(guild.id, `audioemoji`);
			let rabbit = client.settings.get(guild.id, `emoji`);
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel('Support Server')
        .setURL(client.global.get("global", "support"))
        .setStyle('LINK')
        .setEmoji('924818382908440606'),
  
        new MessageButton()
        .setLabel('Vote')
        .setURL(client.global.get("global", "vote"))
        .setStyle('LINK')
        .setEmoji('924819119860224082'),
  
        new MessageButton()
        .setLabel('Instagram')
        .setURL("https://www.instagram.com/fumigramapp")
        .setStyle('LINK')
        .setEmoji('924819412505223188'),
        )
      let audiothumb = client.links.get(message.guild.id, `audiothumb`);
      let thumbnail = client.links.get(message.guild.id, `audiomackbg`);
      var embeds = [
      new MessageEmbed()
      .setColor(color)
      .setTitle(`${guild.name.toUpperCase()} MUSIC QUEUE`)
      .setDescription(`There are currently \`0 songs\` in the queue\nadd music to the queue by typing the \`song name\``)
      .setThumbnail(guild.iconURL({ dynamic: true, format: "png", size: 2048 })),
      new MessageEmbed()
      .setColor(color)
      .setThumbnail(audiothumb)
      .setFooter(guild.name, guild.iconURL({ dynamic: true, format: "png", size: 2048 }))
      .setImage(guild.banner ? guild.bannerURL({ size: 4096 }) : thumbnail)
      .setTitle(`START LISTENING TO MUSIC`)
      .setDescription(`> **\`${client.user.username}\`** is ready to start streaming music\n> you can start listening to your favourite songs\n> by connecting to a \`voice channel\` and sending\n> the \`song link\` or \`song name\` in this channel!`)
      ]
      var Emojis = [
        `0️⃣`,
        `1️⃣`,
        `2️⃣`,
        `3️⃣`,
        `4️⃣`,
        `5️⃣`,
        `6️⃣`,
        `7️⃣`,
        `8️⃣`,
        `9️⃣`,
        `🔟`,
        `🟥`,
        `🟧`,
        `🟨`,
        `🟩`,
        `🟦`,
        `🟪`,
        `🟫`,
      ]
      //now we add the components!
      var components = [
        new MessageActionRow()
        .addComponents([
          new MessageSelectMenu()
          .setCustomId(`MessageSelectMenu`)
          .addOptions([
            `Pop`, `Strange-Fruits`, `Gaming`, `Chill`, `Rock`, `Jazz`, `Blues`, `Metal`, `Magic-Release`, `NCS | No Copyright Music`, `Default`].map((t, index) => {
            return {
              label: t.substr(0, 25),
              value: t.substr(0, 25),
              description: `Load a Music-Playlist: '${t}'`.substr(0, 50),
              emoji: Emojis[index]
            }
          }))
        ]),
        new MessageActionRow().addComponents([
          new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji("925725054757650452").setLabel(`Skip`).setDisabled(),
          new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji("928043900210384997").setLabel(`Stop`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji("928042760974528553").setLabel(`Pause`).setDisabled(),
          new MessageButton().setStyle('SUCCESS').setCustomId('Autoplay').setEmoji("928040356526825552").setLabel(`Autoplay`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Shuffle').setEmoji("928044516873736244").setLabel(`Shuffle`).setDisabled(),
        ]),
        new MessageActionRow().addComponents([
          new MessageButton().setStyle('PRIMARY').setCustomId('Song').setEmoji("928040233004593222").setLabel(`Repeat Song`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Queue').setEmoji("928042036123271178").setLabel(`Repeat Queue`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Forward').setEmoji("928960622706720798").setLabel(`Forward +10s`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Rewind').setEmoji("928961006191927338").setLabel(`Rewind -10s`).setDisabled(),
        ]),
      ]
      let channel = message.mentions.channels.first();
      if (!channel){
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/settings setupmusic\`**",
          embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`ADD A CHANNEL`)
            .setDescription(`Please ping the \`text\` channel you want to setup music`)
          ],
        });
      }
      //send the data in the channel
      channel.send({ embeds, components }).then(msg => {
      client.settings.set(message.guild.id, channel.id, `music.channel`);
      client.settings.set(message.guild.id, msg.id, `music.message`);
      return message.reply({
        content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/settings setupmusic\`**",
        embeds: [new MessageEmbed()
          .setColor(color)
          .setTitle(`AUDIOMACK SETUP COMPLETE`)
          .setDescription(`Successfully setupped audiomack music streaming in: <#${channel.id}>`)
        ],
      });
      });
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}