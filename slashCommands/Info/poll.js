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
    .setURL(client.global.get("global", "support"))
    .setStyle('LINK')
    .setEmoji('924818382908440606'),

    new MessageButton()
    .setLabel('Vote')
    .setURL(client.global.get("global", "vote"))
    .setStyle('LINK')
    .setEmoji('924819119860224082'),
    )
    if(!question){
    return interaction.reply({
    content: `<:attention:924255783695314964> **Please enter some questions to ask...**`,
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
    await pollchannel.react("<:R_rabbit:924819119860224082>");
    await pollchannel.react("<:colds_weat:891709868791177236>");
    await pollchannel.react("<:expressionless_face:923878288869433364>");
    await pollchannel.react("<:look_of_triumph:891707172319268915>");
    await pollchannel.react("<:grinning_with_smiling_eye:891707708825288764>");
    await pollchannel.react("<:frowning_with_open_mouth:891713919540932679>");
    await pollchannel.react("<:loudly_crying:891714040122974318>");
    await pollchannel.react("<:smiling_with_heart_eyes:891708293544824882>");
    await pollchannel.react("<:is_thinking:891709419602210917>");
    await pollchannel.react("<:is_lying:891707806334451782>");
    }
    } catch (e) {
    console.log(e.stack ? e.stack : e)
    interaction.editReply({
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