const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
    name: "set-color",
    aliases: ["setcolor", "sc"],
    description: "Set a color for the your economical embed details",
    category: "Economy",
    usage: "set-color",
    run: async (client, message, args) => {
        try {
        const prefix = guildPrefix.get(message.guild.id);
        let con = sql.query("SELECT `enabled` FROM `economy_ward` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
        let isEnabled = result[0].enabled
        if (isEnabled == 0) {
        const EcoNotEnabled = new Discord.MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:xvector:869193619318382602> ECONOMY SYSTEM NOT ENABLED")
        .setDescription(`*The economical system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        return message.lineReply(EcoNotEnabled); 
        } else if (isEnabled == 1) {
        (async () => {
        const enterembedC = new Discord.MessageEmbed()
        .setColor("#0082ea")
        .setTitle(":art: ENTER EMBED DETAILS COLOR!")
        .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ff0070)*")
        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        message.channel.send(enterembedC).then(msg =>{
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
        let content = collected.first().content;
        if(!content.startsWith("#") && content.length !== 7){
         message.lineReply("<:xvector:869193619318382602> **| WRONG COLOR CODE**")
        } else {
        if(isValidColor(content)){
        let sqlcolor = "UPDATE economy SET bal_color = '" + content + "' WHERE userId = " + message.author.id;
        sql.query(sqlcolor);
        let b = sql.query("SELECT bal_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
        const embedcolor = new Discord.MessageEmbed()
        .setColor(result[0].bal_color)
        .setTitle("<:checkvector:869193650184269834> EMBED COLOR SUCCESS!")
        .setDescription(`**Successfully updated \`DETAILS COLOR\`** for your economical embed\n*Run \`${prefix}balance\` to see your embed **color***`)
        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        message.channel.send(embedcolor);
        });
        } 
        }
        function isValidColor(str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
        }
        });
        });
        })(); 
        }
        })
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
StateManager.on('PrefixFetched', (guildId, prefix) => {
    guildPrefix.set(guildId, prefix);
});