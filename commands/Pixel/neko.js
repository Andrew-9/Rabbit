const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const wait = require('util').promisify(setTimeout);
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports = {
  name: "neko",
  category: "Pixel",
  usage: "neko",
  aliases: [""],
  description: "Sends a random sweet neko",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `pixelcolor`);
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Vote')
    .setURL(client.global.get("global", "vote"))
    .setStyle('LINK')
    .setEmoji('924819119860224082'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=55unNKP2DBE&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    message.channel.sendTyping();
    async function nekof() {
    const GIF = await neko.sfw.neko();
    const m = await message.reply({ content: `<a:is_loading:923892698782511125> **Looking for a neko...**`,  components: [row] })
    await wait(2000);
    m.edit({
    content: "**<:rabbitslash:913423874182500352> Found one. Try \`/pixel neko\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage(GIF.url)
    ],
    components: []
    })
    }
    nekof();
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
