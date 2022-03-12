const chalk = require("chalk");
module.exports = client => {
    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`You have been disconnected at ${new Date()}.`));
}
