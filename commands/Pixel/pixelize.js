const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);
const wait = require('util').promisify(setTimeout);
module.exports = {
  name: "pixelize",
  category: "Pixel",
  usage: "pixelize [pixelize] [user mention, user id]",
  aliases: [""],
  description: "Pixelize the user avatar",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `pixelcolor`);
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
    .setURL('https://www.youtube.com/watch?v=BQMTb-S60l4&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    const pixelize = args[0] || 50;
    if (isNaN(args[0])) {
    message.reply({ content: `⚔ **The pixelizer must be a number... Try again...**`,  components: [row] })
    } else if (args[0] < 2) {
    message.reply({ content: `⚔ **The pixelizer must be higher than \`2\`... Try again...**`,  components: [row] })
    } else if (args[0] > 50) {
    message.reply({ content: `⚔ **The pixelizer must be lower than \`50\`... Try again...**`,  components: [row] })
    } else {
    message.channel.sendTyping();
    const m = await message.reply({ content: `🚈 **Generating Pixels... Hold On...**`,  components: [row] })
    const buffer = await AmeAPI.generate("pixelize", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }), pixelize: pixelize });
    const attachment = new MessageAttachment(buffer, "pixelize.png");
    await wait(3000);
    m.edit({
    content: "**/ Try this with slash command \`/pixel pixelize\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://pixelize.png')
    ],
    files: [attachment],
    components: []  
    })
    }
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
