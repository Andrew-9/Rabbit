const Discord = require("discord.js");
const sql = require("../../utilities/database");
const { MessageButton } = require('discord-buttons');
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
    name: "getshop",
    aliases: ["get-shop"],
    description: "Open a shop for yourself to sell products",
    category: "Economy",
    usage: "getshop",
    run: async (client, message, args) => {
        try {
        /////////// Code By Kotlin#0427
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
        /////////// Code By Kotlin#0427
        let b = sql.query("SELECT balance, bank, sales_balance, HasShop, bal_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        if (Object.keys(result).length === 0) {
        let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, HasShop, bal_color, cardtype) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "', '0', '#ff0070', '1');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account.\n** I'v opened one for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else {
        let check = sql.query("SELECT HasShop FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let UserHasShop = result[0].HasShop
        if (UserHasShop == 0) {
        function NotAShopOwner(){
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
        if (error) console.log(error);
        const logsetup = results[0].res;
        const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        message.guild.fetchAuditLogs().then((logs) => { 
        (async () => {
        let FoodStore = new MessageButton().setStyle("blurple").setID("FoodStore").setLabel("🍇 Food Store")
        let CyberCafe = new MessageButton().setStyle("blurple").setID("CyberCafe").setLabel("☕ Cyber Cafe")
        let GeneralStore = new MessageButton().setStyle("blurple").setID("GeneralStore").setLabel("🏬 General Store")
        let Restaurant = new MessageButton().setStyle("blurple").setID("Restaurant").setLabel("🍱 Restaurant")
        var shopbuttonarray = [FoodStore, CyberCafe, GeneralStore, Restaurant]
        let OpenTheShop = new Discord.MessageEmbed()
        .setTitle(`WHAT TYPE OF SHOP DO YOU WANT TO OPEN?`)
        .setColor("#ff7900")
        .setDescription(`
        > There are different varieties of shop you can open
        > You can open any shop that is suitable to your needs
        > Please **note** that you shop cannot sell items that are not in your shop category
        > You also cannot have more than 1 shop so choose wisely.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        let OpenShopButton = await message.channel.send({ embed: OpenTheShop, buttons: shopbuttonarray });
        const collector = OpenShopButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
        collector.on("collect", (b) => {
        /////////// Code By Kotlin#0427
        b.reply.defer()
        if(b.id == "FoodStore"){
        let OpenFoodStore = new MessageButton().setStyle("green").setID("agreed").setLabel("💸 AGREED")
        let GoBack = new MessageButton().setStyle("blurple").setID("GoBack").setLabel("⏩ Choose Another")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        var shopbuttonarray = [OpenFoodStore, GoBack, followrabbit, followkotlin]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A FOOD STORE YOU AGREE TO`)
        .setColor("#ff25c3")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **Food store** is a simple shop where you sell food related items. it's fast easy and
        > Very sufficient to people looking for ingredients to cook delicious meals. **(¬‿¬)**
        > Please **note** it will cost you **$280,000.00** to get a **food store** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        } if(b.id == "GoBack"){
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A FOOD STORE YOU AGREE TO`)
        .setColor("#ff25c3")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **Food store** is a simple shop where you sell food related items. it's fast easy and
        > Very sufficient to people looking for ingredients to cook delicious meals. **(¬‿¬)**
        > Please **note** it will cost you **$280,000.00** to get a **food store** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.delete({ embed: ShopOpen, buttons: shopbuttonarray })
        return NotAShopOwner();
        } else if(b.id == "agreed"){
        let TotaalShopPrice = 280000;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, HasShop, username, shopowner_color, cardtype) VALUES ('" + message.author.id + "', '0', '0', '0', '" + message.author.username + "', '#ff0000', '1');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to get a shop\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(TotaalShopPrice) <= toFixed(result[0].balance)){
        let shopId = 1;
        let buytheproduct = 'UPDATE economy SET balance = balance-' + TotaalShopPrice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updateshop = 'UPDATE economy SET HasShop = ' + shopId + ' WHERE userId = ' + message.author.id + '';
        sql.query(updateshop);
        let shopbought = new MessageButton().setDisabled().setStyle("green").setLabel("✔ SHOP BOUGHT").setID("bought")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
        var shopbuttonarray = [shopbought, followrabbit, followkotlin, voterabbit]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`YOUR SHOP SPACE HAS BEEN SUCCESSFULLY BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > You shop is now opened check it with \`${prefix}shop\`
        > But we cannot sell an empty product where there's nothing inside can we?
        > To start selling visit the global market with \`${prefix}globalmarket\` to buy shop items.
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        const shopOpened = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just opened a **food shop** they are now a shop owner.\n You can check out their shop with \`${prefix}store @${message.author.username}\``)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(shopOpened);
        } else { 
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelpurchase = new MessageButton().setStyle("red").setID("cancelPurchase").setLabel("Cancel Purchase")
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS TO OPEN A SHOP`)
        .setColor("#ff3e3e")
        .setDescription(`
        > **${message.author.username}** you don't have enough money to open a shop
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: cancelpurchase });
        });   
        }
        });
        } else if(b.id == "CyberCafe"){
        let OpenCyberCafe = new MessageButton().setStyle("green").setID("Cfagreed").setLabel("💸 AGREED")
        let GoBack = new MessageButton().setStyle("blurple").setID("GoBack").setLabel("⏩ Choose Another")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        var shopbuttonarray = [OpenCyberCafe, GoBack, followrabbit, followkotlin]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A CYBER CAFE YOU AGREE TO`)
        .setColor("#FF0070")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **Cyber Cafe** is a simple well managed shop for selling light meals and drinks.
        > Very sufficient to people looking to drink and get layed or so I think **(>‿◠)**
        > Please **note** it will cost you **$346,000.00** to get a **cyber cafe** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        } if(b.id == "GoBack"){
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A CYBER CAFE YOU AGREE TO`)
        .setColor("#ff25c3")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **Cyber Cafe** is a simple well managed shop for selling light meals and drinks.
        > Very sufficient to people looking to drink and get layed or so I think **(>‿◠)**
        > Please **note** it will cost you **$346,000.00** to get a **cyber cafe** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.delete({ embed: ShopOpen, buttons: shopbuttonarray })
        return NotAShopOwner();
        } else if(b.id == "Cfagreed"){
        let TotaalShopPrice = 346000;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, HasShop, username, shopowner_color) VALUES ('" + message.author.id + "', '0', '0', '0', '" + message.author.username + "', '#ff0000');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(TotaalShopPrice) <= toFixed(result[0].balance)){
        let shopId = 2;
        let buytheproduct = 'UPDATE economy SET balance = balance-' + TotaalShopPrice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updateshop = 'UPDATE economy SET HasShop = ' + shopId + ' WHERE userId = ' + message.author.id + '';
        sql.query(updateshop);
        let shopbought = new MessageButton().setDisabled().setStyle("green").setLabel("✔ SHOP BOUGHT").setID("bought")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
        var shopbuttonarray = [shopbought, followrabbit, followkotlin, voterabbit]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`YOUR CAFE SPACE HAS BEEN SUCCESSFULLY BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > You cafe is now opened check it with \`${prefix}shop\`
        > But we cannot sell an empty product where there's nothing inside can we?
        > To start selling visit the global market with \`${prefix}globalmarket\` to buy shop items.
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        const shopOpened = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just opened a **cafe shop** they are now a shop owner.\n You can check out their shop with \`${prefix}shop @${message.author.username}\``)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(shopOpened);
        } else { 
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelpurchase = new MessageButton().setStyle("red").setID("cancelPurchase").setLabel("Cancel Purchase")
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS TO OPEN A SHOP`)
        .setColor("#ff3e3e")
        .setDescription(`
        > **${message.author.username}** you don't have enough money to open a shop
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: cancelpurchase });
        });   
        }
        });
        } else if(b.id == "GeneralStore"){
        let OpenGeneralStore = new MessageButton().setStyle("green").setID("Gagreed").setLabel("💸 AGREED")
        let GoBack = new MessageButton().setStyle("blurple").setID("GoBack").setLabel("⏩ Choose Another")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        var shopbuttonarray = [OpenGeneralStore, GoBack, followrabbit, followkotlin]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A GENERAL STORE YOU AGREE TO`)
        .setColor("#00ffd7")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **General Store** is a market where you can sell any and all the products
        > Very attractive to those looking to make large amount of money **(✿◠‿◠)**
        > Please **note** it will cost you **$780,000.00** to get a **general store** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        } if(b.id == "GoBack"){
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A GENERAL STORE YOU AGREE TO`)
        .setColor("#ff25c3")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **General Store** is a market where you can sell any and all the products
        > Very sufficient to people to make large amount of money and get rich **(✿◠‿◠)**
        > Please **note** it will cost you **$780,000.00** to get a **general store** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.delete({ embed: ShopOpen, buttons: shopbuttonarray })
        return NotAShopOwner();
        } else if(b.id == "Gagreed"){
        let TotaalShopPrice = 780000;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, HasShop, username, shopowner_color) VALUES ('" + message.author.id + "', '0', '0', '0', '" + message.author.username + "', '#ff0000');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(TotaalShopPrice) <= toFixed(result[0].balance)){
        let shopId = 3;
        let buytheproduct = 'UPDATE economy SET balance = balance-' + TotaalShopPrice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updateshop = 'UPDATE economy SET HasShop = ' + shopId + ' WHERE userId = ' + message.author.id + '';
        sql.query(updateshop);
        let shopbought = new MessageButton().setDisabled().setStyle("green").setLabel("✔ SHOP BOUGHT").setID("bought")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
        var shopbuttonarray = [shopbought, followrabbit, followkotlin, voterabbit]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`YOUR GENERAL STORE HAS BEEN SUCCESSFULLY BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > You general store is now opened check it with \`${prefix}shop\`
        > But we cannot sell an empty product where there's nothing inside can we?
        > To start selling visit the global market with \`${prefix}globalmarket\` to buy shop items.
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        const shopOpened = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just opened a **general store** they are now a shop owner.\n You can check out their shop with \`${prefix}shop @${message.author.username}\``)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(shopOpened);
        } else { 
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelpurchase = new MessageButton().setStyle("red").setID("cancelPurchase").setLabel("Cancel Purchase")
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS TO OPEN A SHOP`)
        .setColor("#ff3e3e")
        .setDescription(`
        > **${message.author.username}** you don't have enough money to open a shop
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: cancelpurchase });
        });   
        }
        });
        } else if(b.id == "Restaurant"){
        let OpenFoodStore = new MessageButton().setStyle("green").setID("Rgreed").setLabel("💸 AGREED")
        let GoBack = new MessageButton().setStyle("blurple").setID("GoBack").setLabel("⏩ Choose Another")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        var shopbuttonarray = [OpenFoodStore, GoBack, followrabbit, followkotlin]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A RESTAURANT YOU AGREE TO`)
        .setColor("#ff5900")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **Restaurant** a place where people pay to sit and eat meals that are cooked.
        > Very attractive to those looking for quick food to eat when hungry **(ɔ◔‿◔)ɔ**
        > Please **note** it will cost you **$548,000.00** to get a **restaurant** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        } if(b.id == "GoBack"){
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`BY OPENING A RESTAURANT YOU AGREE TO`)
        .setColor("#ff5900")
        .setDescription(`
        > **1** \`Honesty\` Be honest in what you do and always help others

        > **2** \`Don't Ignore\` Don't ignore someone who's seeking help or just want to chat

        > **3** \`Perceive\` Don't look down on others because of your position as a person

        > **4** \`Good Hearted\` Be greatful, truthful, helpful and try to be kind **^_^**

        > **5** \`kindhearted\` Try to have a kind and sympathetic nature. can be very helpful

        > **PS** You also agree that you have enough money in your bank balance.

        > **Restaurant** a place where people pay to sit and eat meals that are cooked.
        > Very attractive to those looking for quick food to eat when hungry **(ɔ◔‿◔)ɔ**
        > Please **note** it will cost you **$548,000.00** to get a **restaurant** space.
        `)
        .setTimestamp()
        .setFooter(`Developed By Kotlin#0427`, message.guild.iconURL());
        OpenShopButton.delete({ embed: ShopOpen, buttons: shopbuttonarray })
        return NotAShopOwner();
        } else if(b.id == "Rgreed"){
        let TotaalShopPrice = 548000;
        let b = sql.query("SELECT `balance` FROM `economy` WHERE `userId` = ?;", message.author.id, function (err, result, fields){
        if (Object.keys(result).length === 0) {
        let register ="INSERT INTO economy (userId, balance, bank, HasShop, username, shopowner_color) VALUES ('" + message.author.id + "', '0', '0', '0', '" + message.author.username + "', '#ff0000');";
        sql.query(register)
        let NoAccount = new Discord.MessageEmbed()
        .setColor('#e53637')
        .setThumbnail(message.author.avatarURL({ dynamic:true }))
        .setAuthor(message.author.tag)
        .setDescription("You don't have an account to buy this product\n**fortunately I'v opened an account for you.**")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(NoAccount);
        } else if (toFixed(TotaalShopPrice) <= toFixed(result[0].balance)){
        let shopId = 4;
        let buytheproduct = 'UPDATE economy SET balance = balance-' + TotaalShopPrice + ' WHERE userId = ' + message.author.id + '';
        sql.query(buytheproduct);
        let updateshop = 'UPDATE economy SET HasShop = ' + shopId + ' WHERE userId = ' + message.author.id + '';
        sql.query(updateshop);
        let shopbought = new MessageButton().setDisabled().setStyle("green").setLabel("✔ SHOP BOUGHT").setID("bought")
        let followrabbit = new MessageButton().setStyle("url").setLabel("FOLLOW").setURL("https://web.fumigram.com/Rabbit")
        let followkotlin = new MessageButton().setStyle("url").setLabel("FOLLOW KOTLIN").setURL("https://web.fumigram.com/Andrew/")
        let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE").setURL("https://discordbotlist.com/bots/rabbit-1895")
        var shopbuttonarray = [shopbought, followrabbit, followkotlin, voterabbit]
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`YOUR RESTAURANT HAS BEEN SUCCESSFULLY BOUGHT`)
        .setColor("#00ff7e")
        .setDescription(`
        > You restaurant is now opened check it with \`${prefix}shop\`
        > But we cannot sell an empty product where there's nothing inside can we?
        > To start selling visit the global market with \`${prefix}globalmarket\` to buy shop items.
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: shopbuttonarray });
        const shopOpened = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** just opened a **restaurant** they are now a shop owner.\n You can check out their shop with \`${prefix}shop @${message.author.username}\``)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        log.send(shopOpened);
        } else { 
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance); 
        let cancelpurchase = new MessageButton().setStyle("red").setID("cancelPurchase").setLabel("Cancel Purchase")
        let ShopOpen = new Discord.MessageEmbed()
        .setTitle(`INSUFFICENT FUNDS TO OPEN A SHOP`)
        .setColor("#ff3e3e")
        .setDescription(`
        > **${message.author.username}** you don't have enough money to open a shop
        > Earn some money and come back. for now you currently have: **${LowBalance}<:dollars:881559643820793917>**
        `)
        OpenShopButton.edit({ embed: ShopOpen, buttons: cancelpurchase });
        });   
        }
        });
        } else if(b.id == "cancelPurchase"){
        let ShopOpen = new Discord.MessageEmbed()
        .setColor("#6f6f6f")
        .setTitle(`THE PURCHASE HAS BEEN CANCELED`)
        .setDescription(`
        > The shop order has been officially **canceled**
        > You can open a new shop with \`${prefix}getshop\`
        > If you like this rabbit consider [voting](https://discordbotlist.com/bots/rabbit-1895) for him
        > You can support the developement of this bot [here](https://donatebot.io/checkout/696724967907393537)
        `)
        var buttonarray = new MessageButton()
        buttonarray = buttonarray.setDisabled().setStyle("gray").setLabel("✔ CLOSED").setID("cancelled")
        OpenShopButton.edit({ embed: ShopOpen, buttons: buttonarray });
        }
        });
        })();
        });
        });
        }
        NotAShopOwner();
        } else if (UserHasShop == 1) {
        (async () => {
        const AlreadyHasShop = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> YOU ALREADY HAVE A FOOD STORE!")
        .setDescription(`You might need to close down the **store** in order to open a new shop\n**Note:** closing down a shop will result in lost of money I cannot say how much.`);
        return await message.channel.send(AlreadyHasShop);
        })();
        } else if (UserHasShop == 2) {
        (async () => {
        const AlreadyHasShop = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> YOU ALREADY HAVE A CYBER CAFE!")
        .setDescription(`You might need to close down the **store** in order to open a new shop\n**Note:** closing down a shop will result in lost of money I cannot say how much.`);
        return await message.channel.send(AlreadyHasShop);
        })();
        } else if (UserHasShop == 3) {
        (async () => {
        const AlreadyHasShop = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> YOU ALREADY HAVE A GENERAL STORE!")
        .setDescription(`You might need to close down the **store** in order to open a new shop\n**Note:** closing down a shop will result in lost of money I cannot say how much.`);
        return await message.channel.send(AlreadyHasShop);
        })();
        } else if (UserHasShop == 4) {
        (async () => {
        const AlreadyHasShop = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> YOU ALREADY HAVE A RESTAURANT!")
        .setDescription(`You might need to close down the **store** in order to open a new shop\n**Note:** closing down a shop will result in lost of money I cannot say how much.`);
        return await message.channel.send(AlreadyHasShop);
        })();
        }
        });
        }
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