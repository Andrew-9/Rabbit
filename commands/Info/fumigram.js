const { MessageButton, MessageEmbed, MessageActionRow } = require('discord.js');

module.exports = {
 name: "fumigram",
 aliases: [],
 description: "Provide's a link and some information about the fumigram community",
 category: "Info",
 usage: "fumigram",
 cooldown: 1,
 memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
 requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
 alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
 run: async (client, message, args) => {
  try {   
    let color = client.settings.get(message.guild.id, `colorlike`);
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel('ABOUT')
      .setURL('https://about.fumigram.com')
      .setStyle('LINK')
      .setEmoji('💌'),

      // new MessageButton()
      // .setLabel('DISCORD')
      // .setURL("https://discord.gg/p7k64z7CcA")
      // .setStyle('LINK')
      // .setEmoji('912853110186201139'),

      new MessageButton()
      .setLabel('INSTAGRAM')
      .setURL("https://www.instagram.com/fumigramapp")
      .setStyle('LINK')
      .setEmoji('🐇'),

      new MessageButton()
      .setLabel('FACEBOOK')
      .setURL("https://web.facebook.com/fumigram")
      .setStyle('LINK')
      .setEmoji('🤩'),
    );

    message.reply({
      content: "**/ You can try this with slash command \`/info fumigram\`**",
      embeds: [
        new MessageEmbed()
        .setTitle("FUMIGRAM IMAGE SHARING COMMUNITY")
        .setDescription(`
        Fumigram has provided a place mainly for animation activities.
        We believe that anime fans deserve to have their very own social community
        And it would be able to help bring all of the fans out there closer.
        We have made a image sharing community which would be the start of this endeavor
        And with time more ideas will be implemented to make the world of animation more interesting for others.
        `)
        .setImage("https://media.discordapp.net/attachments/711910361133219903/885985719292686386/banner-bg.jpg?width=1089&height=612")
        .setColor(color)
      ],
      components: [row]
    });
  
  } catch (err) {
    console.log(err);
    message.reply({
		embeds: [
		new MessageEmbed()
    .setColor("#ff0079")
    .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
    .setFooter("Error in code: Report this error to kotlin#0427")
    .setDescription(`\`\`\`${err.stack.toString().substr(0, 800)}\`\`\``)
		],
		});
  }
 },
};
