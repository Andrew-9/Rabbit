const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const pop = require("popcat-wrapper");
module.exports = {
  name: "poll",
  cooldown: 5,
  description: "Create a questionable poll",
  memberpermissions: [""], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [
    {
      "String": {
        name: "message",
        description: "The question you want to ask",
        required: true
      }
    }
  ],
  run: async (client, interaction) => {
    try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `colorlike`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const question = options.getString("message");
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel('Support Server')
      .setURL("https://discord.com/invite/MJ5tYb4Jh9")
      .setStyle('LINK')
      .setEmoji('924818382908440606'),

      new MessageButton()
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands`)
      .setLabel("Invite")
      .setEmoji('💌')
      .setStyle("LINK"),
    )
    if(!question){
    return interaction.reply({
    content: `💢 **Please enter some questions to ask...**`,
    components: [row]
    });
    } else {
    let embed = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setColor(color)
    .setDescription(question)
    .setTimestamp()
    .setFooter(`Poll by: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
    let pollchannel = await interaction.channel.send({
    content: `**${emoji} Easily use this same command with \`${prefix}poll\`**`,
    embeds: [embed],
    components: []
    });
    await pollchannel.react("🐇");
    await pollchannel.react("✔");
    await pollchannel.react("❌");
    await pollchannel.react("💌");
    await pollchannel.react("👋");
    await pollchannel.react("🥕");
    await pollchannel.react("❤");
    await pollchannel.react("🔥");
    await pollchannel.react("😍");
    await pollchannel.react("😔");
    }
    } catch (e) {
    console.log(e.stack ? e.stack : e)
    interaction.editReply({
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