const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "userinfo",
 aliases: ["ui", "user-info"],
 description: "Get the information about a user",
 category: "General",
 usage: "userinfo [user]",
 run: async (client, message, args) => {
  try {
   const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   let stat = {
    online: "<:online:869941795285508156>",
    idle: "<:idle:869942541527699496>",
    dnd: "<:dnd:869943654263980082>",
    offline: "<:offline:869945729299398727>",
   };
   function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   let badges = await user.user.flags;
   badges = await badges.toArray();
   let newbadges = [];
   badges.forEach((m) => {
    newbadges.push(m.replace("_", " "));
   });
   let array = [];
   if (user.user.presence.activities.length) {
    let data = user.user.presence.activities;
    for (let i = 0; i < data.length; i++) {
     let name = data[i].name || "None";
     let xname = data[i].details || "None";
     let zname = data[i].state || "None";
     let type = data[i].type;
     //array.push(capitalizeFirstLetter(type.toLowerCase()) + `: \`${name} : ${xname} : ${zname}\``);
     array.push(`🎮 ` + capitalizeFirstLetter(type.toLowerCase()) + `: \`${name}\``);
     if (data[i].name === "Spotify") {
      embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`);
     }
    }
   }
   if (user.user.bot == true) {
    var isbot = " <:xbot:869964181997223946>";
   } else {
    var isbot = ""; // This exists because user.user.bot sometimes return nothing not boolean
   }
   const embed = new Discord.MessageEmbed()
   .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
   .setColor("#00efff")
   .setTitle(user.user.tag + isbot)
   .setDescription(`
   <:bluepointer:897839647034601492> **ID** - \`${user.user.id}\`
   <:bluepointer:897839647034601492> **Status** - ${capitalizeFirstLetter(user.user.presence.status)}
   <:bluepointer:897839647034601492> **Badges** - ${capitalizeFirstLetter(newbadges.join(", ")) || "None"}
   <:bluepointer:897839647034601492> **Discriminator** - \`#${user.user.discriminator}\`
   <:bluepointer:897839647034601492> **Joined At** - ${moment(user.user.joinedAt).format("LLLL")}
   <:bluepointer:897839647034601492> **Account Created At** - ${moment(user.user.createdAt).format("LLLL")}
   <:bluepointer:897839647034601492> **Account Deleted?** - ${user.deleted}
   <:bluepointer:897839647034601492> **Highest Role** - ${user.roles.highest}
   `)
   .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048 }));
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
