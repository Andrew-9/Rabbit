const chalk = require("chalk");
module.exports = client => {
    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Reconnceting at ${new Date()}.`));
}