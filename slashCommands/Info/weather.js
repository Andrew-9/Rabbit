const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const weather = require("weather-js");
module.exports = {
  name: "weather",
  cooldown: 5,
  description: "Checks a weather forecast",
  memberpermissions: [""], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [
    {
      "String": {
        name: "location",
        description: "Which country are you looking to check their weather",
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
    let pointer = client.settings.get(guild.id, `pointer`); 
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const location = options.getString("location");

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
    )
    weather.find({ search: location, degreeType: "C" },
    function (error, result) {
    if (error) {
    return interaction.reply({
    content: `🔊\n${error}`,
    components: [row]
    });
    }
    if (result === undefined || result.length === 0) {
    return interaction.reply({
    content: `🔊 The location your provided is not valid...`,
    components: [row]
    });
    }
    let current = result[0].current;
    let location = result[0].location;
    interaction.reply({
    content: `**${emoji} Easily use this command with \`${prefix}weather\`**`,
    embeds: [new MessageEmbed()
    .setTitle("WEATHER FORCAST")
    .setThumbnail(current.imageUrl)
    .setColor(color)
    .setDescription(`
    > 🔊 **Information**
    > Loaction - \`${current.observationpoint}\`
    > Degree Type - \`Celsius\`
    > The Wind - \`${current.winddisplay}\`
    > Sky Text - \`${current.skytext}\`
    > Temperature - \`${current.temperature}°\`
    > Feels like - \`${current.feelslike}°\`
    > Humidity - \`${current.humidity}%\`
    > Timezone - \`UTC${location.timezone}\`
    `)
    ],
    });
    }
    );
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