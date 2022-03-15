const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const axios = require("axios").default;
const wait = require('util').promisify(setTimeout);
module.exports = {
  name: "red-panda",
  category: "Fun",
  usage: "red-panda",
  aliases: [""],
  description: "Sends a random red panda image",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `funcolor`);
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands`)
      .setLabel("Invite")
      .setEmoji('💌')
      .setStyle("LINK"),
  
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=BQMTb-S60l4&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    message.channel.sendTyping();
    const options = {
    method: "GET", url: "https://some-random-api.ml/img/red_panda" };
    axios.request(options).then(async (response) => {
    const m = await message.reply({ content: `🥕 **Looking for a red panda...**`,  components: [row] })
    await wait(2000);
    m.edit({
    content: "**/ Found one. Try slash command \`/Fun red-panda\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage(response.data.link)
    ],
    components: []
    })
    });
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
