const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "warehouse",
 aliases: ["whouse", "wh"],
 category: "Economy",
 description: "This is your personal warehouse where all\nYour wholesale products are stored.\nAlways close the doors first before stepping out.",
 usage: "warehouse",
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
    const prefix = guildPrefix.get(message.guild.id);
    let check = sql.query("SELECT HasShop, bal_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    let UserHasShop = result[0].HasShop
    let AuthorColor = result[0].bal_color
    if (UserHasShop == 0) {
    let NoTAOwner = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`YOU'RE NOT A SHOP OWNER`)
    .setDescription(`
    ${message.author.username} you don't have a shop. open a shop
    or use \`${prefix}shop @user\` to view other members shop
    To open your own shop you'll have to pay a **fee** of
    **$80,000.00** dollars in cold cash to get a shop space.
    `)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoTAOwner);
    } else if (UserHasShop == 1) {
    let b = sql.query("SELECT product_id, username, product_name, product_text, product_quantity, product_emoji, product_price, product_ratings FROM warehouse WHERE userId = ?;", message.author.id, function (err, result, fields){
    if (err) console.log(err);
    if (result == 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("YOUR WAREHOUSE IS EMPTY")
    .setDescription(`**${message.author.username}** you don't have any products in your warehouse\nTry purchasing some products with \`${prefix}buyproducts\``)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    /////////// Code By Kotlin#0427
    // let backtbutton = new MessageButton().setStyle("green").setID("Back").setLabel("⏪ Back")
    // let forwardbutton = new MessageButton().setStyle("blurple").setID("Forward").setLabel("⏩ Forward")
    let closebutton = new MessageButton().setStyle("red").setID("ClooseDoors").setLabel("🔐 Close Doors")
    let rabbitbutton = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
    let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discordbotlist.com/bots/rabbit-1895")
    var buttonarray = [closebutton, rabbitbutton, voterabbit]
    
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
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. Item count **' + productQuantity + '** quantities';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    let OwnerName = result[0].username
    let overviewembed = new Discord.MessageEmbed()
    .setTitle(`${OwnerName.toUpperCase()}'S WAREHOUSE`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(AuthorColor)
    .setDescription(productlist)

    // for(let i = productlist; i <10; i++)
    // embedarray.push(new Discord.MessageEmbed()
    // .setColor(AuthorColor)
    // .setTitle(`${OwnerName.toUpperCase()}'S WAREHOUSE`)
    // .setThumbnail(message.author.displayAvatarURL())
    // .setDescription(productlist))

    //var embedarray = [overviewembed]
 
    var currentPage = 0;
    overviewembed.setFooter("You can move this items to your shop to sell them anytime at a given price", message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}));  
    let WarehouseButton = await message.channel.send({ embed: overviewembed, buttons: buttonarray });
    const collector = WarehouseButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 190000});
    collector.on("collect", (b) => {
      /////////// Code By Kotlin#0427
      b.defer();
      if(b.id == "Home"){
          currentPage = 0;
          WarehouseButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
      }
      else if(b.id == "Back"){
          if(currentPage !==0){
              --currentPage;
              WarehouseButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
          } else {
              currentPage = embedarray.length -1;
              WarehouseButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
          }
      } else if(b.id == "Forward"){
          if(currentPage < embedarray.length -1){
              currentPage++;
              WarehouseButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
          } else {
              currentPage = 0;
              WarehouseButton.edit({ embed: embedarray[currentPage], buttons: buttonarray });
          }
      }
      if(b.id == "ClooseDoors"){
        let closedbutton = new MessageButton().setDisabled().setStyle("blurple").setID("close").setLabel("✔ Doors Closed")
        let rabbitbutton = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let supportrabbit = new MessageButton().setStyle("url").setLabel("SUPPORT RABBIT").setURL("https://donatebot.io/checkout/696724967907393537")
        var newbuttons = [closedbutton, rabbitbutton, supportrabbit]
        let embedarray = new Discord.MessageEmbed()
        .setTitle(`WAREHOUSE DOORS HAS BEEN CLOSED`)
        .setColor("#006eff")
        .setDescription(`You can open your warehouse doors again with \`${prefix}warehouse\``)
        WarehouseButton.edit({ embed: embedarray, buttons: newbuttons });
    }
    })
   })(); 
  }
 })
  } else if (UserHasShop == 2) { 
        //Do anything to the user's shop
  }
  })
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