const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["hapusproduk"],
  category: "admin",
  description: "Hapus produk di database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
      if (!args[0]) {
        return msg.reply(message.wrongFormat.delete);
      } else if (args[0] === "cancel") {
        return msg.reply(message.cancelDeleteProduct);
      } else {
        const dataProduct = await Admin.getProductByID(args[0].trim());
        if (dataProduct == null || !dataProduct) {
          return msg.reply(message.noValidID);
        } else if (dataProduct) {
          const { name, price, category, stock, imageUrl, desc } =
            dataProduct.data;
          let text =
            `*KONFIRMASI HAPUS PRODUK*\n` +
            `\n*${name}*\n#${dataProduct.id}\n\n` +
            `Stok: ${stock}\n` +
            `Harga : ${price}\n` +
            `Kategori : ${category}\n\n` +
            `Deskripsi :\n${desc}\n\n` +
            `\n`;

          return client
            .sendMessage(msg.from, {
              caption: text,
              image: { url: imageUrl },
              footer: "Apakah Kamu ingin menghapus produk tersebut?",
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Tidak",
                    id: prefix + "hapusproduk cancel",
                  },
                },
                {
                  index: 2,
                  quickReplyButton: {
                    displayText: "Ya",
                    id: prefix + `delete-product ${dataProduct.id}`,
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
    }
  },
};
