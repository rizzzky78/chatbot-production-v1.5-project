const Owner = require("@libs/controllers/admin");
const { metaData, message } = require("../../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["appendadmin"],
  category: "admin",
  description: "Menambah Admin",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    if (!msg.senderNumber == metaData.admin.number) {
      return msg.reply(message.notOwner);
    } else {
      const Data = await Owner.newAdmin(args[0].trim());
      if (Data.status == "exist") {
        return msg.reply(message.hasRegasAdmin);
      } else if (Data.status == "new") {
        return client.sendMessage(msg.from, {
          text: `*Sukses!*\n\nData Informasi\nID: ${Data.Form.id}\nNomor wa.me${Data.Form.userNumber}\nTanggal: ${Data.Form.created}\n\nBerhasil dijadikan Admin Chatbot Marketplace\n\nKamu bisa melihat list Admin dengan perintah "!listadmin" atau mengklik tombol dibawah ini.`,
          footer: "Klik tombol dibawah untuk melihat semua data Admin",
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "List Data Admin",
                id: prefix + "getadminlist",
              },
            },
          ],
          viewOnce: true,
          mentions: [msg.sender],
        });
      }
    }
  },
};
