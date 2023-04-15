const { metaData } = require("../../../config/global");
const moment = require("moment-timezone");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "owner",
  description: "Join group by link.",
  minArgs: 1,
  expectedArgs: "<link>",
  example: "{prefix}{command} https://chat.whatsapp.com/xxxxxxxxxxxxxxxx",
  callback: async ({ msg, client, args }) => {
    if (!msg.senderNumber === metaData.developer.number) {
      return msg.reply(`${msg.pushName} Lu siapa peler.`);
    } else {
      return client
        .groupAcceptInvite(args[0].replace("https://chat.whatsapp.com/", ""))
        .then(() => {
          return msg.reply("Join success.");
        });
    }
  },
};
