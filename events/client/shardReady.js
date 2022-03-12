const chalk = require("chalk");
module.exports = (client, id) => {
    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`|| [${String(new Date).split(" ", 5).join(" ")}] || Shard #${id} Ready ||`));
}
