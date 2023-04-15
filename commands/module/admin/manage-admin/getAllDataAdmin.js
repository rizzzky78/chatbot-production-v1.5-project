const Owner = require("@libs/controllers/admin");
const { metaData, message } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getadminlist", "listadmin"],
  category: "admin",
  description: "Ambil data Admin",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg }) => {
    if (!msg.senderNumber == metaData.admin.number) {
      return msg.reply(message.notOwner);
    } else {
      try {
        const Data = await Owner.getAllDataAdmin();
        if (!Data || Data == null) {
          return msg.reply("Kamu belum menambahkan Admin Chatbot Marketplace");
        } else if (Data) {
          let texts =
            `*List Data Admin*\n\n` +
            `Hints:\nKamu dapat menghapus Admin dengan cara "!hapusadmin ID Admin"\n*Kamu dapat menambahkannya kembali jika diperlukan.\n\n` +
            `${Data.map(
              (val) =>
                `ID: ${val.id}\nNomor: wa.me/${val.userNumber}\nTerdaftar:\n${val.created}\n`
            ).join("\n")}`;
          return msg.reply(texts);
        }
      } catch (err) {
        console.error(err);
        return msg.reply(message.hasError);
      }
    }
  },
};
