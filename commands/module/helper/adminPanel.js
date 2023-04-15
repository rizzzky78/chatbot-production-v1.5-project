const os = require("os");
const { Runtime } = require("../../../libs/functions/myFunc");
const { message } = require("../../../config/global");
const {
  adminHelperSelector,
} = require("../../../store/document/module.helper");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["adminhelp", "adminpanel"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const sections = [
      {
        title: "Introduction / Pengenalan Administrasi Menggunakan Chatbot",
        rows: [
          {
            title: "Kiat Untuk Admin",
            rowId: prefix + "adminpanel kiat",
            description:
              "Melihat bagaimana, cara kerja, serta alur administrasi",
          },
        ],
      },
      {
        title: "Fitur Manajemen (Admin)",
        rows: [
          {
            title: "Melihat List Data Admin (Owner only)",
            rowId: prefix + "getadminlist",
            description: "Lihat tata cara menambah Admin Chatbot Marketplace",
          },
          {
            title: "Cara Menambahkan Admin Baru (Owner only)",
            rowId: prefix + "makeadmin help",
            description: "Lihat tata cara menambah Admin Chatbot Marketplace",
          },
          {
            title: "Download Modul Panduan",
            rowId: prefix + "modul admin",
            description: "Download Panduan tata cara penggunaan (pdf)",
          },
          {
            title: "Edit Dashboard",
            rowId: prefix + "adminpanel dashboard",
            description: "Lihat tata cara mengedit laman dasboard Chatbot",
          },
          {
            title: "Upload Produk",
            rowId: prefix + "adminpanel addproduct",
            description: "Lihat tata cara mengupload produk ke Katalog",
          },
          {
            title: "Edit Produk",
            rowId: prefix + "adminpanel editproduct",
            description: "Lihat tata cara mengedit produk di Katalog",
          },
          {
            title: "Hapus Produk",
            rowId: prefix + "adminpanel deleteproduct",
            description: "Lihat tata cara menghapus produk pada Katalog",
          },
        ],
      },
      {
        title: "Bantuan Cara Mengedit Satu Parameter Produk (Admin)",
        rows: [
          {
            title: "Edit Nama Produk",
            rowId: prefix + "adminpanel editnames",
            description: "Cara mengedit Nama Produk",
          },
          {
            title: "Edit Harga Produk",
            rowId: prefix + "adminpanel editprices",
            description: "Cara mengedit Harga Produk",
          },
          {
            title: "Edit Katgori Produk",
            rowId: prefix + "adminpanel editcategory",
            description: "Cara mengedit Kategori Produk",
          },
          {
            title: "Edit Deskripsi Produk",
            rowId: prefix + "adminpanel editdescription",
            description: "Cara mengedit Deskripsi Produk",
          },
          {
            title: "Edit Gambar/Foto Produk",
            rowId: prefix + "adminpanel editpicture",
            description: "Cara mengedit Gambar Produk",
          },
        ],
      },
      {
        title: "FAQ",
        rows: [
          {
            title: "Bagaimana jika chatbot tidak merespon?",
            rowId: prefix + "adminpanel notresponse",
            description: "",
          },
          {
            title: "Bagaimana jika terjadi Error?",
            rowId: prefix + "adminpanel haserror",
            description: "",
          },
        ],
      },
    ];

    let text =
      `Hi ${msg.pushName}!\n\n` +
      `┏━❐  *Chatbot Info* \n` +
      `┃ ⌬ Hostname : ${os.hostname()}\n` +
      `┃ ⌬ Platform : ${os.platform()}\n` +
      `┃ ⏣ Total Ram Dipakai : ${(
        process.memoryUsage().heapUsed /
        1024 /
        1024
      ).toFixed(2)}MB / ${Math.round(
        require("os").totalmem / 1024 / 1024
      )}MB\n` +
      `┃ ⏣ Waktu Aktif : ${Runtime(process.uptime())}\n` +
      `┗━❐ \n\n` +
      `*Note:*\n` +
      `Terdapat beberapa perintah yang hanya dapat diakses oleh Admin.`;

    if (!args[0]) {
      return client
        .sendMessage(msg.from, {
          title: "Panel Dashboard Admin",
          text,
          footer: "Klik tombol dibawah untuk membuka list bantuan",
          buttonText: "USAGE INTRODUCTION",
          sections,
          viewOnce: true,
          mentions: [msg.sender],
        })
        .catch((error) => {
          console.error(error);
          return msg.reply(message.hasError);
        });
    } else if (args[0]) {
      const { caption, imgUrl } = adminHelperSelector(args[0]);
      return client
        .sendMessage(msg.from, {
          caption,
          image: { url: imgUrl },
          footer: "Klik tombol dibawah untuk memilih menu",
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Modul Panduan",
                id: prefix + "modul admin",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "Hubungi Developer",
                id: prefix + "contact developer",
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
