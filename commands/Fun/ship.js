const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const progressbar = require("percentagebar");
module.exports = {
  name: "ship",
  category: "Fun",
  usage: "ship <user1> <user2>",
  aliases: [""],
  description: "Ship members together",
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
      .setLabel('Vote')
      .setURL("https://top.gg/bot/897819791732121621")
      .setStyle('LINK')
      .setEmoji('🐰'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=WFnf4QXF4bE&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    const user1 = args[0];
    if (!user1) {
    return message.reply({
    content: "**/ Try this with slash command \`/fun ship\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A FRIEND")
    .setDescription(`Please mention a user to ship \`${prefix}ship @kotlin\``)
    ],
    components: [row]
    });
    } 
    const user2 = args[1];
    if (!user2){
    return message.reply({
    content: "**/ Try this with slash command \`/fun ship\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A FRIEND")
    .setDescription(`Please mention the secound user to ship \`${prefix}ship @Elena\``)
    ],
    components: [row]
    });
    } else {
    const ship = Math.floor(Math.random() * 100) + 1;
    const bar = progressbar(100, ship, 10, "🥕", "🥕", "💔 ", " ❤️", false);
    let truelove = ["MENT FOR EACH OTHER", "TRUE LOVE FOR EACH OTHER", "BORN FOR EACH OTHER", "NEVER TO BE APART", "CONGRATULATE THEM"];
    const real_love = truelove[Math.floor(Math.random() * truelove.length)];
    let mehh = new MessageEmbed()
    .setColor("#ff4f65")
    .setTitle("NOT A MATCH")
    .setDescription(`**${user1}** and **${user2}** has been **shipped**\nBut the result was **${ship}%** \n${bar}`)
    .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/924038377672675408/broken.gif")
    /** * @CODE BY KOTLIN#0427 **/
    let love = new MessageEmbed()
    .setColor("#ff1f74")
    .setTitle(real_love)
    .setDescription(`**${user1}** and **${user2}** has been **shipped**\nAnd the result is **${ship}%** \n${bar}`)
    .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/924039937601462272/love.gif")

    if (ship > 50) {
    message.reply({
    content: "**/ Try this with slash command \`/fun ship\`**",
    embeds: [love]
    });
    } else {
    message.reply({
    content: "**/ Try this with slash command \`/fun ship\`**",
    embeds: [mehh]
    });
    }
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
