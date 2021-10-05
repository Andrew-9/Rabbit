const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "buy",
 aliases: [""],
 category: "Economy",
 description: "Buy products from another user's shop",
 usage: "buy",
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
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoAccount);
    } else {
    const Buyfrom = new Discord.MessageEmbed()
    .setColor("#00f7ff")
    .setTitle("🔖 WHO DO YOU WANT TO BUY FROM?")
    .setDescription(`Only mention a member from the current server`)
    message.lineReply(Buyfrom).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    let buyfromwho = collected.first().mentions.users.first();
    if(buyfromwho.bot) {
    const NoShopForBots = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> THAT'S NOT A HUMAN!")
    .setDescription(`It's a **bot** please choose a human`);
    return message.lineReply(NoShopForBots);
    } else if (!buyfromwho) {
    const Nouser = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> YOU HAVE TO MENTION A VALID USER!")
    .setDescription(`You need to mention a **user** not a \`role, channel\` or \`bot\``);
    return message.channel.send(Nouser);
    } else {
    let b = sql.query("SELECT balance, bank, sales_balance, HasShop, username, bal_color, is_jailed, shopowner_color FROM economy WHERE userId = ?;", buyfromwho.id, function (err, result, fields){
    if (Object.keys(result).length === 0) {
    let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, HasShop, bal_color, shopowner_color, is_jailed) VALUES ('" + buyfromwho.id + "', '0', '0', '0', '" + buyfromwho.username + "', '0', '#ff8100', '#008eff', '0');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(buyfromwho.avatarURL({ dynamic:true }))
    .setAuthor(`${buyfromwho.username.toUpperCase()} DID NOT HAVE AN ACCOUNT`)
    .setDescription(`**${buyfromwho.username}** did not have an account.\nfortunately one has been opened them`)
    message.channel.send(NoAccount);
    } else {
    let check = sql.query("SELECT HasShop, shop_title, shop_thumbnail, shop_text, shopowner_color FROM economy WHERE userId = ?;", buyfromwho.id, function (err, result, fields) {
    let UserHasShop = result[0].HasShop
    let ShopTitle = result[0].shop_title
    let Shoplogo = result[0].shop_thumbnail
    let ShopSlogn = result[0].shop_text
    let ShopOwnerColor = result[0].shopowner_color
    if (UserHasShop == 0) {
    let NoTAOwner = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(buyfromwho.displayAvatarURL({ dynamic:true }))
    .setTitle(`${buyfromwho.username.toUpperCase()} IS NOT A SHOP OWNER`)
    .setDescription(`
    **${buyfromwho.username}** is not a shop owner so you can't buy
    from them. ask them to get a shop or you open one
    to open a shop use \`${prefix}getshop\` and take your pick.
    `)
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) {
    (async () => {
    /////////// Code By Kotlin#0427
    function buyitemsfrom(){
    let p1 = sql.query("SELECT product_name, product_text, product_emoji, product_price, product_ratings, product_quantity FROM shop WHERE userId = ?;", buyfromwho.id, function (err, result, fields) {
    if(result == 0) { 
    const NoItems = new Discord.MessageEmbed()
    .setColor("#ff547a")
    .setTitle("NO ITEMS FOUND IN THIS USER'S SHOP!")
    .setDescription(`
    **${buyfromwho.username}** doesn't have any items
    In their shop. you can buy from someone else
    `)
    message.channel.send(NoItems);
    } else {
    (async () => {  
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    let productlist = "";
    Object.keys(result).forEach(function (key) {
    let row = result[key];
    let productName = row.product_name;
    let productText = row.product_text;
    let productEmoji = row.product_emoji;
    let productQuantity = row.product_quantity;
    let productprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.product_price);
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. there are **' + productQuantity + '** items in stock';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    let overviewembed = new Discord.MessageEmbed()
    .setAuthor(`${ShopTitle.toUpperCase()}`)
    .setTitle(`Type product name`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, buyfromwho.displayAvatarURL({dynamic: true, format: "png", size: 2048}));

    let userid = message.author.id;
    // let backtbutton = new MessageButton().setStyle("green").setID("1").setLabel("⏪ Back")
    // let homebutton = new MessageButton().setStyle("blurple").setID("3").setLabel("🏡 Home")
    // let forwardbutton = new MessageButton().setStyle("green").setID("2").setLabel("⏩ Forward")
    // let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discord.boats/bot/734522699228905585")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")

    var buttonarray = [voterabbit, linkbutton, supportbutton]  

    let mybuttonsmsg = await message.channel.send({ embed: overviewembed, buttons: buttonarray }).then(msg=>{
    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 90000, errors: ["TIME"]}).then(collected => {
    let productname = collected.first().content.toLowerCase();
    let p1 = sql.query("SELECT userId, username, product_name, product_text, product_emoji, product_price, product_ratings, product_quantity FROM shop WHERE product_name = ?;", productname, function (err, result, fields) {
    if(result == 0) { 
    const NoResults = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("NO RESULTS FOUND!")
    .setDescription(`No results found for the **${productname}**`)
    message.channel.send(NoResults);
    } else {
    (async () => {  
    /////////// Code By Kotlin#0427 //////
    let productId = result[0].product_id
    let productName = result[0].product_name
    let productText = result[0].product_text
    let productEmoji = result[0].product_emoji
    let productPrice = result[0].product_price
    let ProductRatings = result[0].product_ratings
    let formatPrice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(productPrice);
    let buybutton = new MessageButton().setStyle("green").setID("buy").setLabel("💸 Buy Product")
    let cancelbutton = new MessageButton().setStyle("red").setID("cancel").setLabel("Cancel")
    let linkbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.com/invite/ghdvMDVFse")
    var buttonarray = [buybutton, cancelbutton, linkbutton]
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

    let productItem = new Discord.MessageEmbed()
    .setTitle(`FOUND THE PRODUCT ${productName.toUpperCase()}`)
    .setColor("#ff7900")
    .setDescription(`
    > ${productEmoji} \`${capitalizeFirstLetter(productName)}\` - Price: **${formatPrice}<:dollars:881559643820793917>** ${productText}. Product has **${ProductRatings}**
    `)
    let showproduct = await message.channel.send({ embed: productItem, buttons: buttonarray });
    const collector = showproduct.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {

    })
    })();
    }
    });

     
    // var currentPage = 0;
    
    // const collector = mybuttonsmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    // collector.on("collect", (b) => {
    //      b.reply.defer()
    //       if(b.id == "3"){
    //           currentPage = 0;
    //           mybuttonsmsg.edit({ embed: embedarray[currentPage], buttons: buttonarray })
    //       }
    //       else if(b.id == "1"){
    //           if(currentPage !==0){
    //               --currentPage;
    //               mybuttonsmsg.edit({ embed: embedarray[currentPage], buttons: buttonarray })
    //           } else {
    //               currentPage = embedarray.length -1;
    //               mybuttonsmsg.edit({ embed: embedarray[currentPage], buttons: buttonarray })
    //           }
    //       } else if(b.id == "2"){
    //           if(currentPage < embedarray.length -1){
    //               currentPage++;
    //               mybuttonsmsg.edit({ embed: embedarray[currentPage], buttons: buttonarray })
    //           } else {
    //               currentPage = 0;
    //               mybuttonsmsg.edit({ embed: embedarray[currentPage], buttons: buttonarray })
    //           }
    //       }
    //   })
    }).catch(error=>{
    console.log(error)
    return message.lineReply("<:thinkingface:867897965380108288> **| HMM IT SEEMS YOUR TIME RAN OUT!**")
    })
    });
    })();
    }
    });
    }
    buyitemsfrom();
    })();
    }
    });
    }
    });
    }/////////// Close Else
    })
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