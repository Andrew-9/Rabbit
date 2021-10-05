const moment = require("moment");
const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
module.exports = {
    name: "profile",
    aliases: [""],
    description: "Shows your profile and other members Profile",
    category: "Economy",
    usage: "profile <user>",
    run: async (client, message, args) => {
        try {
            const rankuser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
            let badges = await rankuser.user.flags;
            badges = await badges.toArray();
            let newbadges = [];
            badges.forEach((m) => {
             newbadges.push(m.replace("_", " "));
            });
            let con = sql.query("SELECT `enabled` FROM `ranking` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
            let isEnabled = result[0].enabled
            if (isEnabled == 0) {
            const RankNotEnabled = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> RANKING SYSTEM NOT ENABLED")
            .setDescription(`*The ranking system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
            .setTimestamp();
            return message.lineReply(RankNotEnabled);  
            } else if (isEnabled == 1) {
            let con = sql.query("SELECT `enabled` FROM `economy_ward` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
            let EisEnabled = result[0].enabled
            if (EisEnabled == 0) {
            const EcoNotEnabled = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> ECONOMY SYSTEM NOT ENABLED")
            .setDescription(`*The economical system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
            .setTimestamp();
            return message.lineReply(EcoNotEnabled); 
            } else if (EisEnabled == 1) {
            if (message.member === rankuser) {
            const prefix = guildPrefix.get(message.guild.id);      
            let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
            if(result == 0) { 
            let register ="INSERT INTO economy (userId, balance, bank, username, bal_color, is_jailed) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '#00efff', '0');";
            sql.query(register)
            let NoAccount = new Discord.MessageEmbed()
            .setColor('#e53637')
            .setThumbnail(message.author.avatarURL({ dynamic:true }))
            .setAuthor(message.author.tag)
            .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(NoAccount);
            } else {
            function databasing(rankuser) {
            if (rankuser && rankuser.bot) return;
            client.points.ensure(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, {
            user: rankuser ? rankuser.id : message.author.id,
            usertag: rankuser ? rankuser.tag : message.author.tag,
            xpcounter: 1,
            guild: message.guild.id,
            points: 0,
            neededpoints: 500,
            level: 0,
            oldmessage: "",
            });
            client.points.set(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, rankuser ? rankuser.tag : message.author.tag, `usertag`); //set the usertag with EVERY message, if he has nitro his tag might change ;)
            client.points.set(message.guild.id, 1, `setglobalxpcounter`);
            }
            databasing(); 
            //Call the databasing function!
            const key = `${message.guild.id}-${rankuser.id}`;
            databasing(rankuser);
            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            const top10 = sorted.splice(0, message.guild.memberCount);
            let i = 0;
            //count server rank sometimes an error comes
            for (const data of top10) {
              try {
                i++;
                if (data.user === rankuser.id) break;
              } catch {
                i = `Error counting Rank`;
                break;
              }
            }
            function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let b = sql.query("SELECT balance, bank, sales_balance, bal_color, is_jailed, buyer, fish, crime, work, HasShop FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            let Balance = result[0].balance;
            let BankBalance = result[0].bank;
            let SalesBalance = result[0].sales_balance;
            let AuthorColor = result[0].bal_color;
            let totalbalance = Balance * BankBalance + SalesBalance;
            let IsJailed = result[0].is_jailed;
            let UserHasShop = result[0].HasShop;
            let ABuyer = result[0].buyer;
            let AFisher = result[0].fish;
            let ACriminal = result[0].crime;
            let AWoker = result[0].work;
            if (IsJailed == 0) IsJailed = "NO"
            let formattedBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Balance);
            let formattedBankBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(BankBalance);
            let formattedSalesBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(SalesBalance);
            if (IsJailed == 1) IsJailed = "YES"
            if (UserHasShop == 0) UserHasShop = "NO SHOP :no_entry_sign:"
            if (UserHasShop == 1) UserHasShop = "A FOOD STORE :blueberries:"
            if (UserHasShop == 2) UserHasShop = "A CYBER CAFE :coffee:"
            if (UserHasShop == 3) UserHasShop = "A GENERAL STORE :department_store:"
            if (UserHasShop == 4) UserHasShop = "A RESTAURANT :bento:"
            // /// Titles 1
            // if (ABuyer == 0) ABuyer = "Not a buyer"
            // if (AWoker == 0) AWoker = "Not a Worker"
            // if (AFisher == 0) AFisher = "Haven't fished yet"
            // if (ACriminal == 0) ACriminal = "Not a law breaker"
            
            // /// Titles 2
            // if (ABuyer == 5) ABuyer = "Buyer"
            // else "Not a buyer"
            // if (AWoker == 5) AWoker = "Worker"
            // else "Not a Worker"
            // if (AFisher == 5) AFisher = "Fisher"
            // else "Haven't fished yet"
            // if (ACriminal == 5) ACriminal = "Criminal"
            // else "Not a law breaker"
            //  /// Titles 3
            // if (ABuyer >= 10) ABuyer = "Buyer"
            // if (AWoker >= 10) AWoker = "Worker"
            // if (AFisher >= 10) AFisher = "Fisher"
            // if (ACriminal >= 10) ACriminal = "Criminal"
            // /// Titles 4
            // if (ABuyer >= 50) ABuyer = "Good Buyer"
            // if (AWoker >= 50) AWoker = "True Worker"
            // if (AFisher >= 50) AFisher = "Good Fisher"
            // if (ACriminal >= 50) ACriminal = "Light Criminal"
            // /// Titles 5
            // if (ABuyer >= 100) ABuyer = "Trusted Buyer"
            // if (AWoker >= 100) AWoker = "Workaholic"
            // if (AFisher >= 100) AFisher = "Recommended Fisher"
            // if (ACriminal >= 100) ACriminal = "A True Criminal"
            //  /// Titles 6
            // if (ABuyer >= 200) ABuyer = "Professional Buyer"
            // if (AWoker >= 200) AWoker = "Professional Worker"
            // if (AFisher >= 200) AFisher = "Professional Fisher"
            // if (ACriminal >= 200) ACriminal = "Professional Criminal"
            const profile = new Discord.MessageEmbed()
            .setColor(AuthorColor)
            .setAuthor(`${message.author.username.toUpperCase()}'S PROFILE`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`
            <:bluebullet:887635391866372106> **PROGRESS**
            <:bluebullet:887635391866372106> **RANK:** ${Number(i)}
            <:bluebullet:887635391866372106> **LEVEL:** ${Number(client.points.get(key, `level`))}
            <:bluebullet:887635391866372106> **CURRENT XP:** ${Number(curpoints.toFixed(2))}
            <:bluebullet:887635391866372106> **REQUIRED XP:** ${Number(curnextlevel.toFixed(2))}

            <:bluebullet:887635391866372106>  **STATS**
            <:bluebullet:887635391866372106> **BANK:** ${formattedBankBalance}:bank:
            <:bluebullet:887635391866372106> **BALANCE:** ${formattedBalance}<:dollars:881559643820793917>
            <:bluebullet:887635391866372106> **IS JAILED:** ${IsJailed}:no_pedestrians:

            <:bluebullet:887635391866372106> **SALES BALANCE:** ${formattedSalesBalance}:money_with_wings:
            <:bluebullet:887635391866372106> **SHOP OWNER OF:** ${UserHasShop}
            
            <:bluebullet:887635391866372106> **DISCORD STATS**
            <:bluebullet:887635391866372106> **BADGES:** ${newbadges.join(", ").toUpperCase() || "None"}
            <:bluebullet:887635391866372106> **JOINED AT:** ${moment(rankuser.user.joinedAt).format("LLLL")}
            <:bluebullet:887635391866372106> **DISCRIMINATOR:** #${rankuser.user.discriminator}
            <:bluebullet:887635391866372106> **ACCOUNT CREATED AT:** ${moment(rankuser.user.createdAt).format("LLLL")}
            `)
            .setFooter(`AVAILABLE BALANCE: ${formattedBalance}`, config.avatarUrl)
            .setTimestamp();
            message.channel.send(profile);
            // <:bluebullet:887635391866372106> **ECONOMY TITLES**
            // <:bluebullet:887635391866372106> **${ABuyer.toUpperCase()}**
            // <:bluebullet:887635391866372106> **${AWoker.toUpperCase()}**
            // <:bluebullet:887635391866372106> **${AFisher.toUpperCase()}**
            // <:bluebullet:887635391866372106> **${ACriminal.toUpperCase()}**
           });
          }    
         });
        
        } else if (rankuser) {  
            let rankuser = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.rankuser.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
            if (!rankuser) {
            const NoUser = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> PLEASE ADD A USER!")
            .setDescription(`*Give me a user to load their profile*`)
            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
            .setTimestamp();
            return message.lineReply(NoUser);
            } else if(rankuser.bot) {
            const NoRankForBots = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> NO PROFILE FOR BOTS!")
            .setDescription(`*It's a **bot** and bots can't have profiles*`)
            .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
            .setTimestamp();
            return message.lineReply(NoRankForBots);
            } 
            let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", rankuser.id, function (err, result, fields){
            if(result == 0) { 
            let register ="INSERT INTO economy (userId, balance, bank, username, bal_color, is_jailed, cardtype) VALUES ('" + rankuser.id + "', '0', '0',' " + rankuser.username + "', '#00efff', '0', '1');";
            sql.query(register)
            let NoAccount = new Discord.MessageEmbed()
            .setColor('#e53637')
            .setThumbnail(rankuser.avatarURL({ dynamic:true }))
            .setAuthor(rankuser.tag)
            .setDescription(`**${rankuser.username}** did not have an account.\nfortunately one has been opened them\nRun the command again to view their profile`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(NoAccount);
            } else {
            function databasing(rankuser) {
            if (rankuser && rankuser.bot) return;
            client.points.ensure(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, {
            user: rankuser ? rankuser.id : message.author.id,
            usertag: rankuser ? rankuser.tag : message.author.tag,
            xpcounter: 1,
            guild: message.guild.id,
            points: 0,
            neededpoints: 500,
            level: 0,
            oldmessage: "",
            });
            client.points.set(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, rankuser ? rankuser.tag : message.author.tag, `usertag`); //set the usertag with EVERY message, if he has nitro his tag might change ;)
            client.points.set(message.guild.id, 1, `setglobalxpcounter`);
            }
            databasing(); 
            //Call the databasing function!
            const key = `${message.guild.id}-${rankuser.id}`;
            databasing(rankuser);
            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            const top10 = sorted.splice(0, message.guild.memberCount);
            let i = 0;
            //count server rank sometimes an error comes
            for (const data of top10) {
              try {
                i++;
                if (data.user === rankuser.id) break;
              } catch {
                i = `Error counting Rank`;
                break;
              }
            }
            function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let b = sql.query("SELECT balance, bank, sales_balance, bal_color, is_jailed, HasShop FROM economy WHERE userId = ?;", rankuser.id, function (err, result, fields) {
            let Balance = result[0].balance;
            let BankBalance = result[0].bank;
            let SalesBalance = result[0].sales_balance;
            let AuthorColor = result[0].bal_color;
            let totalbalance = Balance * BankBalance + SalesBalance;
            let IsJailed = result[0].is_jailed;
            let UserHasShop = result[0].HasShop;
            if (IsJailed == 0) IsJailed = "NO"
            let formattedBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Balance);
            let formattedBankBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(BankBalance);
            let formattedSalesBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(SalesBalance);
            if (IsJailed == 1) IsJailed = "YES"
            if (UserHasShop == 0) UserHasShop = "NO SHOP :no_entry_sign:"
            if (UserHasShop == 1) UserHasShop = "A FOOD STORE :blueberries:"
            if (UserHasShop == 2) UserHasShop = "A CYBER CAFE :coffee:"
            if (UserHasShop == 3) UserHasShop = "A GENERAL STORE :department_store:"
            if (UserHasShop == 4) UserHasShop = "A RESTAURANT :bento:"
            /// Titles 1
            // if (ABuyer == 0) ABuyer = "Not a buyer"
            // if (AWoker == 0) AWoker = "Not a Worker"
            // if (AFisher == 0) AFisher = "Haven't fished yet"
            // if (ACriminal == 0) ACriminal = "Not a law breaker"
            // /// Titles 2
            // if (ABuyer == 5) ABuyer = "Buyer"
            // if (AWoker == 5) AWoker = "Worker"
            // if (AFisher == 5) AFisher = "Fisher"
            // if (ACriminal == 5) ACriminal = "Criminal"
            //  /// Titles 3
            // if (ABuyer == 10) ABuyer = "Buyer"
            // if (AWoker == 10) AWoker = "Worker"
            // if (AFisher == 10) AFisher = "Fisher"
            // if (ACriminal == 10) ACriminal = "Criminal"
            // /// Titles 4
            // if (ABuyer == 50) ABuyer = "Trusted Buyer"
            // if (AWoker == 50) AWoker = "True Worker"
            // if (AFisher == 50) AFisher = "Good Fisher"
            // if (ACriminal == 50) ACriminal = "Light Criminal"
            // /// Titles 5
            // if (ABuyer == 100) ABuyer = "Trusted Buyer"
            // if (AWoker == 100) AWoker = "Workaholic"
            // if (AFisher == 100) AFisher = "Recommended Fisher"
            // if (ACriminal == 100) ACriminal = "A True Criminal"
            //  /// Titles 6
            // if (ABuyer == 200) ABuyer = "Professional Buyer"
            // if (AWoker == 200) AWoker = "Professional Worker"
            // if (AFisher == 200) AFisher = "Professional Fisher"
            // if (ACriminal == 200) ACriminal = "Professional Criminal"
            const profile = new Discord.MessageEmbed()
            .setColor(AuthorColor)
            .setAuthor(`${rankuser.username.toUpperCase()}'S PROFILE`, rankuser.displayAvatarURL())
            .setThumbnail(rankuser.displayAvatarURL())
            .setDescription(`
            <:bluebullet:887635391866372106> **PROGRESS**
            <:bluebullet:887635391866372106> **RANK:** ${Number(i)}
            <:bluebullet:887635391866372106> **LEVEL:** ${Number(client.points.get(key, `level`))}
            <:bluebullet:887635391866372106> **CURRENT XP:** ${Number(curpoints.toFixed(2))}
            <:bluebullet:887635391866372106> **REQUIRED XP:** ${Number(curnextlevel.toFixed(2))}

            <:bluebullet:887635391866372106> **STATS**
            <:bluebullet:887635391866372106> **BANK:** ${formattedBankBalance}:bank:
            <:bluebullet:887635391866372106> **BALANCE:** ${formattedBalance}<:dollars:881559643820793917>
            <:bluebullet:887635391866372106> **IS JAILED:** ${IsJailed}:no_pedestrians:
            <:bluebullet:887635391866372106> **SALES BALANCE:** ${formattedSalesBalance}:money_with_wings:
            <:bluebullet:887635391866372106> **SHOP OWNER OF:** ${UserHasShop}
            
            <:bluebullet:887635391866372106> **DISCORD STATS**
            <:bluebullet:887635391866372106> **BADGES:** ${newbadges.join(", ").toUpperCase() || "None"}
            <:bluebullet:887635391866372106> **JOINED AT:** ${moment(rankuser.joinedAt).format("LLLL")}
            <:bluebullet:887635391866372106> **DISCRIMINATOR:** #${rankuser.discriminator}
            <:bluebullet:887635391866372106> **ACCOUNT CREATED AT:** ${moment(rankuser.createdAt).format("LLLL")}
            `)
            .setFooter(`AVAILABLE BALANCE: ${formattedBalance}`, config.avatarUrl)
            .setTimestamp();
            message.channel.send(profile);
           });
          }    
         });
        
         } 
        } 
        });
        }
        });
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