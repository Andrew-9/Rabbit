const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "shop",
 aliases: ["store"],
 category: "Economy",
 description: "Displays all available items in a user's shop",
 usage: "shop <user>",
 run: async (client, message, args) => {
  try {
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
    let b = sql.query("SELECT HasShop, bal_color, shop_title, shop_thumbnail, shop_text, shopowner_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    let UserHasShop = result[0].HasShop
    let AuthorColor = result[0].bal_color
    let ShopTitle = result[0].shop_title
    let Shoplogo = result[0].shop_thumbnail
    let ShopSlogn = result[0].shop_text
    let ShopOwnerColor = result[0].shopowner_color
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
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("YOUR FOOD STORE IS EMPTY")
    .setDescription(`**${message.author.username}** you don't have any products in your shop\nTry purchasing some food related products with \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    let productlist = "";
    Object.keys(result).forEach(function (key) {
    let row = result[key];
    let productName = row.product_name;
    let productText = row.product_text;
    let productEmoji = row.product_emoji;
    let productQuantity = row.product_quantity;
    let productRatings = row.product_ratings;
    let productprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.product_price);
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. there are **' + productQuantity + '** items in stock';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    let overviewembed = new Discord.MessageEmbed()
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    // let shoppage1 = new Discord.MessageEmbed()
    // .setTitle("> SHOP ITEMS FIRST PAGE")
    // .setColor("#ff0070")
    // .setThumbnail(shopowner.displayAvatarURL())
    // shoppage1.setDescription(`
    // > :green_apple:  \`Apple\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :pear:  \`Pear\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :tangerine: \`Tangerine\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :lemon: \`Lemon\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :banana: \`Banana\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :watermelon: \`Watermelon\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :grapes: \`Grapes\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :blueberries: \`Blueberries\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :strawberry: \`Strawberry\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :melon: \`Melon\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :cherries: \`Cherries\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :peach: \`Peach\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :mango: \`Mango\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :pineapple: \`Pineapple\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :coconut: \`Coconut\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > :kiwi: \`Kiwi\` - Price: **${ProductSPrice}** there are **${ProducQuantity}** items in stock
    // > Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    // > incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    // `)
    // if (ProductName == "coffee")  embed.setDescription(``);

    // let shoppage2 = new Discord.MessageEmbed()
    // .setTitle("SHOP ITEMS PAGE TWO")
    // .setColor("#ff6900")
    // .setThumbnail(config.avatarUrl)
    // shoppage2.setDescription(`
    // > :tomato: \`Tomato\` - Price: **$90.00** there are **20** items in stock
    // > :eggplant: \`Eggplant\` - Price: **$90.00** there are **20** items in stock
    // > :avocado: \`Avocado\` - Price: **$90.00** there are **20** items in stock
    // > :olive: \`Olive\` - Price: **$90.00** there are **20** items in stock
    // > :broccoli: \`Broccoli\` - Price: **$90.00** there are **20** items in stock
    // > :leafy_green: \`Leafy\` - Price: **$90.00** there are **20** items in stock
    // > :bell_pepper: \`Bell Pepper\` - Price: **$90.00** there are **20** items in stock
    // > :cucumber: \`Cucumber\` - Price: **$90.00** there are **20** items in stock
    // > :hot_pepper: \`Hot Pepper\` - Price: **$90.00** there are **20** items in stock
    // > :corn: \`Corn\` - Price: **$90.00** there are **20** items in stock
    // > :carrot: \`Carrot\` - Price: **$90.00** there are **20** items in stock
    // > :garlic: \`Garlic\` - Price: **$90.00** there are **20** items in stock
    // > :onion: \`Onion\` - Price: **$90.00** there are **20** items in stock
    // > :potato: \`Potato\` - Price: **$90.00** there are **20** items in stock
    // > :sweet_potato: \`Sweet Potato\` - Price: **$90.00** there are **20** items in stock
    // > :croissant: \`Croissant\` - Price: **$90.00** there are **20** items in stock
    // `)


    //var embedarray = [shoppage1, shoppage2]

    
   
    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
   
    })(); 
    }
    })
  })(); 
  
  } else if (UserHasShop == 2) { 
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("YOUR CYBER CAFE IS EMPTY")
    .setDescription(`**${message.author.username}** you don't have any products in your shop\nTry purchasing some cafe related products with \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    let productlist = "";
    Object.keys(result).forEach(function (key) {
    let row = result[key];
    let productName = row.product_name;
    let productText = row.product_text;
    let productEmoji = row.product_emoji;
    let productQuantity = row.product_quantity;
    //let productRatings = row.product_ratings;
    let productprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.product_price);
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. there are **' + productQuantity + '** items in stock';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    let overviewembed = new Discord.MessageEmbed()
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
   
    })(); 
    }
    })
  })(); 
  } else if (UserHasShop == 3) {
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("YOUR GENERAL STORE IS EMPTY")
    .setDescription(`**${message.author.username}** you don't have any products in your shop\nTry purchasing some products with \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    let productlist = "";
    Object.keys(result).forEach(function (key) {
    let row = result[key];
    let productName = row.product_name;
    let productText = row.product_text;
    let productEmoji = row.product_emoji;
    let productQuantity = row.product_quantity;
    //let productRatings = row.product_ratings;
    let productprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.product_price);
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. there are **' + productQuantity + '** items in stock';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    let overviewembed = new Discord.MessageEmbed()
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
   
    })(); 
    }
    })
  })();
  }  else if (UserHasShop == 4) {
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", message.author.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("YOUR RESTAURANTS IS EMPTY")
    .setDescription(`**${message.author.username}** you don't have any products in your shop\nTry purchasing some restaurant related products with \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    let productlist = "";
    Object.keys(result).forEach(function (key) {
    let row = result[key];
    let productName = row.product_name;
    let productText = row.product_text;
    let productEmoji = row.product_emoji;
    let productQuantity = row.product_quantity;
    //let productRatings = row.product_ratings;
    let productprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.product_price);
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. there are **' + productQuantity + '** items in stock';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    let overviewembed = new Discord.MessageEmbed()
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
   
    })(); 
    }
    })
  })();
  }
  })
 }
})
} else if (shopowner) {
    let shopowner = message.mentions.users.first();
    if(shopowner.bot) {
    const NoShopForBots = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> NO SHOP FOR BOTS!")
    .setDescription(`*It's a **bot** and bots can't have shop*`);
    return message.lineReply(NoShopForBots);
    }
    let b = sql.query("SELECT HasShop, bal_color, shop_title, shop_thumbnail, shop_text, shopowner_color FROM economy WHERE userId = ?;", shopowner.id, function (err, result, fields) {
    if(result == 0) { 
    let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, HasShop, bal_color, shopowner_color, is_jailed, cardtype) VALUES ('" + shopowner.id + "', '0', '0', '0', '" + shopowner.username + "', '0', '#ff8100', '#008eff', '0', '1');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(shopowner.avatarURL({ dynamic:true }))
    .setAuthor(`${shopowner.username.toUpperCase()} DID NOT HAVE AN ACCOUNT`)
    .setDescription(`**${shopowner.username}** did not have an account.\nfortunately one has been opened them`)
    message.channel.send(NoAccount);
    } else {
    let UserHasShop = result[0].HasShop
    let AuthorColor = result[0].bal_color
    let ShopTitle = result[0].shop_title
    let Shoplogo = result[0].shop_thumbnail
    let ShopSlogn = result[0].shop_text
    let ShopOwnerColor = result[0].shopowner_color
    if (UserHasShop == 0) { //if no shop then 
    let NoTAOwner = new Discord.MessageEmbed()
    .setColor('#fb005f')
    .setThumbnail(shopowner.displayAvatarURL({ dynamic:true }))
    .setTitle(`${shopowner.username.toUpperCase()} IS NOT A SHOP OWNER`)
    .setDescription(`
    ${shopowner.username} doesn't have a shop. try \`${prefix}getshop\`
    they are either buying from other's or using
    the global market. you can ask them to get a shop.
    `);
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) { //if shop value in database is == 1 then give use the items
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", shopowner.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle(`${shopowner.username.toUpperCase()}'S FOOD STORE IS EMPTY`)
    .setDescription(`**${shopowner.username}** doesn't have any food related products in their shop\nYou can ask them to puchase some from the global market \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

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
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
    })(); 
    }
    })
   })(); 
   //Users shop code ends here
    } else if (UserHasShop == 2) { 
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", shopowner.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle(`${shopowner.username.toUpperCase()}'S CYBER CAFE IS EMPTY`)
    .setDescription(`**${shopowner.username}** doesn't have any cafe related products in their shop\nYou can ask them to puchase some from the global market \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

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
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
    })(); 
    }
    })
   })(); 
    } else if (UserHasShop == 3) { 
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", shopowner.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle(`${shopowner.username.toUpperCase()}'S GENERAL STORE IS EMPTY`)
    .setDescription(`**${shopowner.username}** doesn't have any products in their shop\nYou can ask them to puchase some from the global market with \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

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
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
    })(); 
    }
    })
   })(); 
    } else if (UserHasShop == 4) { 
    (async () => {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_emoji, product_price, product_quantity, product_ratings FROM shop WHERE userId = ?;", shopowner.id, function (err, result, fields){
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle(`${shopowner.username.toUpperCase()}'S RESTAURANTS IS EMPTY`)
    .setDescription(`**${shopowner.username}** doesn't have any products that are most seen in restaurants\nYou can ask them to puchase some from the global market \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    // let backtbutton = new MessageButton().setStyle("blurple").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let supportbutton = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
    var buttonarray = [voterabbit, linkbutton, supportbutton]

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
    .setTitle(`${ShopTitle.toUpperCase()}`)
    .setThumbnail(Shoplogo)
    .setColor(ShopOwnerColor)
    .setDescription(productlist)

    overviewembed.setFooter(`${ShopSlogn}`, shopowner.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let ShopMessageButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });

    var currentPage = 0;

    const collector = ShopMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.defer();
        if(b.id == "Home"){
            currentPage = 0;
            ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = embedarray.length -1;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            } else {
                currentPage = 0;
                ShopMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
            }
        }
    })
    })(); 
    }
    })
   })(); 
    }
    } //////////////////////////////////////////////////////
  });
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