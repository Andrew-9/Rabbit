const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const fs = require('fs');
const https = require('https');

module.exports = {
 name: "shopsettings",
 aliases: [""],
 category: "Economy",
 description: "Change settings of a users shop and even delete it if the user's breaking rules",
 usage: "shopsettings <user>",
 run: async (client, message, args) => {
  try {
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
    let shopowner = await message.mentions.members.first() || message.author;
    const prefix = guildPrefix.get(message.guild.id);
    if (message.author === shopowner) {
    let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){ 
    if(result == 0) { 
    let register ="INSERT INTO economy (userId, balance, bank, username, sales_balance, bal_color, HasShop, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0', '0', '0', '1');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setAuthor(message.author.tag)
    .setDescription("You don't have an account.\n**I opened one for you.**\nYou will have to run the command again")
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoAccount);
    } else {
    let b = sql.query("SELECT HasShop, bal_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    let UserHasShop = result[0].HasShop
    if (UserHasShop == 0) {
    let NoTAOwner = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`YOU'RE NOT A SHOP OWNER`)
    .setDescription(`
    ${message.author.username} you don't have a shop. please open a shop
    or use \`${prefix}shop @user\` to view other members shop
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) {
    (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER YOUR SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, balance, bank, sales_balance, bal_color, HasShop, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, balance, bank, sales_balance, bal_color, HasShop, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + message.author.id + "', '" + message.author.username + "', '0', '0', '0', '#008eff', '0', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to change the **logo** and **color***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + message.author.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to update the **logo** and **color***`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter your logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + message.author.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + message.author.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for your shop embed\n*Run \`${prefix}shop\` to see your embed **color***`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + message.author.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for your shop\n*Run \`${prefix}shop\` to see your shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
            case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down this shop?\nNote that you'll loose some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(6001)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + message.author.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down your \`FOOD STORE\`** \n*You can open another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\n*Run \`${prefix}shop\` to see your shop*`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
   } else if (UserHasShop == 2) { 
    (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER YOUR SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to change the **logo** and **color***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + message.author.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to update the **logo** and **color***`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter your logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + message.author.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + message.author.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for your shop embed\n*Run \`${prefix}shop\` to see your embed **color***`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + message.author.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for your shop\n*Run \`${prefix}shop\` to see your shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
              case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down this shop?\nNote that you'll loose some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(6001)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + message.author.id + '';
                sql.query(updateshop);
                 let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down your \`CYBER CAFE\`** \n*You can open another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\n*Run \`${prefix}shop\` to see your shop*`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
   } else if (UserHasShop == 3) { 
    (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER YOUR SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to change the **logo** and **color***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + message.author.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to update the **logo** and **color***`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter your logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + message.author.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + message.author.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for your shop embed\n*Run \`${prefix}shop\` to see your embed **color***`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + message.author.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for your shop\n*Run \`${prefix}shop\` to see your shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
            case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down this shop?\nNote that you'll loose some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(6001)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + message.author.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down your \`GENERAL STORE\`** \n*You can open another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\n*Run \`${prefix}shop\` to see your shop*`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
   } else if (UserHasShop == 4) { 
    (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER YOUR SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to change the **logo** and **color***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + message.author.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to **${TheShopName}**\n*Run \`${prefix}addp -> shop settings\` to update the **logo** and **color***`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter your logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + message.author.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed your shop \`LOGO IMAGE\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color*`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + message.author.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for your shop embed\n*Run \`${prefix}shop\` to see your embed **color***`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + message.author.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for your shop\n*Run \`${prefix}shop\` to see your shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
              case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down this shop?\nNote that you'll loose some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(6001)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + message.author.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down your \`RESTAURANT\`** \n*You can open another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\n*Run \`${prefix}shop\` to see your shop*`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
   }
  })
 }
})
} else if (shopowner) {
    if (message.member.roles.cache.some(role => role.name === 'Market Manager')) {
    let shopowner = message.mentions.users.first();
    if(shopowner.bot) {
    const NoShopForBots = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> NO SHOP FOR BOTS!")
    .setDescription(`*It's a **bot** and bots can't have shop*`);
    return message.lineReply(NoShopForBots);
    }
    let check = sql.query("SELECT HasShop FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields) { //check if user has a shop
    let UserHasShop = result[0].HasShop
    if (UserHasShop == 0) { //if no shop then 
    let NoTAOwner = new Discord.MessageEmbed()
    .setColor('#fb005f')
    .setThumbnail(shopowner.displayAvatarURL({ dynamic:true }))
    .setTitle(`${shopowner.username.toUpperCase()} IS NOT A SHOP OWNER`)
    .setDescription(`
    ${shopowner.username} doesn't have a shop.
    You can ask them to get a shop or something.
    `);
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) { //if shop value in database is == 1 then give use the items
    (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + shopowner.id + "', '" + shopowner.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to change the **logo** and **color**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + shopowner.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to update the **logo** and **color**`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter the logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + shopowner.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nPlease do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for ${shopowner.username} shop embed\nRun \`${prefix}shop <user>\` to see the embed **color**`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for **${shopowner.username}** shop\n*Run \`${prefix}shop <user>\` to see the shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
            case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down **${shopowner.username}** shop?\nNote that you'll loose a lot some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(65601)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + shopowner.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down **${shopowner.username}** \`FOOD STORE\`** \n*You can ask them to another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\nRun \`${prefix}shop <user>\` to see their shop`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
    //Users shop code ends here
    } else if (UserHasShop == 2) { 
      (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + shopowner.id + "', '" + shopowner.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to change the **logo** and **color**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + shopowner.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to update the **logo** and **color**`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter the logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + shopowner.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nPlease do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for ${shopowner.username} shop embed\nRun \`${prefix}shop <user>\` to see the embed **color**`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for **${shopowner.username}** shop\n*Run \`${prefix}shop <user>\` to see the shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
            case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down **${shopowner.username}** shop?\nNote that you'll loose a lot some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(65601)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + shopowner.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down **${shopowner.username}** \`CYBER CAFE\`** \n*You can ask them to another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\nRun \`${prefix}shop <user>\` to see their shop`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
    } else if (UserHasShop == 3) { 
      (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + shopowner.id + "', '" + shopowner.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to change the **logo** and **color**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + shopowner.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to update the **logo** and **color**`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter the logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + shopowner.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nPlease do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for ${shopowner.username} shop embed\nRun \`${prefix}shop <user>\` to see the embed **color**`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for **${shopowner.username}** shop\n*Run \`${prefix}shop <user>\` to see the shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
            case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down **${shopowner.username}** shop?\nNote that you'll loose a lot some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(65601)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + shopowner.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down **${shopowner.username}** \`GENERAL STORE\`** \n*You can ask them to another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\nRun \`${prefix}shop <user>\` to see their shop`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
    } else if (UserHasShop == 4) { 
     (async () => {
    /////////// Code By Kotlin#0427
    function shopsettings(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Shop Settings\` - *Change the settings of your shop*
    **2** \`Delete Shop\` - *Close down the shop to open another one*
    `)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
            case "1":
                let rembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("So tell me what you want to do?")
                .setDescription(`
                **1.** \`Edit Shop Name\` - *Changes the title of shop embed*
                **2.** \`Edit Thumbnail\` - *Changes the logo of the shop*
                **3.** \`Change Color\` - *Changes the color of the shop embed*
                **4.** \`Add Small Text\` - *Add a little slogan in the description for ads*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE SHOP NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name that corresponds with **discord** terms of service\n Also **note** shop name cannot have any special character such as \`# % $ @\` **etc**`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let TheShopName = collected.first().content.toLowerCase();
                         function ValidateShopName() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(TheShopName);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> SHOP NAME CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The shop name must not contain special characters understand.`)
                        message.channel.send(Nopermission8);
                        } else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let Shopthumbnail = "https://media.discordapp.net/attachments/711910361133219903/884438310783692830/food.png?width=611&height=612";
                        let addnewpro ="INSERT INTO economy (userId, username, shop_title, shop_thumbnail, shopowner_color, shop_text) VALUES ('" + shopowner.id + "', '" + shopowner.username + "', '" + TheShopName + "', '"+ Shopthumbnail + "', '#f8d717', '$10 dollars for each coffee');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> SHOP NAME CHANGED`)
                        .setDescription(`**Successfully changed \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to change the **logo** and **color**`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        let updateshopname = "UPDATE economy SET shop_title = '" + TheShopName + "' WHERE userId = '" + shopowner.id + "'";
                        sql.query(updateshopname)
                        const palready = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP NAME UPDATED!")
                        .setDescription(`**Successfully updated \`SHOP NAME\`** to ${TheShopName}\nRun \`${prefix}addp -> shop settings\` to update the **logo** and **color**`)
                        message.channel.send(palready);
                        return isValid;
                        }
                        });
                        });
                        })
                        }
                        }  
                        ValidateShopName();
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        const enterShopBg = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":park: ENTER SHOP LOGO IMAGE!")
                        .setDescription(`*Please enter the logo **Image** or **Url***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.lineReply(enterShopBg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                        function attachIsImage(msgAttach) {
                            url = msgAttach.url;
                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                        }
                        if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage)){
                            function saveImageToDisk(url, path) {
                            var fullUrl = url
                            var localPath = fs.createWriteStream(path)
                            var request = https.get(fullUrl, function (response) {
                                response.pipe(localPath)
                            })
                            }
                            saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
                            let sqlrankbg = "UPDATE `economy` SET `shop_thumbnail` = '" + url + "' WHERE userId = " + shopowner.id;
                            var query = sql.query(sqlrankbg, function(err, result) {
                            const shoplosuccess = new Discord.MessageEmbed()
                            .setColor("#46c300")
                            .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                            .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                            .setTimestamp();
                            message.channel.send(shoplosuccess);  
                            });
                        }
                        else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as logo**")
                        }
                        }
                        else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                        let sqlrankurlbg = "UPDATE `economy` SET `shop_thumbnail` = '" + collected.first().content + "' WHERE userId = " + message.author.id;
                        var query = sql.query(sqlrankurlbg, function(err, result) {
                        const Rankbgsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle("<:checkvector:869193650184269834> SHOP LOGO IMAGE SUCCESS!")
                        .setDescription(`**Successfully changed** ${shopowner.username} shop **\`LOGO IMAGE\`**\nPlease do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> shop settings.\` to change the shop color`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Rankbgsuccess);
                        });
                        }
                        }).catch(error=>{
                            console.log(error)
                            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "3":
                        const enterembedC = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle(":art: ENTER SHOP COLOR!")
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
                        let sqlcolor = "UPDATE economy SET shopowner_color = '" + content + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlcolor);
                        let b = sql.query("SELECT shopowner_color FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor(result[0].shopowner_color)
                        .setTitle("<:checkvector:869193650184269834> SHOP COLOR SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP COLOR\`** for ${shopowner.username} shop embed\nRun \`${prefix}shop <user>\` to see the embed **color**`)
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
                     break;
                     case "4":
                        const entershopdec = new Discord.MessageEmbed()
                        .setColor("#0082ea")
                        .setTitle("🔖 ENTER SHOP SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with **discord** terms.\nFor example: you can use **come on down for cheap bread** or something like that.`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(entershopdec).then(msg =>{
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let slogancontent = collected.first().content;
                        let sqlslogan = "UPDATE economy SET shop_text = '" + slogancontent + "' WHERE userId = " + shopowner.id;
                        sql.query(sqlslogan);
                        let b = sql.query("SELECT shop_text FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields){
                        const embedcolor = new Discord.MessageEmbed()
                        .setColor("#00ffb7")
                        .setTitle("<:checkvector:869193650184269834> SHOP SLOGAN SUCCESS!")
                        .setDescription(`**Successfully updated \`SHOP SLOGAN\`** for **${shopowner.username}** shop\n*Run \`${prefix}shop <user>\` to see the shop **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(embedcolor);
                        });
                        });
                        });
                     break;
                  }
                });
               });
            break;
            case "2":
                const closeshop = new Discord.MessageEmbed()
                .setColor("#0082ea")
                .setTitle("ARE YOU SURE ABOUT THIS?")
                .setDescription(`Are you sure you want to close down **${shopowner.username}** shop?\nNote that you'll loose a lot some money I can't say how much`)
                message.channel.send(closeshop).then(msg =>{
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                if (collected.first().content.includes("yes")) {
                var closedDown = Math.floor(Math.random() *(65601)) + 0;
                let buytheproduct = 'UPDATE economy SET balance = balance-' + closedDown + ' WHERE userId = ' + message.author.id + '';
                sql.query(buytheproduct);
                let updateshop = 'UPDATE economy SET HasShop = ' + 0 + ' WHERE userId = ' + shopowner.id + '';
                sql.query(updateshop);
                let deleteshop = 'DELETE FROM shop WHERE userId = ' + message.author.id + '';
                sql.query(deleteshop);
                const deleteds = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> SHOP CLOSED SUCCESS!")
                .setDescription(`**Successfully closed down **${shopowner.username}** \`RESTAURANT\`** \n*You can ask them to another shop with \`${prefix}getshop\`*`)
                .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                .setTimestamp();
                message.channel.send(deleteds);
                } else if (collected.first().content.includes("no")) {
                const nodelete = new Discord.MessageEmbed()
                .setColor("#00ffb7")
                .setTitle("<:checkvector:869193650184269834> CANCELED PROCESS!")
                .setDescription(`**Successfully canceled \`SHOP CLOSE DOWN\`** process\nRun \`${prefix}shop <user>\` to see their shop`)
                message.channel.send(nodelete);
                }
                });
                });
            break;
            default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
            break;
        }
        }).catch(error=>{
        console.log(error)
        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
    })
    })
    }
    shopsettings();  
    })(); 
   }
  });
  } else {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MARKET MANAGER!")
    .setDescription(`You need to create a **role** called \`Market Manager\` to use this command.\n**Note:** only members in that can **change** settings of other members shop and even delete it if that member is breaking rules or being a bad boy I think... **(>‿◠)**`);
    return await message.channel.send(NoRole);
}
 }
 })();
 }
});
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