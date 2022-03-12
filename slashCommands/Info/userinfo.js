const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
require("moment-duration-format");
const moment = require("moment");
module.exports = {
  name: "userinfo",
  cooldown: 5,
  description: "Shows some information about a user",
  memberpermissions: [""], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [
    {
      "User": {
        name: "user",
        description: "ping a user to display their information",
        required: false
      }
    }
  ],
  run: async (client, interaction) => {
    try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `colorlike`);
    let pointer = client.settings.get(guild.id, `pointer`); 
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const target = options.getUser("user") || interaction.user;
    const xmember = interaction.guild.members.cache.get(target.id);
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    let badges = await target.flags;
    badges = await badges.toArray();
    let newbadges = [];
    badges.forEach((m) => {
    newbadges.push(m.replace("_", " "));
    });
    if (target.bot == true) {
    var isbot = " <:xbot:869964181997223946>";
    } else {
    var isbot = "";
    }
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setURL(client.global.get("global", "invite"))
    .setLabel("Invite")
    .setEmoji('924818034965766215')
    .setStyle("LINK"),

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

    new MessageButton()
    .setLabel('Instagram')
    .setURL("https://www.instagram.com/fumigramapp")
    .setStyle('LINK')
    .setEmoji('924819412505223188'),
    )
    interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}userinfo\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle(`${capitalizeFirstLetter(target.tag) + isbot}`)
    .setThumbnail(target.displayAvatarURL({dynamic: true, format: "png", size: 2048 }))
    .setDescription(`
    ${pointer} **ID** - \`${target.id}\`
    ${pointer} **Badges** - ${capitalizeFirstLetter(newbadges.join(", ")) || "NONE"}
    ${pointer} **Discriminator** - \`#${target.discriminator}\`
    ${pointer} **Member Since** - ${moment(target.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}
    ${pointer} **Account Created At** - ${moment(target.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
    ${pointer} **${target.username} Roles** - ${xmember.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}
    `)
    .setFooter("Vote for Rabbit :)", client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setTimestamp()
    ],
    components: [row]
    });
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