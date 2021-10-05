const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
module.exports = {
 name: "sell",
 aliases: [""],
 category: "Economy",
 description: "Sell out your items in your shop and make 30% come back depending on what shop you opened",
 usage: "sell",
 run: async (client, message, args) => {
  try {
    let con = sql.query("SELECT `enabled` FROM `economy_ward` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
    let isEnabled = result[0].enabled
    if (isEnabled == 0) {
    const EcoNotEnabled = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> ECONOMY SYSTEM NOT ENABLED")
    .setDescription(`*The economical system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
    return message.lineReply(EcoNotEnabled); 
    } else if (isEnabled == 1) {
    (async () => {
    const prefix = guildPrefix.get(message.guild.id);
    let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
    if (Object.keys(result).length === 0) {
    let register ="INSERT INTO economy (userId, balance, bank, sales_balance, HasShop, username, bal_color, is_jailed, shopowner_color, cardtype) VALUES ('" + message.author.id + "', '0', '0', '0', '0',' " + message.author.username + "', '#343434', '0', '#343434', '1');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setAuthor(message.author.tag)
    .setDescription(`You don't have an account to buy anything\n**Fortunately I'v opened an account for you.**\nTry using \`${prefix}bal\` to view your balance`)
    message.channel.send(NoAccount);
    } else {
    let b = sql.query("SELECT balance, bank, sales_balance, HasShop, username, bal_color, is_jailed, shopowner_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
    if (Object.keys(result).length === 0) {
    let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, HasShop, bal_color, shopowner_color, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0', '0', '" + message.author.username + "', '0', '#ff8100', '#008eff', '0', '1');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setAuthor(`${message.author.username.toUpperCase()} YOU DON'T HAVE AN ACCOUNT`)
    .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you`)
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
    ${message.author.username} you don't have a shop. please open a shop
    or use \`${prefix}shop @user\` to view other members shop
    `)
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) {
    let p1 = sql.query("SELECT * FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#ff1282")
    .setTitle("NO ITREMS IN YOUR SHOP!")
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setDescription(`There are no items in your shop\nbuy some items and try again.`)
    message.channel.send(NoResults);
    } else {
    let soldlist = "";
    let ItemQuantity = result[0].product_quantity;
    if (ItemQuantity < 5) {
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NO MORE ITEMS TO SELL`)
    .setColor("#ff7900")
    .setDescription(`You have no more items in your shop`)
    message.channel.send(productItem)
    let sql4 = "DELETE FROM `shop` WHERE userId = " + message.author.id;
    sql.query(sql4);
    } else {
    (async () => {  
    var sellitems = Math.floor(Math.random() *(90)) + 1;
    Object.keys(result).forEach(function (key) {
    let sellItem = 'UPDATE shop SET product_quantity = product_quantity-' + sellitems + ' WHERE userId = ' + message.author.id + '';
    sql.query(sellItem);
    let row = result[key];
    let productName = row.product_name;
    let AuthorName = row.username;
    let Eachprice = row.product_price;
    var Totalquantityprice = Eachprice + 10 - 20;
    let salescash = 'UPDATE economy SET sales_balance = sales_balance+' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
    sql.query(salescash);
    let TotalPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
    let ProList =  '' + AuthorName +'' + " sold" + ' **' + sellitems + ' ** units ' + "of" + ' ' + productName + ' for **' + TotalPrice + '**<:dollars:881559643820793917>';
    let products = ProList.split("\n");
    soldlist += `\n${products}`;
    });

    let confirmesale = new MessageButton().setStyle("green").setID("Confirm").setLabel("💸 Confirm Sale")
    let deletesale = new MessageButton().setStyle("red").setID("delete").setLabel("❌ Delete Sale")
    let saleinfo = new MessageButton().setStyle("blurple").setID("salesInfo").setLabel("❔ Sale Info")

    var buttonarray = [confirmesale, deletesale, saleinfo] 

    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOLD SOME ITEMS IN YOUR SHOP`)
    .setColor("#ff7900")
    .setDescription(`${soldlist}`)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
    b.reply.defer()
    if(b.id == "Confirm"){
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SALES CONFIRMED`)
    .setColor("#00f6de")
    .setDescription(`This sales has now been confirmed`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "delete"){
    let plsYes = new MessageButton().setStyle("blurple").setID("PleaseYes").setLabel("✔ Please Do")
    let PlsNo = new MessageButton().setStyle("green").setID("PleaseNo").setLabel("❌ Please No")
    var buttonarray = [plsYes, PlsNo] 
    let productItem = new Discord.MessageEmbed()
    .setTitle(`HEY ARE YOU SURE?`)
    .setColor("#00def6")
    .setDescription(`**${message.author.username}** are you sure you want to delete this sale?\nPlease **note** You might loose all your money`)
    showproduct.edit({ embed: productItem, buttons: buttonarray });
    } else if(b.id == "PleaseYes"){
    let updatesales = 'UPDATE economy SET sales_balance = ' + 0 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`THIS SALES HAS BEEN CANCELED`)
    .setColor("#00dfff")
    .setDescription(`This sales have now been canceled\nAnd your sales balance is now **$0.00**`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "PleaseNo"){
    let updatesales = 'UPDATE economy SET sales_balance = sales_balance+ ' + 18 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let completed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Completed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NICE YOUR SALES IS NOW COMPLETED`)
    .setColor("#00ffb7")
    .setDescription(`This sales is now fully completed\nAnd I'v given you a little bonus **(>‿◠)**`)
    showproduct.edit({ embed: productItem, buttons: completed });
    } else if(b.id == "salesInfo"){
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOME MORE INFORMATION ABOUT SALES`)
    .setColor("#00efff")
    .setDescription(`I looked it up and saw that you opened a **food store** that means a **20$** fee has been removed for market charges and shop maintainers. the system is fair and is not been interrupted even by my developer. if you need more products contact your \`Market Manager\` and ask them to add more items to the global market.`)
    showproduct.edit({ embed: productItem });
    }
    })
    })();
    }
    }
    })
    } else if (UserHasShop == 2) {
    let p1 = sql.query("SELECT * FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#ff1282")
    .setTitle("NO ITREMS IN YOUR SHOP!")
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setDescription(`There are no items in your shop\nbuy some items and try again.`)
    message.channel.send(NoResults);
    } else {   
    let soldlist = "";
    let ItemQuantity = result[0].product_quantity;
    if (ItemQuantity < 5) {
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NO MORE ITEMS TO SELL`)
    .setColor("#ff7900")
    .setDescription(`You have no more items in your shop`)
    message.channel.send(productItem)
    let sql4 = "DELETE FROM `shop` WHERE userId = " + message.author.id;
    sql.query(sql4);
    } else {
    (async () => {  
    var sellitems = Math.floor(Math.random() *(90)) + 1;
    Object.keys(result).forEach(function (key) {
    let sellItem = 'UPDATE shop SET product_quantity = product_quantity-' + sellitems + ' WHERE userId = ' + message.author.id + '';
    sql.query(sellItem);
    let row = result[key];
    let productName = row.product_name;
    let AuthorName = row.username;
    let Eachprice = row.product_price;
    var Totalquantityprice = Eachprice + 10 - 24;
    let salescash = 'UPDATE economy SET sales_balance = sales_balance+' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
    sql.query(salescash);
    let TotalPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
    let ProList =  '' + AuthorName +'' + " sold" + ' **' + sellitems + ' ** units ' + "of" + ' ' + productName + ' for **' + TotalPrice + '**<:dollars:881559643820793917>';
    let products = ProList.split("\n");
    soldlist += `\n${products}`;
    });

    let confirmesale = new MessageButton().setStyle("green").setID("Confirm").setLabel("💸 Confirm Sale")
    let deletesale = new MessageButton().setStyle("red").setID("delete").setLabel("❌ Delete Sale")
    let saleinfo = new MessageButton().setStyle("blurple").setID("salesInfo").setLabel("❔ Sale Info")

    var buttonarray = [confirmesale, deletesale, saleinfo] 

    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOLD SOME ITEMS IN YOUR SHOP`)
    .setColor("#ff7900")
    .setDescription(`${soldlist}`)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
    b.reply.defer()
    if(b.id == "Confirm"){
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SALES CONFIRMED`)
    .setColor("#00f6de")
    .setDescription(`This sales has now been confirmed`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "delete"){
    let plsYes = new MessageButton().setStyle("blurple").setID("PleaseYes").setLabel("✔ Please Do")
    let PlsNo = new MessageButton().setStyle("green").setID("PleaseNo").setLabel("❌ Please No")
    var buttonarray = [plsYes, PlsNo] 
    let productItem = new Discord.MessageEmbed()
    .setTitle(`HEY ARE YOU SURE?`)
    .setColor("#00def6")
    .setDescription(`**${message.author.username}** are you sure you want to delete this sale?\nPlease **note** You might loose all your money`)
    showproduct.edit({ embed: productItem, buttons: buttonarray });
    } else if(b.id == "PleaseYes"){
    let updatesales = 'UPDATE economy SET sales_balance = ' + 0 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`THIS SALES HAS BEEN CANCELED`)
    .setColor("#00dfff")
    .setDescription(`This sales have now been canceled\nAnd your sales balance is now **$0.00**`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "PleaseNo"){
    let updatesales = 'UPDATE economy SET sales_balance = sales_balance+ ' + 20 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let completed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Completed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NICE YOUR SALES IS NOW COMPLETED`)
    .setColor("#00ffb7")
    .setDescription(`This sales is now fully completed\nAnd I'v given you a little bonus **(>‿◠)**`)
    showproduct.edit({ embed: productItem, buttons: completed });
    } else if(b.id == "salesInfo"){
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOME MORE INFORMATION ABOUT SALES`)
    .setColor("#00efff")
    .setDescription(`I looked it up and saw that you opened a **cyber cafe** that means a **24$** fee has been removed for market charges and shop maintainers. the system is fair and is not been interrupted even by my developer. if you need more products contact your \`Market Manager\` and ask them to add more items to the global market.`)
    showproduct.edit({ embed: productItem });
    }
    })
    })();
    }
    }
    })
    } else if (UserHasShop == 3) {
    let p1 = sql.query("SELECT * FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#ff1282")
    .setTitle("NO ITREMS IN YOUR SHOP!")
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setDescription(`There are no items in your shop\nbuy some items and try again.`)
    message.channel.send(NoResults);
    } else {   
    let soldlist = "";
    let ItemQuantity = result[0].product_quantity;
    if (ItemQuantity < 5) {
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NO MORE ITEMS TO SELL`)
    .setColor("#ff7900")
    .setDescription(`You have no more items in your shop`)
    message.channel.send(productItem)
    let sql4 = "DELETE FROM `shop` WHERE userId = " + message.author.id;
    sql.query(sql4);
    } else {
    (async () => {  
    var sellitems = Math.floor(Math.random() *(90)) + 1;
    Object.keys(result).forEach(function (key) {
    let sellItem = 'UPDATE shop SET product_quantity = product_quantity-' + sellitems + ' WHERE userId = ' + message.author.id + '';
    sql.query(sellItem);
    let row = result[key];
    let productName = row.product_name;
    let AuthorName = row.username;
    let Eachprice = row.product_price;
    var Totalquantityprice = Eachprice + 10 - 25;
    let salescash = 'UPDATE economy SET sales_balance = sales_balance+' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
    sql.query(salescash);
    let TotalPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
    let ProList =  '' + AuthorName +'' + " sold" + ' **' + sellitems + ' ** units ' + "of" + ' ' + productName + ' for **' + TotalPrice + '**<:dollars:881559643820793917>';
    let products = ProList.split("\n");
    soldlist += `\n${products}`;
    });

    let confirmesale = new MessageButton().setStyle("green").setID("Confirm").setLabel("💸 Confirm Sale")
    let deletesale = new MessageButton().setStyle("red").setID("delete").setLabel("❌ Delete Sale")
    let saleinfo = new MessageButton().setStyle("blurple").setID("salesInfo").setLabel("❔ Sale Info")

    var buttonarray = [confirmesale, deletesale, saleinfo] 

    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOLD SOME ITEMS IN YOUR SHOP`)
    .setColor("#ff7900")
    .setDescription(`${soldlist}`)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
    b.reply.defer()
    if(b.id == "Confirm"){
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SALES CONFIRMED`)
    .setColor("#00f6de")
    .setDescription(`This sales has now been confirmed`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "delete"){
    let plsYes = new MessageButton().setStyle("blurple").setID("PleaseYes").setLabel("✔ Please Do")
    let PlsNo = new MessageButton().setStyle("green").setID("PleaseNo").setLabel("❌ Please No")
    var buttonarray = [plsYes, PlsNo] 
    let productItem = new Discord.MessageEmbed()
    .setTitle(`HEY ARE YOU SURE?`)
    .setColor("#00def6")
    .setDescription(`**${message.author.username}** are you sure you want to delete this sale?\nPlease **note** You might loose all your money`)
    showproduct.edit({ embed: productItem, buttons: buttonarray });
    } else if(b.id == "PleaseYes"){
    let updatesales = 'UPDATE economy SET sales_balance = ' + 0 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`THIS SALES HAS BEEN CANCELED`)
    .setColor("#00dfff")
    .setDescription(`This sales have now been canceled\nAnd your sales balance is now **$0.00**`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "PleaseNo"){
    let updatesales = 'UPDATE economy SET sales_balance = sales_balance+ ' + 50 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let completed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Completed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NICE YOUR SALES IS NOW COMPLETED`)
    .setColor("#00ffb7")
    .setDescription(`This sales is now fully completed\nAnd I'v given you a little bonus **(>‿◠)**`)
    showproduct.edit({ embed: productItem, buttons: completed });
    } else if(b.id == "salesInfo"){
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOME MORE INFORMATION ABOUT SALES`)
    .setColor("#00efff")
    .setDescription(`I looked it up and saw that you opened a **general store** that means a **25$** fee has been removed for market charges and shop maintainers. the system is fair and is not been interrupted even by my developer. if you need more products contact your \`Market Manager\` and ask them to add more items to the global market.`)
    showproduct.edit({ embed: productItem });
    }
    })
    })();
    }
    }
    })
    } else if (UserHasShop == 4) {
    let p1 = sql.query("SELECT * FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#ff1282")
    .setTitle("NO ITREMS IN YOUR SHOP!")
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setDescription(`There are no items in your shop\nbuy some items and try again.`)
    message.channel.send(NoResults);
    } else {   
    let soldlist = "";
    let ItemQuantity = result[0].product_quantity;
    if (ItemQuantity < 5) {
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NO MORE ITEMS TO SELL`)
    .setColor("#ff7900")
    .setDescription(`You have no more items in your shop`)
    message.channel.send(productItem)
    let sql4 = "DELETE FROM `shop` WHERE userId = " + message.author.id;
    sql.query(sql4);
    } else {
    (async () => {  
    var sellitems = Math.floor(Math.random() *(90)) + 1;
    Object.keys(result).forEach(function (key) {
    let sellItem = 'UPDATE shop SET product_quantity = product_quantity-' + sellitems + ' WHERE userId = ' + message.author.id + '';
    sql.query(sellItem);
    let row = result[key];
    let productName = row.product_name;
    let AuthorName = row.username;
    let Eachprice = row.product_price;
    var Totalquantityprice = Eachprice + 10 - 30;
    let salescash = 'UPDATE economy SET sales_balance = sales_balance+' + Totalquantityprice + ' WHERE userId = ' + message.author.id + '';
    sql.query(salescash);
    let TotalPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Totalquantityprice);
    let ProList =  '' + AuthorName +'' + " sold" + ' **' + sellitems + ' ** units ' + "of" + ' ' + productName + ' for **' + TotalPrice + '**<:dollars:881559643820793917>';
    let products = ProList.split("\n");
    soldlist += `\n${products}`;
    });

    let confirmesale = new MessageButton().setStyle("green").setID("Confirm").setLabel("💸 Confirm Sale")
    let deletesale = new MessageButton().setStyle("red").setID("delete").setLabel("❌ Delete Sale")
    let saleinfo = new MessageButton().setStyle("blurple").setID("salesInfo").setLabel("❔ Sale Info")

    var buttonarray = [confirmesale, deletesale, saleinfo] 

    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOLD SOME ITEMS IN YOUR SHOP`)
    .setColor("#ff7900")
    .setDescription(`${soldlist}`)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
    b.reply.defer()
    if(b.id == "Confirm"){
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SALES CONFIRMED`)
    .setColor("#00f6de")
    .setDescription(`This sales has now been confirmed`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "delete"){
    let plsYes = new MessageButton().setStyle("blurple").setID("PleaseYes").setLabel("✔ Please Do")
    let PlsNo = new MessageButton().setStyle("green").setID("PleaseNo").setLabel("❌ Please No")
    var buttonarray = [plsYes, PlsNo] 
    let productItem = new Discord.MessageEmbed()
    .setTitle(`HEY ARE YOU SURE?`)
    .setColor("#00def6")
    .setDescription(`**${message.author.username}** are you sure you want to delete this sale?\nPlease **note** You might loose all your money`)
    showproduct.edit({ embed: productItem, buttons: buttonarray });
    } else if(b.id == "PleaseYes"){
    let updatesales = 'UPDATE economy SET sales_balance = ' + 0 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let confirmed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Confirmed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`THIS SALES HAS BEEN CANCELED`)
    .setColor("#00dfff")
    .setDescription(`This sales have now been canceled\nAnd your sales balance is now **$0.00**`)
    showproduct.edit({ embed: productItem, buttons: confirmed });
    } else if(b.id == "PleaseNo"){
    let updatesales = 'UPDATE economy SET sales_balance = sales_balance+ ' + 26 + ' WHERE userId = ' + message.author.id + '';
    sql.query(updatesales);
    let completed = new MessageButton().setDisabled().setStyle("gray").setID("Confirmed").setLabel("✔ Completed")
    let productItem = new Discord.MessageEmbed()
    .setTitle(`NICE YOUR SALES IS NOW COMPLETED`)
    .setColor("#00ffb7")
    .setDescription(`This sales is now fully completed\nAnd I'v given you a little bonus **(>‿◠)**`)
    showproduct.edit({ embed: productItem, buttons: completed });
    } else if(b.id == "salesInfo"){
    let productItem = new Discord.MessageEmbed()
    .setTitle(`SOME MORE INFORMATION ABOUT SALES`)
    .setColor("#00efff")
    .setDescription(`I looked it up and saw that you opened a **restaurant** that means a **30$** fee has been removed for market charges and shop maintainers. the system is fair and is not been interrupted even by my developer. if you need more products contact your \`Market Manager\` and ask them to add more items to the global market.`)
    showproduct.edit({ embed: productItem });
    }
    })
    })();
    }
    }
    }) 
    }
    })
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