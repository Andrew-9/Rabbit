const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");
const { MessageButton } = require('discord-buttons');
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const workdown = new Set();
module.exports = {
    name: "bail",
    aliases: [""],
    description: "Bail yourself out of jail",
    category: "Economy",
    usage: "bail",
    run: async (client, message, args) => {
        try {
            const prefix = guildPrefix.get(message.guild.id);
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => { 
                let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                if(result == 0) { 
                let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0', '1');";
                sql.query(register)
                let NoAccount = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setThumbnail(message.author.avatarURL({ dynamic:true }))
                .setAuthor(message.author.tag)
                .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you.`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                message.channel.send(NoAccount);
                } else { 
                let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                if (result[0].is_jailed == 1) {
                (async () => {
                var BailAmount = Math.floor(Math.random() *(95791)) + 0;
                let BailAmountTaken = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(BailAmount);
                ///////////////////////////////////////////////////////////////////////////////
                var SimpleBailAmount = Math.floor(Math.random() *(41871)) + 0;
                let TheBailTaken = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(SimpleBailAmount);
                let Protest = new MessageButton().setStyle("blurple").setID("Protest").setLabel("Protest")
                let breakout = new MessageButton().setStyle("red").setID("Breakout").setLabel("Break Out")
                let Bailyourself = new MessageButton().setStyle("green").setID("Bailyourself").setLabel("Bail Yourself")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [Protest, breakout, Bailyourself, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setTitle(`WHAT DO YOU WANT TO DO?`)
                .setColor("#ff25c3")
                .setDescription(`
                > **PROTEST:** Protest against it and prove that you're innocent .**(✿◠‿◠)**
                > **BREAK OUT:** Break out prison in style and get away with it. **(¬‿¬)**
                > **BAIL YOURSELF:** Bail yourself out of jail nicely with **Bank Balance** only. **(>‿◠)**
                > **NOTE** If you protest and loose the **case** amount to bail yourself will be **doubled.**
                `)
                .setTimestamp()
                .setFooter(`Developed By Kotlin#0427`, config.avatarUrl);
                let TheBailButton = await message.channel.send({ embed: bailembed, buttons: bailbuttonarray });
                const collector = TheBailButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
                collector.on("collect", (b) => {
                /////////// Code By Kotlin#0427
                b.reply.defer()
                if(b.id == "Protest"){
                function Protest(){
                var succesrate = Math.floor(Math.random() * (3-0)) + 0;
                if (succesrate == '0'){
                const rand1 = ["You told the judge that you're innocent and called a withnes. the judge set you free ", "You told the judge about your story and show proof of your innocence. the judge set you free ", "You played the **shy type** and pretended to be sick. the judge let you go ", "You threatened the judge to kill his family and the judge set you free ", "You used boys to kidnap the judge's wife and threatened to kill her. the judge set you free ", "You used your family's power on the judge and was set free ", "You threatened the judge saying you would tell his wife that he was cheating on her. the judge set you free "];
                randomNumber1 = rand1[Math.floor(Math.random() * rand1.length)];
                let beenfreed = new MessageButton().setDisabled().setStyle("green").setID("freed").setLabel("You are freed")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [beenfreed, serverbutton, voterabbit]
                let sql3 = 'UPDATE economy SET is_jailed = ' + 0 +' WHERE userId = ' + message.author.id + '';
                sql.query(sql3);
                let bailembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${randomNumber1}`)
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                }
                if (succesrate == '1'){
                const rand2 = ["You called your family and they contacted the judge to let you go ", "You used your connections and was set free ", "You had an alibi who was there to help you and was set free ", "You used your parents connections on the judge and was set free ", "You contacted the **dpo** of the prison and he let you go "];
                randomNumber2 = rand2[Math.floor(Math.random() * rand2.length)];
                let beenfreed = new MessageButton().setDisabled().setStyle("green").setID("freed1").setLabel("You are freed")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [beenfreed, serverbutton, voterabbit]
                let sql3 = 'UPDATE economy SET is_jailed = ' + 0 +' WHERE userId = ' + message.author.id + '';
                sql.query(sql3);
                let bailembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${randomNumber2}`);
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                }
                if (succesrate == '2'){
                const rand3 = ["You were found guilty of charge for the crimes you committed and was totally **JAILED** ", "You tried using your connections but they abandoned you and for that you were **JAILED** ", "You do not have an alibi to help you and for that you were **JAILED** ", "You tried to your parents connections but no response and for that you were **JAILED** "];
                randomNumber3 = rand3[Math.floor(Math.random() * rand3.length)];
                let Bailyourself = new MessageButton().setStyle("blurple").setID("JailedBailyourself").setLabel("Bail Yourself")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [Bailyourself, serverbutton, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${randomNumber3}`)
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                }
                }
                Protest();
                } 
                else if(b.id == "Breakout"){
                function Breakout(){
                var succesrate = Math.floor(Math.random() * (1-0)) + 0;
                if (succesrate == '0'){
                const rand1 = ["You beat down the patrol guards stole the keys and successfully left the prison ", "You called a guard over and **ram** his head on the prison bars nocking him out and stole the keys ", "You stole a gun from the police guards shooting and running you broke out successfully ", "You framed sickness and as a guard came to help, you knocked him out stealing the keys you broke out ", "You lied to the police guard that there's fire in the sell.\nthe guard rushing to check it out fell and drop the keys.\nyou stole it and knocked him out then broke out of prsion", "You somehow started a fire in the sell. smoke rushing out a guard comes and opens the door\n first thing he recieved was a blow in the face falling down he passed out. \nyou then ran out the prsion climbing the walls and escaped"];
                randomNumber1 = rand1[Math.floor(Math.random() * rand1.length)];
                let brokeout = new MessageButton().setDisabled().setStyle("green").setID("freed").setLabel("You Broke Out")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [brokeout, serverbutton, voterabbit]
                let sql3 = 'UPDATE economy SET is_jailed = ' + 0 +' WHERE userId = ' + message.author.id + '';
                sql.query(sql3);
                let bailembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${randomNumber1}`)
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                }
                if (succesrate == '1'){
                const rand2 = ["You tried to beat down the patrol guards but got slamed against the walls **Nice try** ", "You called a guard over and tried to ram his head on the prison bars but he caught your hands **Nice try** ", "You stole a gun from the police guards and tried to shoot him but no bullet inside **Nice try** ", "You framed sickness and as a guard came to help, you tried to beat him up but he used his gun to knock you out **Nice try** ", "You lied to the police guard that there's fire in the sell.\nthe guard rushing to check it out he drop the keys.\nyou tired to steal it but another guard caught you. **Nice try**"];
                randomNumber2 = rand2[Math.floor(Math.random() * rand2.length)];
                let nicetry = new MessageButton().setDisabled().setStyle("red").setID("nicetry").setLabel("Nice Try")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [nicetry, serverbutton, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${randomNumber2}`);
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                }
                }
                Breakout();
                } else if(b.id == "JailedBailyourself"){
                let isJailedfee = new MessageButton().setStyle("green").setID("payfee").setLabel("💸 PAY THE FEE")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [isJailedfee, serverbutton, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setColor("00f7ff")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`Because you weren't successfully in your protest\nYou'll need to pay a total amount of **${BailAmountTaken}**<:dollars:881559643820793917>`);
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                } else if(b.id == "payfee"){
                let sql4 = 'UPDATE economy SET bank = bank-' + BailAmount + ' WHERE userId = ' + message.author.id + '';
                sql.query(sql4);
                let sql6 = 'UPDATE economy SET is_jailed = ' + 0 +' WHERE userId = ' + message.author.id + '';
                sql.query(sql6);
                let freeee = new MessageButton().setDisabled().setStyle("green").setID("freee").setLabel("YOU ARE FEE")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [freeee, serverbutton, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setColor("#00ffbf")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`Successfully payed a total amount of **${BailAmountTaken}**<:dollars:881559643820793917>\nYou are now free to go. try not to get caught again *Guards laughs hahah*`);
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                const BailedMoney = new Discord.MessageEmbed()
                .setColor('#0e53e7')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`**${message.author.username}** payed a total amount of **${BailAmountTaken}<:dollars:881559643820793917>**\nTo get out of prison. they are now **free**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                log.send(BailedMoney);
                } else if(b.id == "Bailyourself"){ 
                let paybailfee = new MessageButton().setStyle("green").setID("paybailfee").setLabel("💸 PAY THE FEE")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [paybailfee, serverbutton, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setColor("#00f7ff")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`In order to leave this prison you'll need to pay a total amount of **${TheBailTaken}**<:dollars:881559643820793917>`);
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                } else if(b.id == "paybailfee"){
                let sql4 = 'UPDATE economy SET bank = bank-' + SimpleBailAmount + ' WHERE userId = ' + message.author.id + '';
                sql.query(sql4);
                let sql6 = 'UPDATE economy SET is_jailed = ' + 0 +' WHERE userId = ' + message.author.id + '';
                sql.query(sql6);
                let freeee = new MessageButton().setDisabled().setStyle("green").setID("freee").setLabel("YOU ARE FEE")
                let serverbutton = new MessageButton().setStyle("url").setLabel("SUPPORT SERVER").setURL("https://discord.gg/ghdvMDVFse")
                let voterabbit = new MessageButton().setStyle("url").setLabel("VOTE FOR RABBIT").setURL("https://discord.boats/bot/734522699228905585")
                var bailbuttonarray = [freeee, serverbutton, voterabbit]
                let bailembed = new Discord.MessageEmbed()
                .setColor("#00ffbf")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`Successfully payed a total amount of **${TheBailTaken}**<:dollars:881559643820793917>\nYou are now free to go. try not to get caught again *Guards laughs hahah*`);
                TheBailButton.edit({ embed: bailembed, buttons: bailbuttonarray });
                const BailedMoney = new Discord.MessageEmbed()
                .setColor('#0e53e7')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`**${message.author.username}** payed a total amount of **${TheBailTaken}<:dollars:881559643820793917>**\n To get out of prison. they are now **free**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                log.send(BailedMoney);
                }
                })
               })();
                } else {
                const notInjail = new Discord.MessageEmbed()
                .setColor("#00defe")
                .setTitle("<:checkvector:869193650184269834> YOU ARE NOT IN JAIL!!")
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**${message.author.username}** you are not in jail at the moment.\nCommit a crime first with \`${prefix}crime\` to test your luck`)
                message.lineReply(notInjail);
                }
                });
                 
                }
                });
              });
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