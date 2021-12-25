const Discord = require("discord.js");
const config = require("../../config");
module.exports = {
 name: "servers",
 aliases: ["guilds"],
 description: "Displays total servers where the bot is in.",
 category: "General",
 usage: "servers",
 run: async (client, message, args) => {
  try {
  const embed = new Discord.MessageEmbed()
  .setColor("#ff6900")
  .setAuthor(`SERVERS THAT LOVES RABBIT!`, client.user.displayAvatarURL())
  .setDescription(`
  <:rabbitpoint:897844154258841620> **Running in** - \`${client.guilds.cache.size}\` servers
  <:rabbitpoint:897844154258841620> **Serving up to** - \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\` members
  <:rabbitpoint:897844154258841620> **Rabbit Version** - \`${config.version}\`
  <:rabbitpoint:897844154258841620> **Invite Rabbit** - [with this link](https://discord.com/api/oauth2/authorize?client_id=734522699228905585&permissions=158913785591&scope=bot%20applications.commands)
  `)
   message.lineReply(embed);
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
