const Owner = require("@libs/controllers/admin");
const { metaData, message } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["hapusadmin"],
  category: "admin",
  description: "Menghapus Admin",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ msg, args }) => {
    if (!msg.senderNumber == metaData.admin.number) {
      return msg.reply(message.notOwner);
    } else if (!args[0]) {
      return msg.reply("Mohon masukan ID admin, untuk menghapus admin");
    } else {
      await Owner.getDataAdminByID(args[0])
        .then(async (data) => {
          if (data == null || !data) {
            return msg.reply(message.notValidIDAdmin);
          } else if (data) {
            await Owner.deleteAdmin(args[0]).then((res) => {
              console.log(res);
              return msg.reply(
                `*Hapus Admin Sukses!*\n\nID: ${args[0]}\nNomor: ${data.userNumber}\n`
              );
            });
          }
        })
        .catch((err) => {
          console.error(err);
          return msg.reply(message.hasError);
        });
    }
  },
};
