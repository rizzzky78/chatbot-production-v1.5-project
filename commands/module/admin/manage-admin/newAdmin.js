const { metaData, message } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["makeadmin", "adminbaru"],
  category: "admin",
  description: "Upload produk ke database katalog",
  callback: async ({ client, msg, args, prefix }) => {
    if (!msg.senderNumber == metaData.admin.number) {
      return msg.reply(message.notOwner);
    } else {
      if (args[0] === "help") {
        return msg.reply(message.howToAddAdmin);
      } else if (args[0] === "cancel") {
        return msg.reply(message.cancelAddAdmin);
      } else if (args[0].length <= 0) {
        return msg.reply("Nomor tidak valid!");
      } else if (args[0]) {
        return client
          .sendMessage(msg.from, {
            text: `\n*INFO*\n\nPromosikan Nomor wa.me/${args[0]} sebagai Admin Chatbot Marketplace\n\nNote:\n- pastikan nomor sudah benar\n- menjadikan nomor sebagai admin berarti dapat memanipulasi data pada Chatbot\n- nomor dapat dihapus sebagai Admin oleh Owner Marketplace\n`,
            footer: `Apakah Kamu ingin menjadikan Nomor tersebut menjadi Admin?`,
            templateButtons: [
              {
                index: 1,
                quickReplyButton: {
                  displayText: "Tidak",
                  id: prefix + "makeadmin cancel",
                },
              },
              {
                index: 2,
                quickReplyButton: {
                  displayText: "Ya",
                  id: prefix + `appendadmin ${args[0]}`,
                },
              },
            ],
            viewOnce: true,
            mentions: [msg.sender],
          })
          .catch((err) => {
            console.error(err);
            return msg.reply(message.hasError);
          });
      }
    }
  },
};
