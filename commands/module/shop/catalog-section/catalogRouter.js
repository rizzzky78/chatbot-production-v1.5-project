const Shop = require("@libs/controllers/shop-handler/shopDataController");
const { trimString } = require("@libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["select-catalog"],
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    return client.sendMessage(msg.from, {
      title: "Katalog Produk",
      text: "blablabla...",
      footer: "Silahkan klik tombol dibawah untuk membuka Katalog Produk",
      buttonText: "Katalog Produk",
      viewOnce: true,
      mentions: [msg.sender],
      sections: [
        {
          title: "List Katalog Produk",
          rows: [
            {
              title: "Katalog Produk Herbal Suplemen",
              rowId: "select-catalog herbal",
              description: "...",
            },
            {
              title: "Katalog Produk Herbal Beverages",
              rowId: "select-catalog beverages",
              description: "...",
            },
            {
              title: "Katalog Produk Herbal Kosmetik",
              rowId: "select-catalog cosmetics",
              description: "...",
            },
          ],
        },
      ],
    });
  },
};
