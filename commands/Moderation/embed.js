const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
    name: "embed",
    aliases: [""],
    description: "Send a custom built embed",
    category: "Moderation",
    usage: "embed",
    run: async (client, message, args) => {
        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                client.embed.ensure(message.guild.id, {
                "description": "",
                "title": "",
                "footer": ""
                })
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle(":pushpin: ENTER EMBED CHANNEL!")
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                let channel = collected.first().mentions.channels.first();
                if (!channel) {
                return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
                } 
                let sql112 = "UPDATE guilds SET embed_channel = '" + channel + "' WHERE guildId = " + message.guild.id;
                sql.query(sql112);
                const embedTitle = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("🔖 ENTER EMBED TITLE!")
                message.channel.send(embedTitle).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                let embedtitle = collected.first().content;
                client.embed.set(message.guild.id, embedtitle, `title`); 
                }).catch(error=>{
                console.log(error)
                return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                })
                .then((something) => {
                const embedcolor = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle(":art: ENTER EMBED COLOR!")
                .setDescription("Please enter the type of color you want.\nColor must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)")
                message.channel.send(embedcolor).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                    let content = collected.first().content;
                    if(!content.startsWith("#") && content.length !== 7){
                        message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                    }
                    else {
                        if(isValidColor(content)){
                            color = content;
                            let sql113 = "UPDATE guilds SET embed_color = '" + content + "' WHERE guildId = " + message.guild.id;
                            sql.query(sql113);
                        }
                        else{
                          message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE USING `#00f7ff`!**");
                        }
                    }
                    function isValidColor(str) {
                        return str.match(/^#[a-f0-9]{6}$/i) !== null;
                    }
                }).catch(error=>{
                console.log(error)
                return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                })
                .then((something) => {
               const embeddec = new Discord.MessageEmbed()
               .setColor("#0082ea")
               .setTitle("🔖 ENTER EMBED DECRIPTION!")
               message.channel.send(embeddec).then(msg =>{
               msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
               let decription = collected.first().content;
               client.embed.set(message.guild.id, decription, `description`); 
               }).catch(error=>{
               console.log(error)
               return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
               })
               .then((something) => {
               const embeddec = new Discord.MessageEmbed()
               .setColor("#0082ea")
               .setTitle("🔖 ENTER EMBED FOOTER!")
                message.channel.send(embeddec).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                let embedfooter = collected.first().content;
                client.embed.set(message.guild.id, embedfooter, `footer`); 
                const success = new Discord.MessageEmbed()
                .setColor("#00ffcf")
                .setTitle("<:checkvector:869193650184269834> EMBED CREATED SUCCESS!")
                .setDescription(`Your embed was successfully created\nGo ahead and check the channel now.`)
                message.channel.send(success);
                }).catch(error=>{
                console.log(error)
                return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                })
                .then((something) => {
                let b = sql.query("SELECT embed_color FROM guilds WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                let EmbedColor = result[0].embed_color;
                const done = new Discord.MessageEmbed()
                .setColor(EmbedColor)
                .setTitle(client.embed.get(message.guild.id, "title").toUpperCase())
                .setDescription(client.embed.get(message.guild.id, "description"))
                .setFooter(client.embed.get(message.guild.id, "footer"))
                .setTimestamp();
                channel.send(done);
                });
                })
                })
                })
                })
                })
                })
                })
                })
                });
                })
                }
                else {
                const Nopermission8 = new Discord.MessageEmbed()
                .setColor("#f04949")
                .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
                .setDescription(`*You don't have permission to use this command!*`)
                .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                .setTimestamp();
                return await message.channel.send(Nopermission8);
                }
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