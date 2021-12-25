const Discord = require("discord.js");
const sql = require("../../utilities/database");
module.exports = {
  name: "balance",
  aliases: ["bal"],
  description: "Shows Current Balance",
  category: "Economy",
  usage: "balance <username> or <nickname> or <mention> or <ID(optional)>",
  accessableby: "everyone",

  run: async (client, message, args) => {
    try {
      let b = sql.query("SELECT balance, bank, sales_balance, gold, bal_color FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        if (Object.keys(result).length === 0) {
          let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, cardtype, buyer, shop_reward) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "', '1', '0', '0');";
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
          let Balance = result[0].balance;
          let BankBalance = result[0].bank;
          let goldcoin = result[0].gold;
          let SalesBalance = result[0].sales_balance;
          let AuthorColor = result[0].bal_color;
          let formattedBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Balance);
          let formattedBankBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(BankBalance);
          let formattedSalesBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(SalesBalance);
          let formattedGoldCoins = new Intl.NumberFormat("en-US").format(goldcoin);
          let balEmbed = new Discord.MessageEmbed()
          .setColor(AuthorColor)
          .setAuthor(`${message.author.username.toUpperCase()}'S | BALANCE`)
          .setThumbnail(message.author.avatarURL({dynamic: true}))
          .addFields({name: '<:dollars:881559643820793917> Balance | ',value: formattedBalance, inline: true}, {name: '🏦 Bank | ',value: formattedBankBalance, inline: true}, {name: '💸 Sales Balance',value: formattedSalesBalance, inline: true})
          message.channel.send(balEmbed);
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