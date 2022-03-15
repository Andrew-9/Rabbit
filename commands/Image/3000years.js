const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);
module.exports = {
  name: "3000years",
  category: "Image",
  usage: "3000years [user mention, user id, user name]",
  aliases: [""],
  description: "3000 Years later",
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
      .setLabel('Support Server')
      .setURL("https://discord.com/invite/MJ5tYb4Jh9")
      .setStyle('LINK')
      .setEmoji('✈'),

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
    )
    const m = await message.reply({ content: `🥕 **Fast forwarding the years... Hold On...**`,  components: [row] })
    const wait = require('util').promisify(setTimeout);
    await wait(5000);
    const buffer = await AmeAPI.generate("3000years", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }) });
    const attachment = new MessageAttachment(buffer, "3000years.png");
    m.edit({
    content: "**/ Try this with slash command \`/image 3000years\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://3000years.png')
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
