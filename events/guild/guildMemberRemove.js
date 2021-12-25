const Discord = require("discord.js");
const Canvas = require("canvas");
const moment = require("moment");
const sql = require("../../utilities/database");
const chalk = require("chalk");

module.exports = async (client, member) => {
 try {
  // let c = sql.query("SELECT `guildId` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
  // if(result == 0) {
  // const sql5 = "INSERT INTO `leave` (`guildId`, `channelid`, `CustonChannelid`, `message`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + member.guild.id + ", '123456789', '123456789', ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29');";
  // sql.query(sql5, function (error, results, fields) {if (error) console.log(error);});
  // } else {
  // let con = sql.query("SELECT enabled FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
  // if(result[0].enabled == 0) {
  //  return;
  // } else if (result[0].enabled == 1) {
  // const sqlquery = "SELECT channelid AS res FROM `leave` WHERE guildId = " + member.guild.id;
  // sql.query(sqlquery, function (error, results, fields) {
  //  if (!results || results.length == 0) {return;}
  //  let bg = sql.query("SELECT background, message FROM `leave` WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
  //  (async () => {
  //   lsetup = await results[0].res;
  //   const channel = await member.guild.channels.cache.find((c) => c.id == lsetup && c.type == "text");
  //   if (!channel) return;
  //   function checkdays(date) {
  //    let now = new Date();
  //    let diff = now.getTime() - date.getTime();
  //    let days = Math.floor(diff / 86400000);
  //    return days + (days == 1 ? " day" : " days") + " ago";
  //   }
  //   Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
  //   const image = `${result[0].background}`;
  //   const canvas = Canvas.createCanvas(1772, 633);
  //   const ctx = canvas.getContext("2d");
  //   const background = await Canvas.loadImage(image);
  //   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  //   ctx.strokeStyle = "#f2f2f2";
  //   ctx.strokeRect(0, 0, canvas.width, canvas.height);
  //   var textString3 = `${member.user.username}`;
  //   if (textString3.length >= 14) {
  //    ctx.font = 'bold 150px "FengardoNeue"';
  //    ctx.fillStyle = "#f2f2f2";
  //    ctx.fillText(textString3, 720, canvas.height / 2 + 20); // User Name
  //   } else {
  //    ctx.font = 'bold 200px "FengardoNeue"';
  //    ctx.fillStyle = "#f2f2f2";
  //    ctx.fillText(textString3, 720, canvas.height / 2 + 25); // User Name
  //   }
  //   var textString2 = `#${member.user.discriminator}`;
  //   ctx.font = 'bold 40px "FengardoNeue"';
  //   ctx.fillStyle = "#f2f2f2";
  //   ctx.fillText(textString2, 730, canvas.height / 2 + 62); // User Tag
  //   var textString4 = `Member #${member.guild.memberCount}`;
  //   ctx.font = 'bold 60px "FengardoNeue"';
  //   ctx.fillStyle = "#f2f2f2";
  //   ctx.fillText(textString4, 720, canvas.height / 2 + 120); // Member Count
  //   var textString4 = `${member.guild.name}`;
  //   ctx.font = 'bold 70px "FengardoNeue"';
  //   ctx.fillStyle = "#f2f2f2";
  //   ctx.fillText(textString4, 720, canvas.height / 2 - 140); // Member Guild Name
  //   ctx.beginPath();
  //   ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
  //   ctx.closePath();
  //   ctx.clip();
  //   const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "jpg",size: 2048,}));
  //   ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  //   const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "goodbye.png");
  //   // console.log(member.user.joinedAt);
  //   const embed = new Discord.MessageEmbed()
  //    .setColor("#ff5151")
  //    .setTimestamp()
  //    .setFooter(`${member.guild.name}`, member.guild.iconURL({dynamic: true,format: "png",}))
  //    .setTitle(`${member.user.tag} Left ${member.guild.name}`)
  //    .setDescription(`${result[0].message}`)
  //    .setImage("attachment://goodbye.png")
  //    .attachFiles(attachment);
  //    channel.send(embed);
  //  })();
  // });
  // });
  // }
  // });
  // }
  // });
console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`User data deleted for: `) + chalk.blue.bold.underline(member.guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(member.guild.id));
 } catch (err) {
  //console.log(err);
 }
};
