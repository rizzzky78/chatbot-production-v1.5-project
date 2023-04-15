const Shop = require("@libs/controllers/shop-handler/shopDataController");
const { trimString } = require("@libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getproduct"],
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    await Shop.getSingleProducts(args[0], args[1]).then(async (dataProduct) => {
      if (!dataProduct) {
        return; // something
      } else if (dataProduct) {
        const { nameProduct, price, category, stock, description, image } =
          dataProduct.data;
        return client.sendMessage(msg.from, {
          caption: `*${nameProduct}*\nID ${dataProduct.id}\n\nStok: ${stock}\nHarga: ${price}\nKategori: ${category}\n\nDeskripsi Produk: ${description}\n`,
          image: { url: image.url } ? { url: image.url } : image.base64,
          footer: `Produk terakhir diupload/diupdate pada:\n${dataProduct.timeStamp}`,
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Kontak Penjual",
                id: prefix + "contact seller",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "Buka Katalog",
                id: prefix + "catalog args[0]",
              },
            },
            {
              index: 3,
              urlButton: {
                displayText: "Order Sekarang",
                url: `https://api.whatsapp.com/send/?phone=${metaData.admin.number}&text=Halo+admin+Saya+ingin+membeli+produk+dengan\n+\nID+${dataProduct.id}\nNama+Produk+${name}+\nJumlah+1+produk\n\nDitunggu+ya+min+😁&type=phone_number&app_absent=0`,
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        });
      }
    });
  },
};
