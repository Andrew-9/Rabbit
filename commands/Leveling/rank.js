const Discord = require("discord.js");
const sql = require("../../utilities/database");
const canvacord = require("canvacord");

module.exports = {
  name: "rank",
  aliases: [""],
  description: "Check your current ranking",
  category: "Leveling",
  usage: "rank <user>",
  run: async (client, message, args) => {
    try {
      let card = sql.query("SELECT cardtype FROM ranking WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
        if (result[0].cardtype == 0) {
          let con = sql.query("SELECT `enabled` FROM `ranking` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
            if (result[0].enabled == 0) {
            const RankNotEnabled = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> RANKING SYSTEM NOT ENABLED")
            .setDescription(`The ranking system of this server is not **enabled**\nContact the admins of the server to enable it.`)
            return message.lineReply(RankNotEnabled);  
            } else if (result[0].enabled == 1) {
            (async () => {
            let pingeduser = await message.mentions.members.first() || message.author;
            if (message.author === pingeduser) {
            /////////       ///////////////
            let card = sql.query("SELECT cardtype FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            if(result == 0) { 
            let register ="INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0','0',' " + message.author.username + "', '0', '1');";
            sql.query(register)
            let NoAccount = new Discord.MessageEmbed()
            .setColor('#e53637')
            .setThumbnail(message.author.avatarURL({ dynamic:true }))
            .setAuthor(message.author.tag)
            .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you\nYou can run the command again`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(NoAccount);
            } else if (result[0].cardtype == 1) {
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
            let rankuser = message.author;
            if (!rankuser) {
            const NoUser = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKUSER!")
            .setDescription(`Give me a user to load their rank`)
            return message.lineReply(NoUser);
            }
            if(rankuser.bot) {
            const NoRankForBots = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> NO RANK FOR BOTS!")
            .setDescription(`It's a **bot** and bots can't have ranks`)
            return message.lineReply(NoRankForBots);
            }
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
            let con = sql.query("SELECT `embedEnable`, `backgroundimage`, `cardColor` FROM `ranking` WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].embedEnable == 0) { 
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let Rcolor = result[0].cardColor;
            if (Rcolor == null) { Rcolor = "#ff6100" }
            let status = rankuser.presence.status;
            if (status === "dnd") { color = Rcolor; }
            else if (status === "online") { color = Rcolor; }
            else if (status === "idle") { color = Rcolor; }
            else { status = "streaming"; color = Rcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = `${result[0].backgroundimage}`;
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
            return;
            });
            } else if (result[0].embedEnable == 1) {         
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let Rcolor = result[0].cardColor;
            if (Rcolor == null) { Rcolor = "#ff6100" }
            let status = rankuser.presence.status;
            if (status === "dnd") { color = Rcolor; }
            else if (status === "online") { color = Rcolor; }
            else if (status === "idle") { color = Rcolor; }
            else { status = "streaming"; color = Rcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = `${result[0].backgroundimage}`;
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            const embed = new Discord.MessageEmbed()
            .setTitle(`Ranking of:  ${rankuser.tag}`)
            .setColor(color)
            .setImage("attachment://RankCard.png")
            .attachFiles(attachment)
            message.channel.send(embed).catch(e => console.log("ranking: " + e));
            return;
            });
            }
          });
          // end
          } else if (result[0].cardtype == 2) {
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
            let rankuser = message.mentions.users.first() || message.author;
            if (!rankuser) {
            const NoUser = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKUSER!")
            .setDescription(`Give me a user to load their rank`)
            return message.lineReply(NoUser);
            }
            if(rankuser.bot) {
            const NoRankForBots = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> NO RANK FOR BOTS!")
            .setDescription(`It's a **bot** and bots can't have ranks`)
            return message.lineReply(NoRankForBots);
            }
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
            let con = sql.query("SELECT embed, backgroundimage, rankColor FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            if(result[0].embed == 0) { 
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let URcolor = result[0].rankColor;
            if (URcolor == null || URcolor == 0) { URcolor = "#ff9900" }
            let status = rankuser.presence.status;
            if (status === "dnd") { color = URcolor; }
            else if (status === "online") { color = URcolor; }
            else if (status === "idle") { color = URcolor; }
            else { status = "streaming"; color = URcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = result[0].backgroundimage;
            if (CardBackground == 0 || CardBackground == null) { CardBackground = "https://media.discordapp.net/attachments/711910361133219903/893616626040201256/Idle3.jpg" }
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
            return;
            });
            } else if (result[0].embed == 1) {         
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let URcolor = result[0].rankColor;
            if (URcolor == null || URcolor == 0) { URcolor = "#ff9900" }
            let status = rankuser.presence.status;
            if (status === "dnd") { color = URcolor; }
            else if (status === "online") { color = URcolor; }
            else if (status === "idle") { color = URcolor; }
            else { status = "streaming"; color = URcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = result[0].backgroundimage;
            if (CardBackground == 0 || CardBackground == null) { CardBackground = "https://media.discordapp.net/attachments/711910361133219903/893616626040201256/Idle3.jpg" }
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            const embed = new Discord.MessageEmbed()
            .setTitle(`RANKING OF:  ${rankuser.tag.toUpperCase()}`)
            .setColor(color)
            .setImage("attachment://RankCard.png")
            .attachFiles(attachment)
            message.channel.send(embed).catch(e => console.log("ranking: " + e));
            return;
            });
            }
            });
            //// End
            }
            })
            //////////////////////  Pinged User   //////////////////////
            } else if (pingeduser) {
            let pingeduser = message.mentions.users.first();
            /////////       ///////////////
            let card = sql.query("SELECT cardtype FROM economy WHERE userId = ?;", pingeduser.id, function (err, result, fields) {
              if(result == 0) { 
            let register ="INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, cardtype) VALUES ('" + pingeduser.id + "', '0', '0','0',' " + pingeduser.username + "', '0', '1');";
            sql.query(register)
            let NoAccount = new Discord.MessageEmbed()
            .setColor('#e53637')
            .setThumbnail(pingeduser.avatarURL({ dynamic:true }))
            .setAuthor(pingeduser.tag)
            .setDescription(`**${pingeduser.username}** did not have an account.\nfortunately one has been opened for them\nYou can run the command again`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(NoAccount);
            } else if (result[0].cardtype == 1) {
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
            let rankuser = message.mentions.users.first() || message.author;
            if (!rankuser) {
            const NoUser = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKUSER!")
            .setDescription(`Give me a user to load their rank`)
            return message.lineReply(NoUser);
            }
            if(rankuser.bot) {
            const NoRankForBots = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> NO RANK FOR BOTS!")
            .setDescription(`It's a **bot** and bots can't have ranks`)
            return message.lineReply(NoRankForBots);
            }
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
            let con = sql.query("SELECT `embedEnable`, `backgroundimage`, `cardColor` FROM `ranking` WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].embedEnable == 0) { 
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let Rcolor = result[0].cardColor;
            let status = rankuser.presence.status;
            if (Rcolor == null) { Rcolor = "#ff6100" }
            if (status === "dnd") { color = Rcolor; }
            else if (status === "online") { color = Rcolor; }
            else if (status === "idle") { color = Rcolor; }
            else { status = "streaming"; color = Rcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = `${result[0].backgroundimage}`;
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
            return;
            });
            } else if (result[0].embedEnable == 1) {         
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let Rcolor = result[0].cardColor;
            let status = rankuser.presence.status;
            if (Rcolor == null) { Rcolor = "#ff6100" }
            if (status === "dnd") { color = Rcolor; }
            else if (status === "online") { color = Rcolor; }
            else if (status === "idle") { color = Rcolor; }
            else { status = "streaming"; color = Rcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = `${result[0].backgroundimage}`;
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            const embed = new Discord.MessageEmbed()
            .setTitle(`Ranking of:  ${rankuser.tag}`)
            .setColor(color)
            .setImage("attachment://RankCard.png")
            .attachFiles(attachment)
            message.channel.send(embed).catch(e => console.log("ranking: " + e));
            return;
            });
            }
          });
          // end
          } else if (result[0].cardtype == 2) {
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
            let rankuser = message.mentions.users.first() || message.author;
            if (!rankuser) {
            const NoUser = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> PLEASE ADD A RANKUSER!")
            .setDescription(`Give me a user to load their rank`)
            return message.lineReply(NoUser);
            }
            if(rankuser.bot) {
            const NoRankForBots = new Discord.MessageEmbed()
            .setColor("#e63064")
            .setTitle("<:xvector:869193619318382602> NO RANK FOR BOTS!")
            .setDescription(`It's a **bot** and bots can't have ranks`)
            return message.lineReply(NoRankForBots);
            }
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
            let con = sql.query("SELECT embed, backgroundimage, rankColor FROM economy WHERE userId = ?;", pingeduser.id, function (err, result, fields) {
            if(result[0].embed == 0) { 
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let URcolor = result[0].rankColor;
            let status = rankuser.presence.status;
            if (URcolor == null || URcolor == 0) { URcolor = "#ff9900" }
            if (status === "dnd") { color = URcolor; }
            else if (status === "online") { color = URcolor; }
            else if (status === "idle") { color = URcolor; }
            else { status = "streaming"; color = URcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = result[0].backgroundimage;
            if (CardBackground == 0 || CardBackground == null) { CardBackground = "https://media.discordapp.net/attachments/711910361133219903/893616626040201256/Idle3.jpg" }
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
            return;
            });
            } else if (result[0].embed == 1) {         
            let curpoints = Number(client.points.get(key, `points`).toFixed(2));
            let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
            //if not level == no rank
            if (client.points.get(key, `level`) === undefined) i = `No Rank`;
            let color;
            let URcolor = result[0].rankColor;
            let status = rankuser.presence.status;
            if (URcolor == null || URcolor == 0) { URcolor = "#ff9900" }
            if (status === "dnd") { color = URcolor; }
            else if (status === "online") { color = URcolor; }
            else if (status === "idle") { color = URcolor; }
            else { status = "streaming"; color = URcolor; }
            const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({dynamic: false,format: 'png'}))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, true, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
            let CardBackground = result[0].backgroundimage;
            if (CardBackground == 0 || CardBackground == null) { CardBackground = "https://media.discordapp.net/attachments/711910361133219903/893616626040201256/Idle3.jpg" }
            rank.setBackground("IMAGE", CardBackground)
            rank.build()
            .then(async data => {   
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            const embed = new Discord.MessageEmbed()
            .setTitle(`RANKING OF:  ${rankuser.tag.toUpperCase()}`)
            .setColor(color)
            .setImage("attachment://RankCard.png")
            .attachFiles(attachment)
            message.channel.send(embed).catch(e => console.log("ranking: " + e));
            return;
            });
            }
          });
          //// End
          }
          })
          }
        })();
        }
        });
        } else if (result[0].cardtype == 1) {
          const working = new Discord.MessageEmbed()
          .setColor("#ff7900")
          .setTitle("<:errorcode:868245243357712384> WOKING ON IT....!")
          .setDescription("This Feature is been worked on\nPlease use the default rank card")
          .setFooter("kotlin is working on this rank card")
          .setTimestamp();
          return message.lineReply(working);
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