const Discord = require("discord.js");
const chalk = require("chalk");
const sql = require("../utilities/database");

module.exports = function (client, guild) {
  const description = {
    name: "Rabbit leveling",
    filename: "ranking.js",
    version: "2.3"
  }

  client.on("message", async (message) => {
    let con = sql.query("SELECT guildId FROM ranking WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
    if(result == 0) { 
      const sql2 = "INSERT INTO `ranking` (`guildId`, `enabled`, `embedEnable`, `cardtype`, `backgroundimage`) VALUES (" + message.guild.id + ", '0', '1', '0', 'lib/img/rank.jpg');";
      sql.query(sql2, function (error, results, fields) {if (error) console.log(error);});
    } else {
    let con = sql.query("SELECT enabled FROM ranking WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
      if (result[0].enabled == 0) {
        return;
      } else if (result[0].enabled == 1) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.channel.type === `dm`) return;
        const key = `${message.guild.id}-${message.author.id}`;
        /**
        * @info General databasing, which sets the userinto the database if he types something
        */
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
          client.points.set(message.guild.id, 1, `setglobalxpcounter`); //set points to 0
        }
        databasing();
        function anti_double_messages() {
          const oldmessage = client.points.get(key, `oldmessage`);
          if (oldmessage.toLowerCase() === message.content.toLowerCase().replace(/\s+/g, '')) {
            return;
          }
          client.points.set(key, message.content.toLowerCase().replace(/\s+/g, ''), `oldmessage`);
        }
        anti_double_messages();
        function Giving_Ranking_Points(thekey, maxnumber) {
          let setglobalxpcounter = client.points.get(message.guild.id, "setglobalxpcounter")
          if (!maxnumber) maxnumber = 10;
          var randomnum = (Math.floor(Math.random() * Number(maxnumber)) + 5) * setglobalxpcounter;
          randomnum *= Number(client.points.get(key, `xpcounter`));
          randomnum = Number(Math.floor(randomnum));

          const curPoints = client.points.get(thekey ? thekey : key, `points`);
          const neededPoints = client.points.get(thekey ? thekey : key, `neededpoints`);
          let leftpoints = neededPoints - curPoints;

          let toaddpoints = randomnum;
          addingpoints(toaddpoints, leftpoints);

          function addingpoints(toaddpoints, leftpoints) {
            if (toaddpoints >= leftpoints) {
              client.points.set(thekey ? thekey : key, 0, `points`); //set points to 0
              client.points.inc(thekey ? thekey : key, `level`); //add 1 to level    
              //HARDING UP!
              const newLevel = client.points.get(thekey ? thekey : key, `level`); //get current NEW level 
              if (newLevel % 4 === 0) client.points.math(thekey ? thekey : key, `+`, 100, `neededpoints`)
              const newneededPoints = client.points.get(thekey ? thekey : key, `neededpoints`); //get NEW needed Points
              const newPoints = client.points.get(thekey ? thekey : key, `points`); //get current NEW points
              addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
              if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)
              var LevelAward = Math.floor(Math.random() * (5001)) + 0;
              let RecievedReward = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(LevelAward);
              message.reply(`You've just advanced to level **${newLevel}!**\nAnd have been awarded with **${RecievedReward}<:dollars:881559643820793917>**`); //Award the user for their effots
              let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
                const logsetup = results[0].res; //Try logging the action that just took place
                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                if (!log) return;
                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => {
                  let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    if (result == 0) { //check if the user is in the Database
                      let register = "INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
                      sql.query(register)
                      let NoAccount = new Discord.MessageEmbed()
                      .setColor('#e53637')
                      .setThumbnail(message.author.avatarURL({ dynamic: true }))
                      .setAuthor(message.author.tag)
                      .setDescription("You don't have an account.\n**I opened one for you.**\nBut unfortunately this means you \nwill not receive the rewards for leveling up.")
                      .setTimestamp()
                      .setFooter(message.guild.name, message.guild.iconURL());
                      message.channel.send(NoAccount); //if not register the user.. NOTE: this will only work if an economical ward system is enabled on the server
                    } else {
                      let sql5 = 'UPDATE economy SET balance = balance+' + LevelAward + ' WHERE userId = ' + message.author.id + ''; //Update the users balance and add the reward
                      sql.query(sql5);
                      let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) { //let's log the action and the user's balance
                      let TotalBalance = result[0].balance
                      let LTotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(TotalBalance);
                      const LevelAwards = new Discord.MessageEmbed()
                      .setColor('#125bf8')
                      .setAuthor(message.author.tag, message.author.avatarURL())
                      .setDescription(`**${message.author.username}** was awarded with **${RecievedReward}<:dollars:881559643820793917>** for leveling up.\nUser now has a total of **${LTotalBalance}<:dollars:881559643820793917>** in their balance`)
                      .setThumbnail(message.author.displayAvatarURL())
                      .setTimestamp()
                      .setFooter(message.guild.name, message.guild.iconURL());
                      log.send(LevelAwards); //logging
                      });
                    }
                  });
                });
              })
            } else {
              client.points.math(thekey ? thekey : key, `+`, Number(toaddpoints), `points`)
            }
          }
        }
        Giving_Ranking_Points();
      }
    });
    }
    });
  })
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Successfully Loaded: ${description.name}`));
}