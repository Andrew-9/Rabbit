const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const wait = require('util').promisify(setTimeout);
module.exports = {
  name: "changemymind",
  category: "Image",
  usage: "changemymind <text>",
  aliases: [""],
  description: "Try to change my mind!",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `imagecolor`);
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setURL(client.global.get("global", "invite"))
    .setLabel("Invite")
    .setEmoji('924818034965766215')
    .setStyle("LINK"),

    new MessageButton()
    .setLabel('Vote')
    .setURL(client.global.get("global", "vote"))
    .setStyle('LINK')
    .setEmoji('924819119860224082'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=nkQZ1RDoBD4&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    if (!args[0]) {
    message.reply({ content: `<:attention:924255783695314964> **Please enter a text... Try again...**`,  components: [row] })
    } else if (args.join(" ") > 20) {
    message.reply({ content: `<:attention:924255783695314964> **Max lenght for the text is 20... Try again...**`,  components: [row] })
    } else {
    const m = await message.reply({ content: `<a:is_loading:923892698782511125> **Changing my mind... Hold On...**`,  components: [row] })
    await wait(5000);
    const changemymind = await canvacord.Canvas.changemymind(args.join(" "));
    const attachment = new MessageAttachment(changemymind, "changemymind.png");
    m.edit({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/image changemymind\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://changemymind.png')
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
    .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
    .setFooter("Error in code: Report this error to kotlin#0427")
    .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
    ],
    });
    }
  }
}
