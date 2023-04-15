const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message, metaData } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["edithargaproduk"],
  category: "admin",
  description: "Mengedit 1 parameter produk",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    let arguments = args.join(" ");
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
      if (!arguments.split("#")[0]) {
        return msg.reply(message.wrongFormat.unfullFilled.ID);
      } else if (!arguments.split("#")[1]) {
        return msg.reply(message.wrongFormat.unfullFilled.price);
      } else if (arguments.split("#")[0] && arguments.split("#")[1]) {
        const dataProduct = await Admin.getProductByID(arguments.split('#')[0]);
        if (dataProduct == null || !dataProduct) {
          return msg.reply(message.noValidID);
        } else if (dataProduct) {
          await Admin.editPriceProduct(
            arguments.split("#")[0],
            arguments.split("#")[1]
          )
            .then(async (res) => {
              let texts =
                `*Edit Harga Produk Sukses!*\n\n` +
                `ID Produk: ${dataProduct.id}\n` +
                `Data Perubahan:\n${res.data.trim()}\n\n` +
                `Silahkan cek perubahan dengan mengakses Data Produk pada Katalog\n`;

              return client.sendMessage(msg.from, {
                caption: texts,
                video: metaData.gifPlayback.editSuccess,
                gifPlayback: true,
                footer: "Klik tombol dibawah untuk mengakses menu lainnya.",
                templateButtons: [
                  {
                    index: 1,
                    quickReplyButton: {
                      displayText: "Admin dashboard",
                      id: prefix + "admindashboard",
                    },
                  },
                  {
                    index: 2,
                    quickReplyButton: {
                      displayText: "Buka Katalog",
                      id: prefix + "catalog",
                    },
                  },
                  {
                    index: 3,
                    quickReplyButton: {
                      displayText: "Buka Produk",
                      id: prefix + `getdynamicproduct ${dataProduct.id}`,
                    },
                  },
                ],
                viewOnce: true,
                mentions: [msg.sender],
              });
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
