const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "avatar",
    category: "Info",
    usage: "avatar <user>",
    aliases: [],
    cooldown: 5,
    description: "Get a user avatar",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let prefix = client.settings.get(message.guild.id, "prefix");
            let color = client.settings.get(message.guild.id, `colorlike`);
            //const target = message.mentions.users.first() || message.author;
            let target = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.author;
            const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
              .setLabel('Support Server')
              .setURL("https://discord.com/invite/MJ5tYb4Jh9")
              .setStyle('LINK')
              .setEmoji('✈'),
  
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
              .setLabel('Instagram')
              .setURL("https://www.instagram.com/fumigramapp")
              .setStyle('LINK')
              .setEmoji('🔗'),
            )
            message.reply({
            content: "**/ Try this with slash command \`/info avatar\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setImage(target.displayAvatarURL({dynamic: true, format: "png", size: 2048 }))
            ],
            components: []
         });
        } catch (e) {
         console.log(e)
         return message.reply({
            embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`❌ AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}