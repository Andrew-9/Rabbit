const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "globalmarket",
 aliases: ["gm", "pl"],
 category: "Economy",
 description: "Global Market where all products are listed",
 usage: "globalmarket",
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
    const prefix = guildPrefix.get(message.guild.id);
    let b = sql.query("SELECT product_author, product_name, product_text, product_emoji, product_price, product_ratings from global_market", function (err, result, fields){
    if (err) console.log(err);
    if (Object.keys(result).length === 0) {
    const NoProducts = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("GLOBAL MARKET LIST IS EMPTY")
    .setDescription(`**${message.author.username}** the global market list is empty there's no product.\nPlease contact the \`Market manager members\` to add some product.`)
    message.lineReply(NoProducts);
    } else {
    (async () => {
    /////////// Code By Kotlin#0427
    // let backtbutton = new MessageButton().setStyle("green").setID("Back").setLabel("⏪ Back")
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
    let productAuthor = row.product_author;
    let productRatings = row.product_ratings;
    let productprice = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.product_price);
    let ProList = productEmoji + ' \`' + capitalizeFirstLetter(productName) + '\` **' + productprice + '** ' + productText + '. Product by **' + productAuthor + '**';
    let products = ProList.split("\n");
    productlist += `\n${products}`;
    });
    
    let AllProducts = new Discord.MessageEmbed()
    .setColor("F24939")
    .setTitle('GLOBAL MARGET FOR ALL PRODUCTS')
    .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/884565942162571295/rabbit-logo.png")
    .setDescription(` ${productlist} `)

    AllProducts.setFooter("Note: Product price may change over time.", message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}));  
    let WarehouseButton = await message.channel.send({ embed: AllProducts, buttons: buttonarray });
    const collector = WarehouseButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 190000});
    collector.on("collect", (b) => {
      /////////// Code By Kotlin#0427
      b.reply.defer()
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
    })
   })(); 
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