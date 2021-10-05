const Discord = require("discord.js");
const config = require("../../config");
const { Permissions } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "addproducts",
 aliases: ["addp"],
 category: "Economy",
 description: "Add products to the global market list",
 usage: "addproducts",
 run: async (client, message, args) => {
  try {
    if (message.member.roles.cache.some(role => role.name === 'Market Manager')) {
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
    const prefix = guildPrefix.get(message.guild.id);
    //let b = sql.query("SELECT manager FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
    // let isManager = result[0].manager
    // if (isManager == 0) {
    // const NotAManager = new Discord.MessageEmbed()
    // .setColor("#e63064")
    // .setTitle("YOU'RE NOT A MARKET MANAGER")
    // .setDescription(`**${message.author.username}** you're not a market **manager** so you can't add products.\nTo go`)
    // message.lineReply(NotAManager);
    // } else if (isManager == 1) {
    (async () => {
    /////////// Code By Kotlin#0427
    function addproducts(){
    let rembed = new Discord.MessageEmbed()
    .setColor(config.black)
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Add Products\` - *Add a new product to the list*
    **2.** \`Delete Products\` - *Delete any product to the list*
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
                **1.** \`Add New Product\` - *Add a new product to the global market*
                **2.** \`Edit Any Product\` - *Edit any product in the global market*
                `)
                .setThumbnail(config.avatarUrl)
                .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
                message.reply(rembed).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                   switch(collected.first().content.toString()){
                      case "1":
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER PRODUCT NAME!")
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`Please only enter name of products that uses the default discord emoji\n Also **note** that you cannot add **2** of the same products.`)
                        .setTimestamp();
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let content = collected.first().content.toLowerCase();
                        if(content.startsWith("#") && content.length >= 20){
                           message.lineReply("<:xvector:869193619318382602> **| PRODUCT LENGTH IS TOO LONG!**")
                        }
                        else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let b = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM global_market WHERE `product_name` = ?;", content, function (err, result, fields){
                        if (err) console.log(err);
                        if (Object.keys(result).length === 0) {
                        let addnewpro ="INSERT INTO global_market (userId, product_author, product_name, product_price, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.tag + "', '" + content + "', '0', 'per what?', '❔', '⭐');";
                        sql.query(addnewpro)
                        const Paddsuccess = new Discord.MessageEmbed()
                        .setColor("#46c300")
                        .setTitle(`<:checkvector:869193650184269834> PRODUCT ADDED SUCCESSFULLY`)
                        .setDescription(`**Successfully added \`${content}\`** to the global market\n*Run \`${prefix}addp -> add products\` to change the **price, emoji** and **slogan***`)
                        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                        .setTimestamp();
                        message.channel.send(Paddsuccess);  
                        } else {
                        const palready = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> PRODUCT ALREADY EXSITS!")
                        .setDescription(`The product **${content}** is already in the global market.`)
                        message.channel.send(palready);
                        }
                        });
                        });
                        })
                        }  
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                     break;
                     case "2":
                        let Psearch = new Discord.MessageEmbed()
                        .setTitle(`WHAT PRODUCT DO YOU WANT TO EDIT?`)
                        .setColor("RANDOM")
                        .setDescription(`Tell me the product you want to change\nExample: you can search for - \`coffee\` or \`cocktail\` \nTo see the list of products try \`${prefix}globalmarket\` \n**Note:** You can only edit product that are in the **global market.**`)
                        message.channel.send(Psearch).then(msg=>{
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let searchproduct = collected.first().content.toLowerCase();
                        let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", searchproduct, function (err, result, fields) {
                        if(result == 0) { 
                        const NoResults = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("NO RESULTS FOUND!")
                        .setDescription(`
                        No results found for the **${searchproduct}**
                        Check the global market list by using \`${prefix}globalmarket\`
                        `)
                        message.channel.send(NoResults);
                        } else {
                        (async () => {
                        /////////// Code By Kotlin#0427
                        let productName = result[0].product_name
                        let productText = result[0].product_text
                        let productEmoji = result[0].product_emoji
                        let productPrice = result[0].product_price
                        let productAuthor = result[0].product_author
                        let ProductRatings = result[0].product_ratings
                        let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
                        let Pricebutton = new MessageButton().setStyle("blurple").setID("EditPrice").setLabel("💸 Edit Price")
                        let Sloganbutton = new MessageButton().setStyle("blurple").setID("EditSlogan").setLabel("🔖 Edit Slogan")
                        let Ratingsbutton = new MessageButton().setStyle("blurple").setID("EditRatings").setLabel("⭐ Edit Ratings")
                        let Emojibutton = new MessageButton().setStyle("blurple").setID("EditEmoji").setLabel("❔ Edit Emoji")
                        var buttonarray = [Pricebutton, Sloganbutton, Ratingsbutton, Emojibutton]
                        function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
                                
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
                        .setColor("#ff7900")
                        .setDescription(`
                        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. product by **${productAuthor}**
                        `)
                        let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
                        const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
                        collector.on("collect", (b) => {
                        /////////// Code By Kotlin#0427
                        b.reply.defer()
                        if(b.id == "EditPrice"){
                        showproduct.delete({ embed: productItem, buttons: buttonarray })
                        function editPrice(){
                        let PPrice = new Discord.MessageEmbed()
                        .setColor("#0096ff")
                        .setTitle(":money_with_wings: ENTER THE PRODUCT PRICE")
                        .setDescription("Please understand that this is a wholesale product\n So all price **must** be above **$10** dollars for each items");
                        message.lineReply(PPrice).then(msg=>{
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let productPrice = collected.first().content.toLowerCase();
                        function ValidatePrice() {
                        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
                        var regex = /^[A-Za-z0-9 ]+$/
                        //Validate TextBox value against the Regex.
                        var isValid = regex.test(productPrice);
                        if (!isValid) {
                        const Nopermission8 = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("<:xvector:869193619318382602> PRODUCT PRICE CONTAIN SPECIAL CHARACTERS!")
                        .setDescription(`The product price must not contain special characters.`)
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
                        let updatep = "UPDATE global_market SET product_price = '" + productPrice + "' WHERE product_name = '" + searchproduct + "'";
                        sql.query(updatep);
                        let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", searchproduct, function (err, result, fields) {
                        if(result == 0) { 
                        const NoResults = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("NO RESULTS FOUND!")
                        .setDescription(`
                        No results found for the **${searchproduct}**
                        Check the global market list by using \`${prefix}globalmarket\`
                        `)
                        message.channel.send(NoResults);
                        } else {
                        (async () => {
                        let productName = result[0].product_name
                        let productText = result[0].product_text
                        let productEmoji = result[0].product_emoji
                        let productPrice = result[0].product_price
                        let productAuthor = result[0].product_author
                        let ProductRatings = result[0].product_ratings
                        let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
                        let Pricebutton = new MessageButton().setStyle("blurple").setID("EditPrice").setLabel("💸 Change Price")
                        let Leavebutton = new MessageButton().setStyle("red").setID("leaveMarket").setLabel("🎲 Leave Market")
                        var buttonarray = [Pricebutton, Leavebutton]
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`PRODUCT PRICE SUCCESSFULLY CHANGED`)
                        .setColor("#00ffbf")
                        .setDescription(`
                        > The product **price** was successfully updated.
                        > You can go ahead and change the **slogan**
                        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
                        `)
                        let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
                        const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
                        collector.on("collect", (b) => {
                        /////////// Code By Kotlin#0427
                        b.reply.defer()
                        if(b.id == "EditPrice"){
                        return editPrice();
                        } else if(b.id == "leaveMarket"){
                        let Leftmarket = new MessageButton().setDisabled().setStyle("gray").setID("leaveMarket").setLabel("✔ Left the Market")
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`LEFT THE GLOBAL MARKET`)
                        .setColor("#717171")
                        .setDescription(`
                        > You can come back anytime to add a product
                        > If you like this rabbit consider **voting** for us
                        > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
                        `)
                        showproduct.edit({ embed: productItem, buttons: Leftmarket });
                        }
                        })
                        })(); 
                        }
                        }); 
                        });
                        });
                        }
                        return isValid;
                        }
                        ValidatePrice();
                        })
                        })
                        }
                        editPrice();
                        } else if(b.id == "EditSlogan"){
                        showproduct.delete({ embed: productItem, buttons: buttonarray })
                        function EditSlogan(){
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE PRODUCT SLOGAN!")
                        .setDescription(`Please only enter **slogan** that corresponds with the product.\nFor example: you can use **per cup** or **per glass**`);
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let Slogancontent = collected.first().content.toLowerCase();
                        if(Slogancontent.startsWith("#") && Slogancontent.length >= 20){
                           message.lineReply("<:xvector:869193619318382602> **| PRODUCT SLOGAN IS TOO LONG!**")
                        }
                        else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let updatep = "UPDATE global_market SET product_text = '" + Slogancontent + "' WHERE product_name = '" + searchproduct + "'";
                        sql.query(updatep);
                        let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", searchproduct, function (err, result, fields) {
                        if(result == 0) { 
                        const NoResults = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("NO RESULTS FOUND!")
                        .setDescription(`
                        No results found for the **${searchproduct}**
                        Check the global market list by using \`${prefix}globalmarket\`
                        `)
                        message.channel.send(NoResults);
                        } else {
                        (async () => {
                        let productName = result[0].product_name
                        let productText = result[0].product_text
                        let productEmoji = result[0].product_emoji
                        let productPrice = result[0].product_price
                        let productAuthor = result[0].product_author
                        let ProductRatings = result[0].product_ratings
                        let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
                        let Sloganbutton = new MessageButton().setStyle("blurple").setID("EditSlogan").setLabel("🔖 Change Slogan")
                        let Leavebutton = new MessageButton().setStyle("red").setID("leaveMarket").setLabel("🎲 Leave Market")
                        var buttonarray = [Sloganbutton, Leavebutton]
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`PRODUCT SLOGAN SUCCESSFULLY CHANGED`)
                        .setColor("#00ffbf")
                        .setDescription(`
                        > The product **slogan** was successfully updated.
                        > You can go ahead and change the **ratings**
                        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
                        `)
                        let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
                        const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
                        collector.on("collect", (b) => {
                        /////////// Code By Kotlin#0427
                        b.reply.defer()
                        if(b.id == "EditSlogan"){
                        return EditSlogan();
                        } else if(b.id == "leaveMarket"){
                        let Leftmarket = new MessageButton().setDisabled().setStyle("gray").setID("leaveMarket").setLabel("✔ Left the Market")
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`LEFT THE GLOBAL MARKET`)
                        .setColor("#717171")
                        .setDescription(`
                        > You can come back anytime to add a product
                        > If you like this rabbit consider **voting** for us
                        > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
                        `)
                        showproduct.edit({ embed: productItem, buttons: Leftmarket });
                        }
                        })
                        })(); 
                        }
                        });
                        });
                        })
                        }  
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                        }
                        EditSlogan();
                        } else if(b.id == "EditRatings"){
                        showproduct.delete({ embed: productItem, buttons: buttonarray })
                        function EditEditRatings(){
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE STAR AMOUNT!")
                        .setDescription(`Please only enter ⭐ because it corresponds with all product.\nFor example: you can use :star: :star: :star: :star: :star: only`);
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let Ratingcontent = collected.first().content.toLowerCase();
                        if(!Ratingcontent.startsWith("⭐") && Ratingcontent.length > 5){
                           message.lineReply("<:xvector:869193619318382602> **| PRODUCT STARTS SHOULD BE ONLY 5**")
                        }
                        else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let updatep = "UPDATE global_market SET product_ratings = '" + Ratingcontent + "' WHERE product_name = '" + searchproduct + "'";
                        sql.query(updatep);
                        let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", searchproduct, function (err, result, fields) {
                        if(result == 0) { 
                        const NoResults = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("NO RESULTS FOUND!")
                        .setDescription(`
                        No results found for the **${searchproduct}**
                        Check the global market list by using \`${prefix}globalmarket\`
                        `)
                        message.channel.send(NoResults);
                        } else {
                        (async () => {
                        let productName = result[0].product_name
                        let productText = result[0].product_text
                        let productEmoji = result[0].product_emoji
                        let productPrice = result[0].product_price
                        let productAuthor = result[0].product_author
                        let ProductRatings = result[0].product_ratings
                        let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
                        let Sloganbutton = new MessageButton().setStyle("blurple").setID("EditRatings").setLabel("⭐ Change Ratings")
                        let Leavebutton = new MessageButton().setStyle("red").setID("leaveMarket").setLabel("🎲 Leave Market")
                        var buttonarray = [Sloganbutton, Leavebutton]
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`PRODUCT RATINGS SUCCESSFULLY CHANGED`)
                        .setColor("#00ffbf")
                        .setDescription(`
                        > The product **ratings** was successfully updated.
                        > You can go ahead and change the **emoji**
                        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
                        `)
                        let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
                        const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
                        collector.on("collect", (b) => {
                        /////////// Code By Kotlin#0427
                        b.reply.defer()
                        if(b.id == "EditRatings"){
                        return EditEditRatings();
                        } else if(b.id == "leaveMarket"){
                        let Leftmarket = new MessageButton().setDisabled().setStyle("gray").setID("leaveMarket").setLabel("✔ Left the Market")
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`LEFT THE GLOBAL MARKET`)
                        .setColor("#717171")
                        .setDescription(`
                        > You can come back anytime to add a product
                        > If you like this rabbit consider **voting** for us
                        > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
                        `)
                        showproduct.edit({ embed: productItem, buttons: Leftmarket });
                        }
                        })
                        })(); 
                        }
                        });
                        });
                        })
                        }  
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                        }
                        EditEditRatings();
                        } else if(b.id == "EditEmoji"){
                        showproduct.delete({ embed: productItem, buttons: buttonarray })
                        function EditEmoji(){
                        const enterRbg = new Discord.MessageEmbed()
                        .setColor("#00f7ff")
                        .setTitle("🔖 ENTER THE EMOJI LOGO!")
                        .setDescription(`Please only enter default discord emojis else it will not work\n**Note** that emojis for products that are not discord default emojis will not work.`);
                        message.lineReply(enterRbg).then(msg => {
                        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        let Emojicontent = collected.first().content.toLowerCase();
                        if(Emojicontent.length > 2){
                        message.lineReply("<:xvector:869193619318382602> **| PRODUCT EMOJI CAN ONLY BE ONE**")
                        }
                        else {
                        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                        if (error) console.log(error);
                        const logsetup = results[0].res;
                        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        if (!log) return;
                        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                        message.guild.fetchAuditLogs().then((logs) => { 	
                        let updatep = "UPDATE global_market SET product_emoji = '" + Emojicontent + "' WHERE product_name = '" + searchproduct + "'";
                        sql.query(updatep);
                        let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", searchproduct, function (err, result, fields) {
                        if(result == 0) { 
                        const NoResults = new Discord.MessageEmbed()
                        .setColor("#f04949")
                        .setTitle("NO RESULTS FOUND!")
                        .setDescription(`
                        No results found for the **${searchproduct}**
                        Check the global market list by using \`${prefix}globalmarket\`
                        `)
                        message.channel.send(NoResults);
                        } else {
                        (async () => {
                        let productName = result[0].product_name
                        let productText = result[0].product_text
                        let productEmoji = result[0].product_emoji
                        let productPrice = result[0].product_price
                        let productAuthor = result[0].product_author
                        let ProductRatings = result[0].product_ratings
                        let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
                        let Sloganbutton = new MessageButton().setStyle("blurple").setID("EditEmoji").setLabel("❔ Change Emoji")
                        let Leavebutton = new MessageButton().setStyle("red").setID("leaveMarket").setLabel("🎲 Leave Market")
                        var buttonarray = [Sloganbutton, Leavebutton]
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`PRODUCT EMOJI SUCCESSFULLY CHANGED`)
                        .setColor("#00ffbf")
                        .setDescription(`
                        > The product **emoji** was successfully updated.
                        > You can go ahead and change **anything** else
                        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
                        `)
                        let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
                        const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
                        collector.on("collect", (b) => {
                        /////////// Code By Kotlin#0427
                        b.reply.defer()
                        if(b.id == "EditEmoji"){
                        return EditEmoji();
                        } else if(b.id == "leaveMarket"){
                        let Leftmarket = new MessageButton().setDisabled().setStyle("gray").setID("leaveMarket").setLabel("✔ Left the Market")
                        let productItem = new Discord.MessageEmbed()
                        .setTitle(`LEFT THE GLOBAL MARKET`)
                        .setColor("#717171")
                        .setDescription(`
                        > You can come back anytime to add a product
                        > If you like this rabbit consider **voting** for us
                        > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
                        `)
                        showproduct.edit({ embed: productItem, buttons: Leftmarket });
                        }
                        })
                        })(); 
                        }
                        });
                        });
                        })
                        }  
                        }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                        });
                        });
                        }
                        EditEmoji();
                        }
                        });
                        })(); 
                        }
                        });  
                        }).catch(error=>{
                        console.log(error)
                        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**")
                        })
                        })
                     break;
                  }
                });
               });
            break;
            case "2":
              function delete_product(){
              let userid = message.author.id;
              let buyitems = new Discord.MessageEmbed()
              .setTitle(`WHAT PRODUCT DO YOU WANT?`)
              .setColor("RANDOM")
              .setDescription(`Tell me the product you want to delete\nExample: you can delete - \`coffee\` or \`cocktail\` \nTo see the list of products try \`${prefix}globalmarket\` \n**Note:** You can only delete product that are in the **global market.**`)
              message.channel.send(buyitems).then(msg=>{
              msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 90000, errors: ["TIME"]}).then(collected => {
              let Deleteproduct = collected.first().content.toLowerCase();
              let p1 = sql.query("SELECT product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", Deleteproduct, function (err, result, fields) {
              if(result == 0) { 
              const NoResults = new Discord.MessageEmbed()
              .setColor("#f04949")
              .setTitle("NO RESULTS FOUND!")
              .setDescription(`
              No results found for the **${Deleteproduct}**
              You can add this **product** to the glabal market
              by applying to be a market **Manager.**
              `)
              message.channel.send(NoResults);
              } else {
              (async () => {
              let productAuthor = result[0].product_author
              let productName = result[0].product_name
              let productText = result[0].product_text
              let productEmoji = result[0].product_emoji
              let productPrice = result[0].product_price
              let ProductRatings = result[0].product_ratings
              let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
              let buybutton = new MessageButton().setStyle("blurple").setID("deleteproduct").setLabel("❌ Delete Product")
              let nextbutton = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another")
              let cancelthebutton = new MessageButton().setStyle("red").setID("cancelIt").setLabel("Cancel")
              let linkbutton = new MessageButton().setStyle("url").setLabel("Fumigram").setURL("https://fumigram.com")
              var buttonarray = [buybutton, nextbutton, cancelthebutton, linkbutton]
              function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
              let productItem = new Discord.MessageEmbed()
              .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
              .setColor("#ff1b87")
              .setDescription(`
              > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
              `)
              let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
              const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 110000});
              collector.on("collect", (b) => {
              if(b.id == "cancelIt"){
              let productItem = new Discord.MessageEmbed()
              .setColor("#ff456e")
              .setTitle(`THIS ACTION HAS BEEN CANCELLED`)
              .setDescription(`
              > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
              > The delete process has been officially **cancelled.**
              `)
              var buttonarray = new MessageButton()
              buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ Cancelled").setID("cancelled")
              showproduct.edit({ embed: productItem, buttons: buttonarray });
              } else if(b.id == "next"){
              showproduct.delete({ embed: productItem, buttons: buttonarray });
              return delete_product();
              } else if(b.id == "deleteproduct"){
              let sql4 = "DELETE FROM `global_market` WHERE product_name = '" + Deleteproduct + "' ";
              sql.query(sql4);
              let productItem = new Discord.MessageEmbed()
              .setColor("#737777")
              .setTitle(`PRODUCT DELETE SUCCESSFULLY`)
              .setDescription(`
              > The product has been successfully **deleted**
              > You can add another product with \`${prefix}addp\`
              `)
              var buttonarray = new MessageButton()
              buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ Deleted").setID("deleted")
              showproduct.edit({ embed: productItem, buttons: buttonarray });
              }
              });
              })();
              }
              });
              });
              })
              }
              delete_product();
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
    addproducts();  
   })(); 
    //}
    //})
    })();
    }
    });
    } else {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MARKET MANAGER!")
    .setDescription(`You need to create a **role** called \`Market Manager\` to use this command\n**Note:** only members in that role can add products to the **Global market.**`);
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