require("module-alias/register");
require("@libs/constants/prototype");

const logger = require("@libs/utils/logger");
const chalk = require("chalk");
const i18n = require("i18n");
const path = require("path");
const os = require("os");

const { Runtime } = require("./libs/functions/myFunc");

i18n.configure({
  locales: ["en", "id"],
  defaultLocale: "id",
  autoReload: true,
  directory: path.join(__dirname, "config", "locales"),
  objectNotation: true,
});

console.log(chalk.whiteBright("╭─── [ LOG ]"));
const { connect } = require("./libs/connect.lib");

process.on("uncaughtException", (err) => {
  console.error(JSON.stringify(err, null, 2));
  logger.error(err.message);
});

setInterval(() => {
  console.info(
    chalk.whiteBright("├"),
    chalk.keyword("aqua")(`[ STANBY ] `),
    chalk.whiteBright("Application Running, "),
    chalk.yellowBright(`Uptime: ${Runtime(process.uptime())}`)
  );
}, 1.8e6);

connect();
