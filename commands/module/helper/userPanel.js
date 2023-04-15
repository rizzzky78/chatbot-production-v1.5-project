const { message } = require("../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["guideinformation", "guide"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, prefix }) => {
    let sections = [
      {
        title: "Marketplace",
        rows: [
          {
            title: "Buka Dashboard Marketplace",
            rowId: prefix + "dashboard",
            description: "Buka dashboard utama Marketplace",
          },
          {
            title: "Download Modul Admin",
            rowId: prefix + "modul admin",
            description: "Modul panduan untuk Admin (pdf)",
          },
          {
            title: "Download Modul User",
            rowId: prefix + "modul user",
            description: "Modul panduan untuk User/Demo (pdf)",
          },
          {
            title: "Dashboard Admin",
            rowId: prefix + "adminpanel",
            description: "Lihat list perintah Admin",
          },
        ],
      },
      {
        title: "User/Trial",
        rows: [
          {
            title: "Dashboard User Demo",
            rowId: prefix + "dashboarduser",
            description: "Akses ke dashboard demo Kamu disini",
          },
          {
            title: "Hapus Data Saya",
            rowId: prefix + "hapusdatasaya",
            description: "Hapus semua data demo Kamu",
          },
        ],
      },
      {
        title: "FAQ / Pertanyaan Yang Mungkin Sama",
        rows: [
          {
            title: "Apa saja kegunaan Chatbot ini?",
            rowId: prefix + "question benefit",
          },
          {
            title: "Apakah Chatbot bisa berjalan 24 jam nonstop?",
            rowId: prefix + "question working",
          },
          {
            title: "Apakah bisa terbanned oleh pihak Whatsapp?",
            rowId: prefix + "question banned",
          },
          {
            title:
              "Saya gaptek, belum tentu bisa pakai Chatbot ini untuk kebutuhan bisnis online.",
            rowId: prefix + "question gaptek",
          },
        ],
      }, //
      {
        title: "Bantuan",
        rows: [
          {
            title: "Tentang Chatbot ini",
            rowId: prefix + "assister aboutchatbot",
            description: "Penasaran dengan Chatbot ini?",
          },
          {
            title: "Coba Demo/Trial",
            rowId: prefix + "assister demo",
            description: "Kamu bisa mencoba demo untuk penggunaan administrasi",
          },
          {
            title: "Kontak/Hubungi Developer",
            rowId: prefix + "contact developer",
            description:
              "Kamu bisa hubungi pengembang jika minat untuk memesan produk digital ini",
          },
        ],
      },
    ];

    return client
      .sendMessage(msg.from, {
        title: "Public Dashboard & Help",
        text: `*Hi ${msg.pushName}* 👋🏻\n\nDisini Kamu bisa mengakses keseluruhan Panel Menu tanpa harus repot mengulang dari Dashboard Utama\n\nHappy to use!`,
        footer: "Klik tombol dibawah untuk membuka list perintah",
        buttonText: "Public Dashboard",
        sections,
        viewOnce: true,
        mentions: [msg.sender],
      })
      .catch((err) => {
        console.err(err);
        return msg.reply(message.hasError);
      });
  },
};
