const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "sneeze",
  category: "Fun",
  usage: "sneeze",
  aliases: [""],
  description: "Achoo",
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
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=I28saraQ9XI&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    const sneezes = ["**Achoo!**", "*chew!*", "Ah... Ah... **A_CHOO!_**", "_Ah..._**CHOOOOOOOOOOOOOOOOOOOO!**", "**Achoo!** Excuse me!"];
    message.reply({ content: `${sneezes[Math.floor(Math.random() * Math.floor(sneezes.length))]}`, components: [row] });
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
