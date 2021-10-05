const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const moment = require("moment")

module.exports = {
  name: "emojiinfo",
  aliases: ["infoemoji"],
  category: "Utility",
  description: "See Information about an emji",
  usage: "emojiinfo <EMOJI>",
  run: async (client, message, args) => {
    try {
      let hasEmoteRegex = /<a?:.+:\d+>/gm
      let emoteRegex = /<:.+:(\d+)>/gm
      let animatedEmoteRegex = /<a:.+:(\d+)>/gm
      if(!message.content.match(hasEmoteRegex))
        return message.reply("<:xvector:869193619318382602> **| Include a VALID Emoji. try adding a guild specific emoji!**")
      if (emoji1 = emoteRegex.exec(message)) {
        message.channel.startTyping();
        let url = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".png?v=1"
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if(!emoji) return message.channel.send("Please provide a custom Emoji from **THIS GUILD**")
        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌" ;
        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
        .setColor("RANDOM")
        .setThumbnail('https://media.discordapp.net/attachments/711910361133219903/872461614404743218/avatar.png')
        .setThumbnail(emoji.url)
        .addField("**General:**", [
          `**ID:** \`${emoji.id}\``,
          `**URL:** [\`EMOJI LINK\`](${emoji.url})`,
          `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
          `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " +  moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
        ])
        .addField("**Others:**", [
          `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
          `**Animated:** \`${checkOrCross(emoji.animated)}\``,
          `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
          `**Managed:** \`${checkOrCross(emoji.managed)}\``,
        ])
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.stopTyping();
        message.channel.send(embed)
      }
      else if (emoji1 = animatedEmoteRegex.exec(message)) {
        message.channel.startTyping();
        let url2 = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".gif?v=1"
        let attachment2 = new Discord.MessageAttachment(url2, "emoji.gif")
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if(!emoji) return message.channel.send("<:xvector:869193619318382602> | **Provide a custom Emoji from `THIS GUILD`**")
        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌" ;
        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
        .setColor('#d34242')
        .setThumbnail('https://media.discordapp.net/attachments/711910361133219903/872461614404743218/avatar.png')
        .setThumbnail(emoji.url)
        .addField("**General:**", [
          `**ID:** \`${emoji.id}\``,
          `**URL:** [\`LINK\`](${emoji.url})`,
          `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
          `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " +  moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
        ])
        .addField("**Others:**", [
          `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
          `**Animated:** \`${checkOrCross(emoji.animated)}\``,
          `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
          `**Managed:** \`${checkOrCross(emoji.managed)}\``,
        ])
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.stopTyping();
        message.channel.send(embed)
      }
      else {
        message.channel.send("**Couldn't find an emoji to paste! \nif it's uniced(standard) and not a guild Emoji, it's not possible!")
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor('#d34242')
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTitle(`<:xvector:869193619318382602> **ERROR | An error occurred Somewhere**`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}