const { metaData, message } = require("../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "admin",
  description: "Upload produk ke database katalog",
  callback: async ({ client, msg, fullArgs }) => {
    if (fullArgs.length < 15) {
      return msg.reply("Setidaknya ada 5 kata atau lebih");
    } else {
      client
        .sendMessage(metaData.developer.numberID, {
          text: `Ada Review/Kritik dari seseorang nih!\n\nDari: ${msg.pushName}\nNomor: ${msg.senderNumber}\n\nReview/Kritiknya:\n${fullArgs}\n`,
        })
        .then(async () => {
          setTimeout(() => {
            return msg.reply(
              "Review/Kritikanmu telah disampaikan ke Developer!\nTerimakasih telah melakukan review terhadap sistem/produk digital Kami, cheers!"
            );
          }, 5000);
        });
    }
  },
};
