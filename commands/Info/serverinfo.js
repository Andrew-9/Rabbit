const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
require("moment-duration-format");
module.exports = {
    name: "serverinfo",
    category: "Info",
    usage: "serverinfo",
    aliases: ["sinfo", "ginfo", "si"],
    cooldown: 5,
    description: "Shows information about the server",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let prefix = client.settings.get(message.guild.id, "prefix");
            let color = client.settings.get(message.guild.id, `colorlike`);
            let pointer = client.settings.get(message.guild.id, `pointer`);
            let Kotlin = client.settings.get(message.guild.id, `kotlin`);
            var e = message.guild.emojis.cache.map((e) => e.toString());
            function checkdays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
            }
            if (message.guild.rulesChannel) {
            rules = "<#" + message.guild.rulesChannel + ">";
            } else {
            rules = "No channel";
            }
            if (message.guild.widgetEnabled == "true") {
            widget = "<#" + message.guild.widgetChannel + ">";
            } else {
            widget = "Not enabled";
            }
            let djs = "";
            if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "No Roles"
            else
            for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
            djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }
            let owner = await message.guild.fetchOwner()
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
            content: "**/ You can try this with slash command \`/info serverinfo\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(message.guild.name.toUpperCase())
            .setThumbnail(message.guild.iconURL({dynamic: true, format: "png", size: 2048}))
            .setDescription(`
            ${pointer} **Prefix** - \`${prefix}\`
            ${pointer} **ID** - \`${message.guild.id}\`
            ${pointer} **DJ Roles** - ${djs}
            ${pointer} **Owner** - ${owner}
            ${pointer} **Roles** - \`${message.guild.roles.cache.size}\`
            ${pointer} **Members** - ${message.guild.memberCount}
            ${pointer} **Channels** - ${message.guild.channels.cache.size}
            ${pointer} **Emojis** - \`${message.guild.emojis.cache.size}\`
            ${pointer} **Boosts** - \`${message.guild.premiumSubscriptionCount}\` [${message.guild.premiumTier} tier]
            ${pointer} **Members verification** - \`${message.guild.verificationLevel.toLowerCase()}\`
            ${pointer} **Creation Date** - ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})
            ${pointer} **Guild verified** - ${message.guild.verified}
            ${pointer} **Discord partner** - ${message.guild.partnered}
            ${pointer} **Banner** - ${message.guild.banner || "Not set"}
            ${pointer} **Discovery Splash** - ${message.guild.discoverySplash || "Not set"}
            ${pointer} **Rules channel** - ${rules}
            ${pointer} **Widget channel** - ${widget}
            ${pointer} **Description** - ${message.guild.description || "Not set"}
            `)
            .setFooter("Rabbit by Kotlin#0427")
            .setTimestamp()
            ],
            components: [row]
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