const { WebhookClient, MessageEmbed } = require("discord.js");
const chalk = require("chalk");
module.exports = (client) => {
 try {
  function change_status(client) {
    client.user.setActivity(`
      !help | ${client.guilds.cache.size} Guilds | Serving ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users`,
      {     
        type: "PLAYING",
        status: "online"
      }
    );
  }
  //loop through the status per each 10 minutes
  setInterval(()=>{
    change_status(client);
  }, 15 * 1000);
  const datelog = new Date();
  currentDate = datelog.getDate();
  month = datelog.getMonth() + 1;
  year = datelog.getFullYear();
  hour = datelog.getHours();
  min = datelog.getMinutes();
  sec = datelog.getSeconds();
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.bold.cyan(" Generated at: " + chalk.blue.bold.underline(currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec)));
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag) + chalk.bold.cyan(" (ID: ") + chalk.bold.blue.underline(client.user.id) + chalk.bold.cyan(")!"));
 } catch (err) {
  console.log(err);
 }
};
