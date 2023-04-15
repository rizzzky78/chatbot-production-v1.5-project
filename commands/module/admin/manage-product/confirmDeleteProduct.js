const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message, metaData } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["delete-product"],
  category: "admin",
  description: "Hapus produk di database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
      await Admin.deleteProduct(args[0])
        .then(async (res) => {
          if (res.status === "success") {
            let text =
              `*Hapus Produk Berhasil!*\n\n` +
              `Produk dengan ID ${args[0]} telah berhasil dihapus dari Katalog Produk!\n\n`;
            return client.sendMessage(msg.from, {
              caption: text,
              video: metaData.gifPlayback.deleteSuccess,
              gifPlayback: true,
              footer: "Klik tombol dibawah untuk mengakses menu lainnya",
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Dashboard Admin",
                    id: prefix + "admin",
                  },
                },
                {
                  index: 2,
                  quickReplyButton: {
                    displayText: "Katalog",
                    id: prefix + "catalog",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            });
          } else {
            return msg.reply(message.hasError);
          }
        })
        .catch((err) => {
          console.error(err);
          return msg.reply(message.hasError);
        });
    }
  },
};
