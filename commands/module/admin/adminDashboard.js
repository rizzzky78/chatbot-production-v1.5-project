const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message, metaData } = require("../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["admin", "admindashboard"],
  category: "admin",
  description: "Akses ke Dashboard Admin",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, prefix }) => {
    const adminData = await Owner.getDataAdmin(msg.senderNumber);
    if (adminData == null || !adminData) {
      return msg.reply(message.notRegasAdmin);
    } else if (adminData) {
      let texts =
        `*_Selamat Datang di Dashboard Admin ${msg.pushName}_* 👋🏻\n\n` +
        `Untuk mendapatkan data:\n` +
        `- Total Admin\n` +
        `- Total Produk\n` +
        `Untuk akses pada data diatas Kamu bisa mengakses List Bantuan pada tombol dibawah dan menuju pada perintah yang teredia\n\n` +
        `*Data Statistik Kunjungan (user)*\n` +
        `- Mengakses Dashboard\n` +
        `- Mengakses Produk\n\n` +
        `*Note*\n` +
        `Kamu bisa merekap semua Data Produk dengan mengklik tombol "Rekap Produk" kedalam bentuk tabel dan berekstensi PDF, dan juga dpaat melihat Data Statistik yang lebih lengkap (PDF) dengan mengklik tombol "Rekap Statistik", untuk melihat list bantuan yang ada Kamu dapat mengklik tombol "List Bantuan".\n`;

      return client
        .sendMessage(msg.from, {
          caption: texts,
          video: metaData.gifPlayback.adminDashboard,
          gifPlayback: true,
          footer: "Silahkan klik tombol dibawah ini untuk mengakses perintah.",
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Rekap Produk",
                id: prefix + "recap-data-products",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "Rekap Statistik",
                id: prefix + "recap-data-statistics",
              },
            },
            {
              index: 3,
              quickReplyButton: {
                displayText: "List Bantuan",
                id: prefix + "adminpanel",
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
  },
};
