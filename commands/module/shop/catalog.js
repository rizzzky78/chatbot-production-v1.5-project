const { message, metaData } = require("../../../config/global");
const Admin = require("@libs/controllers/shopHandler");
const { herbsProduct } = require("../../../store/static/dataProduk");
const { infoMarketplace } = require("../../../config/marketplace");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["catalog"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: metaData.cooldownsCommand.catalog,
  callback: async ({ client, msg, prefix }) => {
    await Admin.getAllProduct()
      .then(async (dynamicProduct) => {
        if (dynamicProduct.length <= 0) {
          return client.sendMessage(msg.from, {
            caption: message.hasNoProducts,
            image: { url: metaData.templateData.emptyCatalog },
            footer: "Klik tombol dibawah untuk mengunduh Modul Panduan",
            templateButtons: [
              {
                index: 1,
                quickReplyButton: {
                  displayText: "Download Modul Panduan",
                  id: prefix + "modul admin",
                },
              },
            ],
            viewOnce: true,
            mentions: [msg.sender],
          });
        } else {
          let sections = [
            {
              title: "Katalog Produk Herbal - Dinamis (Cloud Database)",
              rows: [],
            },
            {
              title: "Katalog Produk Herbal - Statis (Local Storage)",
              rows: [],
            },
            {
              title: "Bantuan & Shortcut",
              rows: [
                {
                  title: "Buka Dashboard Marketplace",
                  rowId: prefix + "dashboard",
                  description: "Kembali dan buka dashboard marketplace",
                },
                {
                  title: "Hubungi Penjual",
                  rowId: prefix + "contact seller",
                  description:
                    "Kontak penjual untuk informasi produk lebih lanjut dan pemesanan",
                },
              ],
            },
            {
              title: "Butuh Informasi Lain?",
              rows: [
                {
                  title: "FAQ & Yang Mungkin Sedang Kamu Cari",
                  rowId: prefix + "guideinformation",
                  description: "FAQ, seputar Chatbot, dan demo/trial",
                },
              ],
            },
          ];

          const staticHerbsProduct = herbsProduct.map(
            (val) => ({
              title: val.name,
              rowId: prefix + "getstaticproduct" + " " + val.id,
              description: val.category,
            }),
            {}
          );
          const dynamicProducts = dynamicProduct.map(
            (val) => ({
              title: val.data.name,
              rowId: prefix + "getdynamicproduct" + " " + val.id,
              description: val.data.category,
            }),
            {}
          );
          sections[0].rows.push(...dynamicProducts);
          sections[1].rows.push(...staticHerbsProduct);

          return client
            .sendMessage(msg.from, {
              title: "Katalog Produk - Demo",
              text: infoMarketplace,
              footer: "Klik tombol dibawah untuk membuka Katalog",
              buttonText: "Katalog Produk",
              sections,
              viewOnce: true,
              mentions: [msg.sender],
            })
            .then(async () => {
              if (msg.senderNumber == metaData.admin.number) {
                return;
              } else {
                await Admin.updateStatistics("access-catalog", {
                  id: msg.senderNumber,
                  userName: msg.pushName ? msg.pushName : "Tidak ada Nama",
                });
              }
            });
        }
      })
      .catch((err) => {
        console.error(err);
        return msg.reply(message.hasError);
      });
  },
};
