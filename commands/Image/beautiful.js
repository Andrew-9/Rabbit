const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "beautiful",
  category: "Image",
  usage: "beautiful [user mention, user id]",
  aliases: [""],
  description: "Oh this? This is beautiful!",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `imagecolor`);
    let user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands`)
      .setLabel("Invite")
      .setEmoji('💌')
      .setStyle("LINK"),
  
      new MessageButton()
      .setLabel('Vote')
      .setURL("https://top.gg/bot/897819791732121621")
      .setStyle('LINK')
      .setEmoji('🐰'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=xsjgpj2AtTM&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    const m = await message.reply({ content: `🔊 **Beautifying user's profile... Hold On...**`,  components: [row] })
    const wait = require('util').promisify(setTimeout);
    await wait(5000);
    const beautiful = await canvacord.Canvas.beautiful(user.user.displayAvatarURL({ dynamic: false, format: "png", size: 2048 }));
    const attachment = new MessageAttachment(beautiful, "beautiful.png");
    m.edit({
    content: "**/ Try this with slash command \`/image beautiful\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://beautiful.png')
    ],
    files: [attachment],
    components: []  
    })
    } catch (e) {
    console.log(e.stack ? e.stack : e)
    message.reply({
    embeds: [
    new MessageEmbed()
    .setColor("#ff0079")
    .setTitle(`❌ AN ERROR OCCURED!`)
    .setFooter("Error in code: Report this error to kotlin#0427")
    .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
    ],
    });
    }
  }
}
