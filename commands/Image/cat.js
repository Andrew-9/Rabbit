const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
const wait = require('util').promisify(setTimeout);
module.exports = {
  name: "cat",
  category: "Image",
  usage: "cat",
  aliases: [""],
  description: "Sends a random cat photo",
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
    .setLabel('Vote')
    .setURL(client.global.get("global", "vote"))
    .setStyle('LINK')
    .setEmoji('924819119860224082'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=bT-Hznb78UM&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    message.channel.sendTyping();
    const m = await message.reply({ content: `<a:is_loading:923892698782511125> **Looking for a kitty...**`,  components: [row] })
    const response = await fetch("https://nekos.life/api/v2/img/meow");
    const body = await response.json();
    await wait(3000);
    m.edit({
    content: "**<:rabbitslash:913423874182500352> Found one. Try slash command \`/image cat\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage(body.url)
    ],
    components: []
    })
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
