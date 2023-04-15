const { message, metaData } = require("../../../config/global");
const Admin = require("@libs/controllers/shopHandler");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getdynamicproduct"],
  category: "admin",
  description: "Get dynamic data product from database server",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: metaData.cooldownsCommand.product,
  callback: async ({ client, msg, args, prefix }) => {
    const dataProduct = await Admin.getProductByID(args[0]);
    const { name, price, category, stock, imageUrl, desc, timeStamp } =
      dataProduct.data;
    let text =
      `\n*${name}*\n#${dataProduct.id}\n\n` +
      `Stok: ${stock}\n` +
      `Harga : ${price}\n` +
      `Kategori : ${category}\n\n` +
      `Deskripsi :\n\n${desc}\n\n` +
      `\n`;

    return client
      .sendMessage(msg.from, {
        caption: text,
        image: { url: imageUrl },
        footer: `Produk terakhir diupload/diupdate pada:\n${timeStamp}`,
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
              id: prefix + "catalog",
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
      })
      .then(async () => {
        if (msg.senderNumber == metaData.admin.number) {
          return;
        } else {
          await Admin.updateStatistics(dataProduct.id, name, {
            id: msg.senderNumber,
            userName: msg.pushName ? msg.pushName : "Tidak ada Nama",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return msg.reply(message.hasError);
      });
  },
};
