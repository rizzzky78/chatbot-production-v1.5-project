const { message } = require("../../../config/global");
const { readFileSync } = require("fs")
require('link-preview-js')
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args }) => {
    try {
      if (args[0] === "admin") {
        return await client.sendMessage(msg.from, {
          document: readFileSync("./store/pdf/modul-panduan-user.pdf"),
          fileName: "Modul Panduan Admin.pdf",
          mimetype: "application/pdf",
          viewOnce: true,
          mentions: [msg.sender],
        });
      } else if (args[0] === "user") {
        return await client.sendMessage(msg.from, {
          document: readFileSync("./store/pdf/modul-panduan-user.pdf"),
          fileName: "Modul Panduan User.pdf",
          mimetype: "application/pdf",
          viewOnce: true,
          mentions: [msg.sender],
        });
      }
    } catch (err) {
      console.error(err);
      return msg.reply(message.hasError);
    }
  },
};
