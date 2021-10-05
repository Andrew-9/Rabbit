const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
function toFixed(x) {
if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
      }
    }
return x;
}
module.exports = {
 name: "buyproducts",
 aliases: ["bp"],
 category: "Economy",
 description: "Buy products from global the market\nPlease not that you must not buy products\nwith diffrent quantities. just an advice.",
 usage: "buyproducts",
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
    /////////// Code By Kotlin#0427
    const prefix = guildPrefix.get(message.guild.id);
    let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
    if (Object.keys(result).length === 0) {
    let register ="INSERT INTO economy (userId, balance, bank, HasShop, username) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setAuthor(message.author.tag)
    .setDescription(`You don't have an account to buy anything\n**Fortunately I'v opened an account for you.**\nTry using \`${prefix}bal\` to view your balance`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoAccount);
    } else {
    let check = sql.query("SELECT HasShop FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    let UserHasShop = result[0].HasShop
    if (UserHasShop == 0) {
    let NoTAOwner = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`YOU'RE NOT A SHOP OWNER`)
    .setDescription(`
    ${message.author.username} you don't have a shop. so you can't buy
    wholesales products from the global market. **open a shop**
    or use \`${prefix}shop @user\` to view other members shop
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) {
    (async () => {
    /////////// Code By Kotlin#0427
    function buyitems(){
    let rembed = new Discord.MessageEmbed()
    .setTitle("CHOOSE YOUR MARKET OPTION")
    .setDescription(`
    **1.** \`From Market\` - *Buy products from global market*
    **2.** \`Trusted Agent\` - *Buy products from a trusted agent*
    `)
    .setColor("#00ffff")
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    switch(collected.first().content.toString()){
    case "1":
    let userid = message.author.id;
    function ask_which_items_to_buy(){
    let buyitems = new Discord.MessageEmbed()
    .setTitle(`WHAT PRODUCT DO YOU WANT?`)
    .setColor("RANDOM")
    .setDescription(`Tell me the product you want to buy\nExample: you can buy - \`coffee\` or \`cocktail\` \nTo see the list of products try \`${prefix}globalmarket\` \n**Note:** You can only buy product that are in the **global market.**`)
    message.channel.send(buyitems).then(msg=>{
    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 90000, errors: ["TIME"]}).then(collected => {
    let product = collected.first().content.toLowerCase();
    let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", product, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("NO RESULTS FOUND!")
    .setDescription(`
    No results found for the **${product}**
    You can add this **product** to the glabal market
    by applying to be a market **Manager.**
    `)
    message.channel.send(NoResults);
    } else {
    (async () => {
    /////////// Code By Kotlin#0427
    let productId = result[0].product_id
    let productName = result[0].product_name
    let productText = result[0].product_text
    let productEmoji = result[0].product_emoji
    let productPrice = result[0].product_price
    let productAuthor = result[0].product_author
    let ProductRatings = result[0].product_ratings
    let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
    let buybutton = new MessageButton().setStyle("green").setID("buy").setLabel("💸 Buy Product")
    let nextbutton = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another")
    let cancelbutton = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel")
    let linkbutton = new MessageButton().setStyle("url").setLabel("Fumigram").setURL("https://fumigram.com")
    var buttonarray = [buybutton, nextbutton, cancelbutton, linkbutton]
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

    let productItem = new Discord.MessageEmbed()
    .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
    .setColor("#ff7900")
    .setDescription(`
    > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
    `)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        /////////// Code By Kotlin#0427
        b.reply.defer()
        if(b.id == "buy"){
        let addproductquantity = new MessageButton().setStyle("blurple").setID("addquantity").setLabel("➕ Add Quantity")
        let choosemore = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another Product")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addproductquantity, choosemore, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`BUY THE PRODUCT ${productName.toUpperCase()}`)
        .setColor("#00ffbf")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
        > How many **quantities** do you want to order?
        > You can only order **500** quantities each time you place an order
        > But **note** you must have enough money to order such amount.
        > And also all products purchased here will be moved to your **shop**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        } else if(b.id == "next"){
        showproduct.delete({ embed: productItem, buttons: buttonarray });
        return ask_which_items_to_buy();
        } else if(b.id == "cancel"){
        let productItem = new Discord.MessageEmbed()
        .setColor("#ff456e")
        .setTitle(`CANCELLED THE ORDER FOR ${productName.toUpperCase()}`)
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
        > This order has been **cancelled.** you can place new order anytime.
        `)
        var buttonarray = new MessageButton()
        buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ Cancelled").setID("cancelled")
        showproduct.edit({ embed: productItem, buttons: buttonarray });
        }else if(b.id == "Closetransaction"){
        let productItem = new Discord.MessageEmbed()
        .setColor("#6f6f6f")
        .setTitle(`THIS TRANSACTION HAS BEEN CLOSED`)
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
        > The transaction has been officially **closed**
        > You can open a new order with \`${prefix}buyproducts\`
        > If you like this rabbit consider [voting](https://discordbotlist.com/bots/rabbit-1895) for him
        > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
        `)
        var buttonarray = new MessageButton()
        buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ CLOSED").setID("cancelled")
        showproduct.edit({ embed: productItem, buttons: buttonarray });
        }
        if(b.id == "addquantity"){
        let quantitycount = 100;
        var quantityprice = quantitycount * productPrice + 150;
        let formatedquantityprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(quantityprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
        let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You are buying **${quantitycount}** quantities of **${productName}**
        > **$150.00** has been added to your total price
        > Shipping and delivery charges applied. so then
        > Your new total would be **${formatedquantityprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        } else if(b.id == "200quantity"){
        function quantity200(){
        let quantitycount = 200;
        var totalprice = quantitycount * productPrice + 300;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$300.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return quantity200();
        } else if(b.id == "300quantity"){
        function quantity300(){
        let quantitycount = 300;
        var totalprice = quantitycount * productPrice + 600;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$600.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return quantity300();
        } else if(b.id == "400quantity"){
        function quantity400(){
        let quantitycount = 400;
        var totalprice = quantitycount * productPrice + 800;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$800.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return quantity400();
        } else if(b.id == "500quantity"){
        function quantity500(){
        let quantitycount = 500;
        var totalprice = quantitycount * productPrice + 1000;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce400").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("500confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`BUYING 500 QUANTITIES OF ${productName.toUpperCase()}?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$1,000.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return quantity500();
        } else if(b.id == "reduce100"){
        function reduce100(){
        let quantitycount = 100;
        var totalprice = quantitycount * productPrice + 150;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
        let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You are buying **${quantitycount}** quantities of **${productName}**
        > **$150.00** has been added to your total price
        > Shipping and delivery charges applied. so then
        > Your new total would be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return reduce100();
        } else if(b.id == "200quantity"){
        return quantity200();
        }
        else if(b.id == "reduce200"){
        function reduce200(){
        let quantitycount = 200;
        var totalprice = quantitycount * productPrice + 300;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$300.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return reduce200();
        } else if(b.id == "300quantity"){
        return quantity300();
        }
        else if(b.id == "reduce300"){
        function reduce300(){
        let quantitycount = 300;
        var totalprice = quantitycount * productPrice + 600;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$600.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return reduce300();
        } else if(b.id == "400quantity"){
        return quantity400();
        }
        else if(b.id == "reduce400"){
        function reduce400(){
        let quantitycount = 400;
        var totalprice = quantitycount * productPrice + 800;
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
        let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
        let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
        let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
        .setColor("#437cff")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Since you're buying **${quantitycount}** quantities of **${productName}**
        > We've added **$800.00** to your total price for shipping and delivery charges.
        > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        }
        return reduce400();
        } else if(b.id == "500quantity"){
        return quantity500();
        }
        if(b.id == "100confirmOrder"){
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
        if (error) console.log(error);
        const logsetup = results[0].res;
        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        message.guild.fetchAuditLogs().then((logs) => { 	
        let quantitycount = 100;
        var Totalquantityprice = quantitycount * productPrice + 150;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, username, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '1');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
        let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updbuyer = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
        sql.query(updbuyer);
        // let p1 = sql.query("SELECT '" + product + "' FROM warehouse WHERE userId = ?;", product, function (err, result, fields) {
        // if(result == 0) { 
        let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
        sql.query(collectproduct)
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let NewTotalBalance = result[0].balance
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Your product has been delivered to your **shop.**
        > You can check this item with \`${prefix}shop\`
        > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        const BoughtItem = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(BoughtItem);
        });
        // } else {    
        // let update100count = "UPDATE warehouse SET '" + product + "' = '" + product + "'+" + quantitycount + " WHERE userId = '" + message.author.id + "'";
        // sql.query(update100count)
        // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        // let NewTotalBalance = result[0].balance
        // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        // let productItem = new Discord.MessageEmbed()
        // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
        // .setColor("#00ff7e")
        // .setDescription(`
        // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
        // > You can check this item with \`${prefix}warehouse\`
        // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
        // `)
        // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        // const BoughtItem = new Discord.MessageEmbed()
        // .setColor('#125bf8')
        // .setAuthor(message.author.tag, message.author.avatarURL())
        // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
        // .setThumbnail(message.author.displayAvatarURL())
        // .setTimestamp()
        // .setFooter(message.guild.name, message.guild.iconURL());
        // log.send(BoughtItem);
        // });
        // }
        // })
        } else {    
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        let productItem = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
        .setColor("#ff3e3e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: cancelorder });
        }
        });
        });
        })
        } 
        //100 quantities of product confirm order
        else if(b.id == "200confirmOrder"){ //200 quantities of product confirm order
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
        if (error) console.log(error);
        const logsetup = results[0].res;
        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        message.guild.fetchAuditLogs().then((logs) => { 	
        let quantitycount = 200;
        var Totalquantityprice = quantitycount * productPrice + 300;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
        let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updbuyer1 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
        sql.query(updbuyer1);
        // let p1 = sql.query("SELECT product_name, product_text, product_emoji, product_price, product_ratings FROM warehouse WHERE userId = ?;", message.author.id, function (err, result, fields) {
        // if(result == 0) { 
        let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
        sql.query(collectproduct)
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let NewTotalBalance = result[0].balance
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Your product has been delivered to your **shop.**
        > You can check this item with \`${prefix}shop\`
        > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        const BoughtItem = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(BoughtItem);
        });
        // } else {
        // let update200count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
        // sql.query(update200count)
        // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        // let NewTotalBalance = result[0].balance
        // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        // let productItem = new Discord.MessageEmbed()
        // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
        // .setColor("#00ff7e")
        // .setDescription(`
        // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
        // > You can check this item with \`${prefix}warehouse\`
        // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
        // `)
        // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        // const BoughtItem = new Discord.MessageEmbed()
        // .setColor('#125bf8')
        // .setAuthor(message.author.tag, message.author.avatarURL())
        // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
        // .setThumbnail(message.author.displayAvatarURL())
        // .setTimestamp()
        // .setFooter(message.guild.name, message.guild.iconURL());
        // log.send(BoughtItem);
        // });
        // }
        // })
        } else {    
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        let productItem = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
        .setColor("#ff3e3e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: cancelorder });
        }
        });
        });
        })
        } 
        //200 quantities of product confirm order
        else if(b.id == "300confirmOrder"){ //300 quantities of product confirm order
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
        if (error) console.log(error);
        const logsetup = results[0].res;
        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        message.guild.fetchAuditLogs().then((logs) => { 	
        let quantitycount = 300;
        var Totalquantityprice = quantitycount * productPrice + 600;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
        let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updbuyer2 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
        sql.query(updbuyer2);
        // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
        // if(result == 0) { 
        let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
        sql.query(collectproduct)
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let NewTotalBalance = result[0].balance
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Your product has been delivered to your **shop.**
        > You can check this item with \`${prefix}shop\`
        > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        const BoughtItem = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(BoughtItem);
        });
        // } else {
        // let update300count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
        // sql.query(update300count)
        // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        // let NewTotalBalance = result[0].balance
        // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        // let productItem = new Discord.MessageEmbed()
        // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
        // .setColor("#00ff7e")
        // .setDescription(`
        // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
        // > You can check this item with \`${prefix}warehouse\`
        // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
        // `)
        // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        // const BoughtItem = new Discord.MessageEmbed()
        // .setColor('#125bf8')
        // .setAuthor(message.author.tag, message.author.avatarURL())
        // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
        // .setThumbnail(message.author.displayAvatarURL())
        // .setTimestamp()
        // .setFooter(message.guild.name, message.guild.iconURL());
        // log.send(BoughtItem);
        // });
        // }
        // })
        } else {    
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        let productItem = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
        .setColor("#ff3e3e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: cancelorder });
        }
        });
        });
        })
        } 
        //300 quantities of product confirm order
        else if(b.id == "400confirmOrder"){ //400 quantities of product confirm order
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
        if (error) console.log(error);
        const logsetup = results[0].res;
        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        message.guild.fetchAuditLogs().then((logs) => { 	
        let quantitycount = 400;
        var Totalquantityprice = quantitycount * productPrice + 800;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
        let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updbuyer4 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
        sql.query(updbuyer4);
        // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
        // if(result == 0) { 
        let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
        sql.query(collectproduct)
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let NewTotalBalance = result[0].balance
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Your product has been delivered to your **shop.**
        > You can check this item with \`${prefix}shop\`
        > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        const BoughtItem = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(BoughtItem);
        });
        // } else {
        // let update400count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
        // sql.query(update400count)
        // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        // let NewTotalBalance = result[0].balance
        // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        // let productItem = new Discord.MessageEmbed()
        // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
        // .setColor("#00ff7e")
        // .setDescription(`
        // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
        // > You can check this item with \`${prefix}warehouse\`
        // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
        // `)
        // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        // const BoughtItem = new Discord.MessageEmbed()
        // .setColor('#125bf8')
        // .setAuthor(message.author.tag, message.author.avatarURL())
        // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
        // .setThumbnail(message.author.displayAvatarURL())
        // .setTimestamp()
        // .setFooter(message.guild.name, message.guild.iconURL());
        // log.send(BoughtItem);
        // });
        // }
        // })
        } else {    
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        let productItem = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
        .setColor("#ff3e3e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: cancelorder });
        }
        });
        });
        })
        } 
        //400 quantities of product confirm order
        else if(b.id == "500confirmOrder"){ //500 quantities of product confirm order
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
        if (error) console.log(error);
        const logsetup = results[0].res;
        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        message.guild.fetchAuditLogs().then((logs) => { 	
        let quantitycount = 500;
        var Totalquantityprice = quantitycount * productPrice + 1000;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
        let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updbuyer5 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
        sql.query(updbuyer5);
        // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
        // if(result == 0) { 
        let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
        sql.query(collectproduct)
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let NewTotalBalance = result[0].balance
        let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        let productItem = new Discord.MessageEmbed()
        .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > Your product has been delivered to your **shop.**
        > You can check this item with \`${prefix}shop\`
        > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
        `)
        showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        const BoughtItem = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(BoughtItem);
        });
        // } else {
        // let update500count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
        // sql.query(update500count)
        // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        // let NewTotalBalance = result[0].balance
        // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
        // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
        // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
        // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
        // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
        // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
        // let productItem = new Discord.MessageEmbed()
        // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
        // .setColor("#00ff7e")
        // .setDescription(`
        // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
        // > You can check this item with \`${prefix}warehouse\`
        // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
        // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
        // `)
        // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
        // const BoughtItem = new Discord.MessageEmbed()
        // .setColor('#125bf8')
        // .setAuthor(message.author.tag, message.author.avatarURL())
        // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
        // .setThumbnail(message.author.displayAvatarURL())
        // .setTimestamp()
        // .setFooter(message.guild.name, message.guild.iconURL());
        // log.send(BoughtItem);
        // });
        // }
        // })
        } else {    
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
        let productItem = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
        .setColor("#ff3e3e")
        .setDescription(`
        > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
        > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        showproduct.edit({ embed: productItem, buttons: cancelorder });
        }
        });
        });
        })
        }//500 quantities of product confirm order
    })
    })(); 
    }
    })                                                    
    }).catch(error=>{
    console.log(error)
    return message.lineReply("<:thinkingface:867897965380108288> **| HMM IT SEEMS YOUR TIME RAN OUT!**")
    })
    })
    }
    ask_which_items_to_buy();
    break;
    case "2":
    //////////////////////
    let NotCompleted = new Discord.MessageEmbed()
    .setColor('#f862ff')
    .setThumbnail(config.Kotlin)
    .setTitle(`THIS FEATURE IS STILL UNDER CONSTRUCTION`)
    .setDescription(`
    **${message.author.username}** this feature is still being constructed by **Kotlin#0427**
    You can only buy your products from the global market for now.
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.author.displayAvatarURL());
    message.channel.send(NotCompleted);
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
    buyitems();
  })(); 
  } else if (UserHasShop == 2) {  ///////////////////////////////////////////////////////////////////////////////////////////////////////
    (async () => {
    /////////// Code By Kotlin#0427
    function buyitems(){
    let rembed = new Discord.MessageEmbed()
    .setTitle("CHOOSE YOUR MARKET OPTION")
    .setDescription(`
    **1.** \`From Market\` - *Buy products from global market*
    **2.** \`Trusted Agent\` - *Buy products from a trusted agent*
    `)
    .setColor("#00ffff")
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    switch(collected.first().content.toString()){
    case "1":
    let userid = message.author.id;
    function ask_which_items_to_buy(){
    let buyitems = new Discord.MessageEmbed()
    .setTitle(`WHAT PRODUCT DO YOU WANT?`)
    .setColor("RANDOM")
    .setDescription(`Tell me the product you want to buy\nExample: you can buy - \`coffee\` or \`cocktail\` \nTo see the list of products try \`${prefix}globalmarket\` \n**Note:** You can only buy product that are in the **global market.**`)
    message.channel.send(buyitems).then(msg=>{
    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 90000, errors: ["TIME"]}).then(collected => {
    let product = collected.first().content.toLowerCase();
    let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", product, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("NO RESULTS FOUND!")
    .setDescription(`
    No results found for the **${product}**
    You can add this **product** to the glabal market
    by applying to be a market **Manager.**
    `)
    message.channel.send(NoResults);
    } else {
    (async () => {
    /////////// Code By Kotlin#0427
    let productId = result[0].product_id
    let productName = result[0].product_name
    let productText = result[0].product_text
    let productEmoji = result[0].product_emoji
    let productPrice = result[0].product_price
    let productAuthor = result[0].product_author
    let ProductRatings = result[0].product_ratings
    let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
    let buybutton = new MessageButton().setStyle("green").setID("buy").setLabel("💸 Buy Product")
    let nextbutton = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another")
    let cancelbutton = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel")
    let linkbutton = new MessageButton().setStyle("url").setLabel("Fumigram").setURL("https://fumigram.com")
    var buttonarray = [buybutton, nextbutton, cancelbutton, linkbutton]
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

    let productItem = new Discord.MessageEmbed()
    .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
    .setColor("#ff7900")
    .setDescription(`
    > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
    `)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
      /////////// Code By Kotlin#0427
      b.reply.defer()
      if(b.id == "buy"){
      let addproductquantity = new MessageButton().setStyle("blurple").setID("addquantity").setLabel("➕ Add Quantity")
      let choosemore = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another Product")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addproductquantity, choosemore, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`BUY THE PRODUCT ${productName.toUpperCase()}`)
      .setColor("#00ffbf")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > How many **quantities** do you want to order?
      > You can only order **500** quantities each time you place an order
      > But **note** you must have enough money to order such amount.
      > And also all products purchased here will be moved to your **shop**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      } else if(b.id == "next"){
      showproduct.delete({ embed: productItem, buttons: buttonarray });
      return ask_which_items_to_buy();
      } else if(b.id == "cancel"){
      let productItem = new Discord.MessageEmbed()
      .setColor("#ff456e")
      .setTitle(`CANCELLED THE ORDER FOR ${productName.toUpperCase()}`)
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > This order has been **cancelled.** you can place new order anytime.
      `)
      var buttonarray = new MessageButton()
      buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ Cancelled").setID("cancelled")
      showproduct.edit({ embed: productItem, buttons: buttonarray });
      }else if(b.id == "Closetransaction"){
      let productItem = new Discord.MessageEmbed()
      .setColor("#6f6f6f")
      .setTitle(`THIS TRANSACTION HAS BEEN CLOSED`)
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > The transaction has been officially **closed**
      > You can open a new order with \`${prefix}buyproducts\`
      > If you like this rabbit consider [voting](https://discordbotlist.com/bots/rabbit-1895) for him
      > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
      `)
      var buttonarray = new MessageButton()
      buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ CLOSED").setID("cancelled")
      showproduct.edit({ embed: productItem, buttons: buttonarray });
      }
      if(b.id == "addquantity"){
      let quantitycount = 100;
      var quantityprice = quantitycount * productPrice + 150;
      let formatedquantityprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(quantityprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
      let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You are buying **${quantitycount}** quantities of **${productName}**
      > **$150.00** has been added to your total price
      > Shipping and delivery charges applied. so then
      > Your new total would be **${formatedquantityprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      } else if(b.id == "200quantity"){
      function quantity200(){
      let quantitycount = 200;
      var totalprice = quantitycount * productPrice + 300;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$300.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity200();
      } else if(b.id == "300quantity"){
      function quantity300(){
      let quantitycount = 300;
      var totalprice = quantitycount * productPrice + 600;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$600.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity300();
      } else if(b.id == "400quantity"){
      function quantity400(){
      let quantitycount = 400;
      var totalprice = quantitycount * productPrice + 800;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$800.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity400();
      } else if(b.id == "500quantity"){
      function quantity500(){
      let quantitycount = 500;
      var totalprice = quantitycount * productPrice + 1000;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce400").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("500confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`BUYING 500 QUANTITIES OF ${productName.toUpperCase()}?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$1,000.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity500();
      } else if(b.id == "reduce100"){
      function reduce100(){
      let quantitycount = 100;
      var totalprice = quantitycount * productPrice + 150;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
      let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You are buying **${quantitycount}** quantities of **${productName}**
      > **$150.00** has been added to your total price
      > Shipping and delivery charges applied. so then
      > Your new total would be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce100();
      } else if(b.id == "200quantity"){
      return quantity200();
      }
      else if(b.id == "reduce200"){
      function reduce200(){
      let quantitycount = 200;
      var totalprice = quantitycount * productPrice + 300;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$300.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce200();
      } else if(b.id == "300quantity"){
      return quantity300();
      }
      else if(b.id == "reduce300"){
      function reduce300(){
      let quantitycount = 300;
      var totalprice = quantitycount * productPrice + 600;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$600.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce300();
      } else if(b.id == "400quantity"){
      return quantity400();
      }
      else if(b.id == "reduce400"){
      function reduce400(){
      let quantitycount = 400;
      var totalprice = quantitycount * productPrice + 800;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$800.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce400();
      } else if(b.id == "500quantity"){
      return quantity500();
      }
      if(b.id == "100confirmOrder"){
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 100;
      var Totalquantityprice = quantitycount * productPrice + 150;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer6 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer6);
      // let p1 = sql.query("SELECT '" + product + "' FROM warehouse WHERE userId = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {    
      // let update100count = "UPDATE warehouse SET '" + product + "' = '" + product + "'+" + quantitycount + " WHERE userId = '" + message.author.id + "'";
      // sql.query(update100count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //100 quantities of product confirm order
      else if(b.id == "200confirmOrder"){ //200 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 200;
      var Totalquantityprice = quantitycount * productPrice + 300;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer7 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer7);
      // let p1 = sql.query("SELECT product_name, product_text, product_emoji, product_price, product_ratings FROM warehouse WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update200count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update200count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //200 quantities of product confirm order
      else if(b.id == "300confirmOrder"){ //300 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 300;
      var Totalquantityprice = quantitycount * productPrice + 600;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer8 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer8);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update300count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update300count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //300 quantities of product confirm order
      else if(b.id == "400confirmOrder"){ //400 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 400;
      var Totalquantityprice = quantitycount * productPrice + 800;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer9 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer9);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update400count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update400count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //400 quantities of product confirm order
      else if(b.id == "500confirmOrder"){ //500 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 500;
      var Totalquantityprice = quantitycount * productPrice + 1000;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer10 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer10);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update500count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update500count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      }//500 quantities of product confirm order
  })
    })(); 
    }
    })                                                    
    }).catch(error=>{
    console.log(error)
    return message.lineReply("<:thinkingface:867897965380108288> **| HMM IT SEEMS YOUR TIME RAN OUT!**")
    })
    })
    }
    ask_which_items_to_buy();
    break;
    case "2":
    //////////////////////
    let NotCompleted = new Discord.MessageEmbed()
    .setColor('#f862ff')
    .setThumbnail(config.Kotlin)
    .setTitle(`THIS FEATURE IS STILL UNDER CONSTRUCTION`)
    .setDescription(`
    **${message.author.username}** this feature is still being constructed by **Kotlin#0427**
    You can only buy your products from the global market for now.
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.author.displayAvatarURL());
    message.channel.send(NotCompleted);
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
    buyitems();
  })(); 
   } else if (UserHasShop == 3) { ///////////////////////////////////////////////////////////////////////////////////////////////////
   (async () => {
    /////////// Code By Kotlin#0427
    function buyitems(){
    let rembed = new Discord.MessageEmbed()
    .setTitle("CHOOSE YOUR MARKET OPTION")
    .setDescription(`
    **1.** \`From Market\` - *Buy products from global market*
    **2.** \`Trusted Agent\` - *Buy products from a trusted agent*
    `)
    .setColor("#00ffff")
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    switch(collected.first().content.toString()){
    case "1":
    let userid = message.author.id;
    function ask_which_items_to_buy(){
    let buyitems = new Discord.MessageEmbed()
    .setTitle(`WHAT PRODUCT DO YOU WANT?`)
    .setColor("RANDOM")
    .setDescription(`Tell me the product you want to buy\nExample: you can buy - \`coffee\` or \`cocktail\` \nTo see the list of products try \`${prefix}globalmarket\` \n**Note:** You can only buy product that are in the **global market.**`)
    message.channel.send(buyitems).then(msg=>{
    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 90000, errors: ["TIME"]}).then(collected => {
    let product = collected.first().content.toLowerCase();
    let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", product, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("NO RESULTS FOUND!")
    .setDescription(`
    No results found for the **${product}**
    You can add this **product** to the glabal market
    by applying to be a market **Manager.**
    `)
    message.channel.send(NoResults);
    } else {
    (async () => {
    /////////// Code By Kotlin#0427
    let productId = result[0].product_id
    let productName = result[0].product_name
    let productText = result[0].product_text
    let productEmoji = result[0].product_emoji
    let productPrice = result[0].product_price
    let productAuthor = result[0].product_author
    let ProductRatings = result[0].product_ratings
    let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
    let buybutton = new MessageButton().setStyle("green").setID("buy").setLabel("💸 Buy Product")
    let nextbutton = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another")
    let cancelbutton = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel")
    let linkbutton = new MessageButton().setStyle("url").setLabel("Fumigram").setURL("https://fumigram.com")
    var buttonarray = [buybutton, nextbutton, cancelbutton, linkbutton]
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

    let productItem = new Discord.MessageEmbed()
    .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
    .setColor("#ff7900")
    .setDescription(`
    > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
    `)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
      /////////// Code By Kotlin#0427
      b.reply.defer()
      if(b.id == "buy"){
      let addproductquantity = new MessageButton().setStyle("blurple").setID("addquantity").setLabel("➕ Add Quantity")
      let choosemore = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another Product")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addproductquantity, choosemore, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`BUY THE PRODUCT ${productName.toUpperCase()}`)
      .setColor("#00ffbf")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > How many **quantities** do you want to order?
      > You can only order **500** quantities each time you place an order
      > But **note** you must have enough money to order such amount.
      > And also all products purchased here will be moved to your **shop**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      } else if(b.id == "next"){
      showproduct.delete({ embed: productItem, buttons: buttonarray });
      return ask_which_items_to_buy();
      } else if(b.id == "cancel"){
      let productItem = new Discord.MessageEmbed()
      .setColor("#ff456e")
      .setTitle(`CANCELLED THE ORDER FOR ${productName.toUpperCase()}`)
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > This order has been **cancelled.** you can place new order anytime.
      `)
      var buttonarray = new MessageButton()
      buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ Cancelled").setID("cancelled")
      showproduct.edit({ embed: productItem, buttons: buttonarray });
      }else if(b.id == "Closetransaction"){
      let productItem = new Discord.MessageEmbed()
      .setColor("#6f6f6f")
      .setTitle(`THIS TRANSACTION HAS BEEN CLOSED`)
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > The transaction has been officially **closed**
      > You can open a new order with \`${prefix}buyproducts\`
      > If you like this rabbit consider [voting](https://discordbotlist.com/bots/rabbit-1895) for him
      > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
      `)
      var buttonarray = new MessageButton()
      buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ CLOSED").setID("cancelled")
      showproduct.edit({ embed: productItem, buttons: buttonarray });
      }
      if(b.id == "addquantity"){
      let quantitycount = 100;
      var quantityprice = quantitycount * productPrice + 150;
      let formatedquantityprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(quantityprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
      let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You are buying **${quantitycount}** quantities of **${productName}**
      > **$150.00** has been added to your total price
      > Shipping and delivery charges applied. so then
      > Your new total would be **${formatedquantityprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      } else if(b.id == "200quantity"){
      function quantity200(){
      let quantitycount = 200;
      var totalprice = quantitycount * productPrice + 300;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$300.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity200();
      } else if(b.id == "300quantity"){
      function quantity300(){
      let quantitycount = 300;
      var totalprice = quantitycount * productPrice + 600;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$600.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity300();
      } else if(b.id == "400quantity"){
      function quantity400(){
      let quantitycount = 400;
      var totalprice = quantitycount * productPrice + 800;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$800.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity400();
      } else if(b.id == "500quantity"){
      function quantity500(){
      let quantitycount = 500;
      var totalprice = quantitycount * productPrice + 1000;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce400").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("500confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`BUYING 500 QUANTITIES OF ${productName.toUpperCase()}?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$1,000.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity500();
      } else if(b.id == "reduce100"){
      function reduce100(){
      let quantitycount = 100;
      var totalprice = quantitycount * productPrice + 150;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
      let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You are buying **${quantitycount}** quantities of **${productName}**
      > **$150.00** has been added to your total price
      > Shipping and delivery charges applied. so then
      > Your new total would be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce100();
      } else if(b.id == "200quantity"){
      return quantity200();
      }
      else if(b.id == "reduce200"){
      function reduce200(){
      let quantitycount = 200;
      var totalprice = quantitycount * productPrice + 300;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$300.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce200();
      } else if(b.id == "300quantity"){
      return quantity300();
      }
      else if(b.id == "reduce300"){
      function reduce300(){
      let quantitycount = 300;
      var totalprice = quantitycount * productPrice + 600;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$600.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce300();
      } else if(b.id == "400quantity"){
      return quantity400();
      }
      else if(b.id == "reduce400"){
      function reduce400(){
      let quantitycount = 400;
      var totalprice = quantitycount * productPrice + 800;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$800.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce400();
      } else if(b.id == "500quantity"){
      return quantity500();
      }
      if(b.id == "100confirmOrder"){
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 100;
      var Totalquantityprice = quantitycount * productPrice + 150;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer11 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer11);
      // let p1 = sql.query("SELECT '" + product + "' FROM warehouse WHERE userId = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {    
      // let update100count = "UPDATE warehouse SET '" + product + "' = '" + product + "'+" + quantitycount + " WHERE userId = '" + message.author.id + "'";
      // sql.query(update100count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //100 quantities of product confirm order
      else if(b.id == "200confirmOrder"){ //200 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 200;
      var Totalquantityprice = quantitycount * productPrice + 300;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer12 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer12);
      // let p1 = sql.query("SELECT product_name, product_text, product_emoji, product_price, product_ratings FROM warehouse WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update200count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update200count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //200 quantities of product confirm order
      else if(b.id == "300confirmOrder"){ //300 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 300;
      var Totalquantityprice = quantitycount * productPrice + 600;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer13 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer13);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update300count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update300count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //300 quantities of product confirm order
      else if(b.id == "400confirmOrder"){ //400 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 400;
      var Totalquantityprice = quantitycount * productPrice + 800;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer14 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer14);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update400count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update400count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //400 quantities of product confirm order
      else if(b.id == "500confirmOrder"){ //500 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 500;
      var Totalquantityprice = quantitycount * productPrice + 1000;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer15 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer15);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update500count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update500count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      }//500 quantities of product confirm order
  })
    })(); 
    }
    })                                                    
    }).catch(error=>{
    console.log(error)
    return message.lineReply("<:thinkingface:867897965380108288> **| HMM IT SEEMS YOUR TIME RAN OUT!**")
    })
    })
    }
    ask_which_items_to_buy();
    break;
    case "2":
    //////////////////////
    let NotCompleted = new Discord.MessageEmbed()
    .setColor('#f862ff')
    .setThumbnail(config.Kotlin)
    .setTitle(`THIS FEATURE IS STILL UNDER CONSTRUCTION`)
    .setDescription(`
    **${message.author.username}** this feature is still being constructed by **Kotlin#0427**
    You can only buy your products from the global market for now.
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.author.displayAvatarURL());
    message.channel.send(NotCompleted);
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
    buyitems();
  })(); 
   } else if (UserHasShop == 4) { ///////////////////////////////////////////////////////////////////////////////////////////////////////
    (async () => {
    /////////// Code By Kotlin#0427
    function buyitems(){
    let rembed = new Discord.MessageEmbed()
    .setTitle("CHOOSE YOUR MARKET OPTION")
    .setDescription(`
    **1.** \`From Market\` - *Buy products from global market*
    **2.** \`Trusted Agent\` - *Buy products from a trusted agent*
    `)
    .setColor("#00ffff")
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    switch(collected.first().content.toString()){
    case "1":
    let userid = message.author.id;
    function ask_which_items_to_buy(){
    let buyitems = new Discord.MessageEmbed()
    .setTitle(`WHAT PRODUCT DO YOU WANT?`)
    .setColor("RANDOM")
    .setDescription(`Tell me the product you want to buy\nExample: you can buy - \`coffee\` or \`cocktail\` \nTo see the list of products try \`${prefix}globalmarket\` \n**Note:** You can only buy product that are in the **global market.**`)
    message.channel.send(buyitems).then(msg=>{
    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 90000, errors: ["TIME"]}).then(collected => {
    let product = collected.first().content.toLowerCase();
    let p1 = sql.query("SELECT product_id, product_author, product_name, product_text, product_emoji, product_price, product_ratings FROM `global_market` WHERE `product_name` = ?;", product, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("NO RESULTS FOUND!")
    .setDescription(`
    No results found for the **${product}**
    You can add this **product** to the glabal market
    by applying to be a market **Manager.**
    `)
    message.channel.send(NoResults);
    } else {
    (async () => {
    /////////// Code By Kotlin#0427
    let productId = result[0].product_id
    let productName = result[0].product_name
    let productText = result[0].product_text
    let productEmoji = result[0].product_emoji
    let productPrice = result[0].product_price
    let productAuthor = result[0].product_author
    let ProductRatings = result[0].product_ratings
    let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
    let buybutton = new MessageButton().setStyle("green").setID("buy").setLabel("💸 Buy Product")
    let nextbutton = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another")
    let cancelbutton = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel")
    let linkbutton = new MessageButton().setStyle("url").setLabel("Fumigram").setURL("https://fumigram.com")
    var buttonarray = [buybutton, nextbutton, cancelbutton, linkbutton]
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

    let productItem = new Discord.MessageEmbed()
    .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
    .setColor("#ff7900")
    .setDescription(`
    > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
    `)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
      /////////// Code By Kotlin#0427
      b.reply.defer()
      if(b.id == "buy"){
      let addproductquantity = new MessageButton().setStyle("blurple").setID("addquantity").setLabel("➕ Add Quantity")
      let choosemore = new MessageButton().setStyle("blurple").setID("next").setLabel("Choose Another Product")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addproductquantity, choosemore, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`BUY THE PRODUCT ${productName.toUpperCase()}`)
      .setColor("#00ffbf")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > How many **quantities** do you want to order?
      > You can only order **500** quantities each time you place an order
      > But **note** you must have enough money to order such amount.
      > And also all products purchased here will be moved to your **shop**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      } else if(b.id == "next"){
      showproduct.delete({ embed: productItem, buttons: buttonarray });
      return ask_which_items_to_buy();
      } else if(b.id == "cancel"){
      let productItem = new Discord.MessageEmbed()
      .setColor("#ff456e")
      .setTitle(`CANCELLED THE ORDER FOR ${productName.toUpperCase()}`)
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > This order has been **cancelled.** you can place new order anytime.
      `)
      var buttonarray = new MessageButton()
      buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ Cancelled").setID("cancelled")
      showproduct.edit({ embed: productItem, buttons: buttonarray });
      }else if(b.id == "Closetransaction"){
      let productItem = new Discord.MessageEmbed()
      .setColor("#6f6f6f")
      .setTitle(`THIS TRANSACTION HAS BEEN CLOSED`)
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product by **${productAuthor}**
      > The transaction has been officially **closed**
      > You can open a new order with \`${prefix}buyproducts\`
      > If you like this rabbit consider [voting](https://discordbotlist.com/bots/rabbit-1895) for him
      > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
      `)
      var buttonarray = new MessageButton()
      buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ CLOSED").setID("cancelled")
      showproduct.edit({ embed: productItem, buttons: buttonarray });
      }
      if(b.id == "addquantity"){
      let quantitycount = 100;
      var quantityprice = quantitycount * productPrice + 150;
      let formatedquantityprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(quantityprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
      let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You are buying **${quantitycount}** quantities of **${productName}**
      > **$150.00** has been added to your total price
      > Shipping and delivery charges applied. so then
      > Your new total would be **${formatedquantityprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      } else if(b.id == "200quantity"){
      function quantity200(){
      let quantitycount = 200;
      var totalprice = quantitycount * productPrice + 300;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$300.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity200();
      } else if(b.id == "300quantity"){
      function quantity300(){
      let quantitycount = 300;
      var totalprice = quantitycount * productPrice + 600;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$600.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity300();
      } else if(b.id == "400quantity"){
      function quantity400(){
      let quantitycount = 400;
      var totalprice = quantitycount * productPrice + 800;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$800.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity400();
      } else if(b.id == "500quantity"){
      function quantity500(){
      let quantitycount = 500;
      var totalprice = quantitycount * productPrice + 1000;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce400").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("500confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`BUYING 500 QUANTITIES OF ${productName.toUpperCase()}?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$1,000.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return quantity500();
      } else if(b.id == "reduce100"){
      function reduce100(){
      let quantitycount = 100;
      var totalprice = quantitycount * productPrice + 150;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("200quantity").setLabel("➕ Add More")
      let confirmproductorder = new MessageButton().setStyle("green").setID("100confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You are buying **${quantitycount}** quantities of **${productName}**
      > **$150.00** has been added to your total price
      > Shipping and delivery charges applied. so then
      > Your new total would be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce100();
      } else if(b.id == "200quantity"){
      return quantity200();
      }
      else if(b.id == "reduce200"){
      function reduce200(){
      let quantitycount = 200;
      var totalprice = quantitycount * productPrice + 300;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("300quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce100").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("200confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$300.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce200();
      } else if(b.id == "300quantity"){
      return quantity300();
      }
      else if(b.id == "reduce300"){
      function reduce300(){
      let quantitycount = 300;
      var totalprice = quantitycount * productPrice + 600;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("400quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce200").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("300confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$600.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce300();
      } else if(b.id == "400quantity"){
      return quantity400();
      }
      else if(b.id == "reduce400"){
      function reduce400(){
      let quantitycount = 400;
      var totalprice = quantitycount * productPrice + 800;
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(totalprice);
      let addmoreproduct = new MessageButton().setStyle("blurple").setID("500quantity").setLabel("➕ Add More")
      let reducesomeproduct = new MessageButton().setStyle("gray").setID("reduce300").setLabel("➖ Reduce")
      let confirmproductorder = new MessageButton().setStyle("green").setID("400confirmOrder").setLabel("✔ Confirm Order")
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      var buybuttonarray = [addmoreproduct, reducesomeproduct, confirmproductorder, cancelorder]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`HOW MANY QUANTITY DO YOU WANT?`)
      .setColor("#437cff")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Since you're buying **${quantitycount}** quantities of **${productName}**
      > We've added **$800.00** to your total price for shipping and delivery charges.
      > That would make your new total to be **${formatedtotalprice}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      }
      return reduce400();
      } else if(b.id == "500quantity"){
      return quantity500();
      }
      if(b.id == "100confirmOrder"){
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 100;
      var Totalquantityprice = quantitycount * productPrice + 150;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer16 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer16);
      // let p1 = sql.query("SELECT '" + product + "' FROM warehouse WHERE userId = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {    
      // let update100count = "UPDATE warehouse SET '" + product + "' = '" + product + "'+" + quantitycount + " WHERE userId = '" + message.author.id + "'";
      // sql.query(update100count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //100 quantities of product confirm order
      else if(b.id == "200confirmOrder"){ //200 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 200;
      var Totalquantityprice = quantitycount * productPrice + 300;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer17 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer17);
      // let p1 = sql.query("SELECT product_name, product_text, product_emoji, product_price, product_ratings FROM warehouse WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update200count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update200count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //200 quantities of product confirm order
      else if(b.id == "300confirmOrder"){ //300 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 300;
      var Totalquantityprice = quantitycount * productPrice + 600;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer18 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer18);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update300count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update300count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //300 quantities of product confirm order
      else if(b.id == "400confirmOrder"){ //400 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 400;
      var Totalquantityprice = quantitycount * productPrice + 800;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer19 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer19);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update400count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update400count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      } 
      //400 quantities of product confirm order
      else if(b.id == "500confirmOrder"){ //500 quantities of product confirm order
      let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
      if (error) console.log(error);
      const logsetup = results[0].res;
      const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      message.guild.fetchAuditLogs().then((logs) => { 	
      let quantitycount = 500;
      var Totalquantityprice = quantitycount * productPrice + 1000;
      let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
      if (Object.keys(result).length === 0) {
      let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      sql.query(register)
      let NoAccount = new Discord.MessageEmbed()
      .setColor('#e53637')
      .setThumbnail(message.author.avatarURL({ dynamic:true }))
      .setAuthor(message.author.tag)
      .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      message.channel.send(NoAccount);
      } else if (toFixed(Totalquantityprice) <= toFixed(result[0].balance)){
      let buytheproduct = 'UPDATE economy SET balance = balance-' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
      sql.query(buytheproduct);
      let updbuyer20 = 'UPDATE economy SET buyer = buyer+' + 1 + ' WHERE userId = ' + message.author.id + '';
      sql.query(updbuyer20);
      // let p1 = sql.query("SELECT product_id, product_name, product_text, product_emoji, product_price, product_ratings FROM `warehouse` WHERE `product_name` = ?;", product, function (err, result, fields) {
      // if(result == 0) { 
      let collectproduct ="INSERT INTO shop (userId, username, product_name, product_price, product_quantity, product_text, product_emoji, product_ratings) VALUES ('" + message.author.id + "', '" + message.author.username + "', '" + product + "', '" + productPrice + "', '" + quantitycount +"','" + productText +"', '" + productEmoji + "', '" + ProductRatings +"');";
      sql.query(collectproduct)
      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      let NewTotalBalance = result[0].balance
      let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      let productItem = new Discord.MessageEmbed()
      .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN BOUGHT`)
      .setColor("#00ff7e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > Your product has been delivered to your **shop.**
      > You can check this item with \`${prefix}shop\`
      > And you've just spent a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      > That makes your new total balance to be **${TotalBalance}**<:dollars:881559643820793917>
      `)
      showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      const BoughtItem = new Discord.MessageEmbed()
      .setColor('#125bf8')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(`**${message.author.username}** just bought a wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nAnd their new total balance is **${TotalBalance}**<:dollars:881559643820793917>`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
      log.send(BoughtItem);
      });
      // } else {
      // let update500count = "UPDATE warehouse SET product_quantity = product_quantity+" + quantitycount + " WHERE product_name = '" + product + "'";
      // sql.query(update500count)
      // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
      // let NewTotalBalance = result[0].balance
      // let formatedtotalprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
      // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(NewTotalBalance);
      // let ordercomplete = new MessageButton().setDisabled().setStyle("gray").setID("completed").setLabel("✔ Order Completed")
      // let buyanother = new MessageButton().setStyle("blurple").setID("next").setLabel("Buy Another")
      // let closeTrans = new MessageButton().setStyle("red").setID("Closetransaction").setLabel("Close Transaction")
      // var buybuttonarray = [ordercomplete, buyanother, closeTrans]
      // let productItem = new Discord.MessageEmbed()
      // .setTitle(`THE PRODUCT ${productName.toUpperCase()} HAS BEEN DELIVERED`)
      // .setColor("#00ff7e")
      // .setDescription(`
      // > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      // > Another **${quantitycount}** quantities of \`${capitalizeFirstLetter(productName)}\` has been delivered.
      // > You can check this item with \`${prefix}warehouse\`
      // > That was a total of **${formatedtotalprice}**<:dollars:881559643820793917>
      // > So your new total balance is **${TotalBalance}**<:dollars:881559643820793917>
      // `)
      // showproduct.edit({ embed: productItem, buttons: buybuttonarray });
      // const BoughtItem = new Discord.MessageEmbed()
      // .setColor('#125bf8')
      // .setAuthor(message.author.tag, message.author.avatarURL())
      // .setDescription(`**${message.author.username}** just bought another wholesale product of **${formatedtotalprice}**<:dollars:881559643820793917>\nFrom the **Global Market.** their product was delivered\nWhich makes their new total balance to be **${TotalBalance}**<:dollars:881559643820793917>`)
      // .setThumbnail(message.author.displayAvatarURL())
      // .setTimestamp()
      // .setFooter(message.guild.name, message.guild.iconURL());
      // log.send(BoughtItem);
      // });
      // }
      // })
      } else {    
      let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
      let cancelorder = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel order")
      let productItem = new Discord.MessageEmbed()
      .setTitle(`INSUFFICENT FUNDS FOR THIS ORDER`)
      .setColor("#ff3e3e")
      .setDescription(`
      > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}.
      > You don't have enough money to buy **${quantitycount}** quantities of **${productName}.**
      > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
      `)
      showproduct.edit({ embed: productItem, buttons: cancelorder });
      }
      });
      });
      })
      }//500 quantities of product confirm order
  })
    })(); 
    }
    })                                                    
    }).catch(error=>{
    console.log(error)
    return message.lineReply("<:thinkingface:867897965380108288> **| HMM IT SEEMS YOUR TIME RAN OUT!**")
    })
    })
    }
    ask_which_items_to_buy();
    break;
    case "2":
    //////////////////////
    let NotCompleted = new Discord.MessageEmbed()
    .setColor('#f862ff')
    .setThumbnail(config.Kotlin)
    .setTitle(`THIS FEATURE IS STILL UNDER CONSTRUCTION`)
    .setDescription(`
    **${message.author.username}** this feature is still being constructed by **Kotlin#0427**
    You can only buy your products from the global market for now.
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.author.displayAvatarURL());
    message.channel.send(NotCompleted);
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
    buyitems();
  })(); 
   }
  })
  }
  });
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