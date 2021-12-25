const Discord = require("discord.js");

module.exports = {
 name: "serverinfo",
 aliases: ["sf", "server-info", "server"],
 description: "Display server info",
 category: "General",
 usage: "serverinfo",
 run: async (client, message, args) => {
  try {
   var roles = [];
   var e = message.guild.emojis.cache.map((e) => e.toString());
   function checkdays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
   }
   let region = {
    brazil: ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    singapore: ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    sydney: ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    london: ":flag_gb: London",
    europe: ":flag_eu: Europe",
    india: ":flag_in: India",
    amsterdam: ":flag_nl: Amsterdam",
    hongkong: ":flag_hk: Hong Kong",
    russia: ":flag_ru: Russia",
    southafrica: ":flag_za:  South Africa",
    };
    if (message.guild.rulesChannel) {
      rules = "<#" + message.guild.rulesChannel + ">";
    } else {
      rules = "Rules channel not exists";
    }
    if (message.guild.widgetEnabled == "true") {
      widget = "<#" + message.guild.widgetChannel + "> (ID: " + message.guid.widgetChannelID + ")";
    } else {
      widget = "Server widget not enabled";
    }
    let djs = "";
    if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "No Roles Yet"
    else
    for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
        djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
    }
    const embed = new Discord.MessageEmbed()
    .setTitle(message.guild.name.toUpperCase(), message.guild.iconURL)
    .setColor("#00efff")
    .setThumbnail(message.guild.iconURL())
    .setDescription(`
    <:bluepointer:897839647034601492> **ID** - \`${message.guild.id}\`
    <:bluepointer:897839647034601492> **DJ Roles** - ${djs}
    <:bluepointer:897839647034601492> **Owner** - ${message.guild.owner}
    <:bluepointer:897839647034601492> **Region** - ${region[message.guild.region] || message.guild.region}
    <:bluepointer:897839647034601492> **Roles** - \`${message.guild.roles.cache.size}\`
    <:bluepointer:897839647034601492> **Members** - ${message.guild.memberCount}
    <:bluepointer:897839647034601492> **Channels** - ${message.guild.channels.cache.size}
    <:bluepointer:897839647034601492> **Emojis** - \`${message.guild.emojis.cache.size}\`
    <:bluepointer:897839647034601492> **Boosts** - \`${message.guild.premiumSubscriptionCount}\` [${message.guild.premiumTier} tier]
    <:bluepointer:897839647034601492> **Members verification** - \`${message.guild.verificationLevel.toLowerCase()}\`
    <:bluepointer:897839647034601492> **Creation Date** - ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})
    <:bluepointer:897839647034601492> **Guild verified** - ${message.guild.verified}
    <:bluepointer:897839647034601492> **Discord partner** - ${message.guild.partnered}
    <:bluepointer:897839647034601492> **Banner** - ${message.guild.banner || "Not set"}
    <:bluepointer:897839647034601492> **Discovery Splash** - ${message.guild.discoverySplash || "Not set"}
    <:bluepointer:897839647034601492> **Rules channel** - ${rules}
    <:bluepointer:897839647034601492> **Widget channel** - ${widget}
    <:bluepointer:897839647034601492> **Description** - ${message.guild.description || "Not set"}
    `)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setTimestamp();
    message.channel.send(embed);
  } catch (err) {
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
  }
 },
};
