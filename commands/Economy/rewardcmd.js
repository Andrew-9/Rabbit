const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "claimreward",
 aliases: ["creward"],
 category: "Economy",
 description: "Claim more rewards after completing the economy progress",
 usage: "claimreward",
 run: async (client, message, args) => {
  try {
    if (message.member.roles.cache.some(role => role.id === '871855079987220541')) {
    let con = sql.query("SELECT `enabled` FROM `economy_ward` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
    let isEnabled = result[0].enabled
    if (isEnabled == 0) {
    const EcoNotEnabled = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> ECONOMY SYSTEM NOT ENABLED")
    .setDescription(`The economical system of this server is not **enabled**\nContact the admins of the server to enable it.`)
    return message.lineReply(EcoNotEnabled); 
    } else if (isEnabled == 1) {
    (async () => {
    const prefix = guildPrefix.get(message.guild.id);
    let b = sql.query("SELECT buyer, fish, crime, work FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if (result[0].buyer < 50) {
    let nope = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have bought \`50\`
    products from the global market to get rewards here
    `)
    message.channel.send(nope);
    } else if (result[0].fish < 100) {
    let nope1 = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have fished up to
    \`100\` times to get rewards from here. so continue fishing
    `)
    message.channel.send(nope1);
    } else if (result[0].crime < 100) {
    let nope2 = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have committed up to
    \`100\` crimes to get rewards from here. 
    So continue breaking the law to finish.
    `)
    message.channel.send(nope2);
    } else if (result[0].work < 100){
    let nope3 = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have worked up to
    \`100\` times to get rewards from here.
    So continue working hard to finish.
    `)
    message.channel.send(nope3);
    } else {
    const rlist = new Discord.MessageEmbed()
    .setColor("#ff8901")
    .setTitle(":gift: REWARD COMMANDS")
    .setDescription(`
    <:rabbitbullet:887617523925778443> ... **1** - \`daily\` claim a **$50,000** daily reward
    <:rabbitbullet:887617523925778443> ... **2** - \`weekly\` claim a **$100,000** weekly reward
    <:rabbitbullet:887617523925778443> ... **3** - \`xpcounter\` claim \`5xp\` counter for yourself
    <:rabbitbullet:887617523925778443> ... **4** - \`role\` claim \`1\` custom **role** for yourself
    <:rabbitbullet:887617523925778443> ... **5** - \`claimrole\` claim the \`✮:▹Rabbit Lover◃:✮\` **role**
    **Ask** the moderators to create your special role and give you 5xp counter.
    **Note:** You'll have to add the \`reward\` tag. **Eg:** \`${prefix}reward daily\`
    `)
    return message.channel.send(rlist);
    }
    });
 })();
 }
});
} else {
  const NoRole = new Discord.MessageEmbed()
  .setColor("#f04949")
  .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MEMBER OF MY GUILD!")
  .setDescription(`You have to be a member of my [support](https://discord.com/invite/tyjhKE3VdB) guild to use this command\n**Note:** only members in that guild can use the command to claim rewards`);
  return await message.channel.send(NoRole);
}
  } catch (err) { //catch all errors
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
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});