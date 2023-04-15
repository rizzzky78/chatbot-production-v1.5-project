const { message, metaData } = require("../../../config/global");
const { herbsProduct } = require("../../../store/static/dataProduk");
const { getStaticProductByID } = require("../../../libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getstaticproduct"],
  category: "admin",
  description: "Get static data product from local database",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: metaData.cooldownsCommand.product,
  callback: async ({ client, msg, args, prefix }) => {
    const { id, name, price, category, stock, desc, imageUrl, timeStamp } =
      getStaticProductByID(args[0], herbsProduct);

    let text =
      `*${name}*\n#${id}\n\n` +
      `Stok: ${stock}\n` +
      `Harga : ${price}\n` +
      `Kategori : ${category}\n\n` +
      `Deskripsi :\n${desc}\n\n`;
    let templateUrl = `https://api.whatsapp.com/send/?phone=${metaData.admin.number}&text=Order+produk+dengan+ID+${args[0]}+\n${name}+\nberjumlah+*1*+(satu)+produk&type=phone_number&app_absent=0`;
    console.log(templateUrl);
    return client
      .sendMessage(msg.from, {
        caption: text,
        image: { url: imageUrl },
        footer: `produk terakhir diupload/diupdate pada:\n${timeStamp}`,
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
              url: templateUrl,
            },
          },
        ],
        viewOnce: true,
        mentions: [msg.sender],
      })
      .catch((err) => {
        console.err(err);
        return msg.reply(message.hasError);
      });
  },
};
