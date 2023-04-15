const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message } = require("../../../config/global");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["editdashboard"],
  category: "admin",
  description: "Mengedit dashboard",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, prefix, fullArgs }) => {
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
      if (fullArgs.length < 10) {
        return msg.reply("Kata-kata yang Kamu masukan terlalu pendek");
      } else if (fullArgs.length > 10) {
        await Admin.editDataDashboard(fullArgs)
          .then(async (res) => {
            let texts =
              `*Edit Dashboard Sukses!*\n\n` + `${res.data.captionText}\n`;
            return client.sendMessage(msg.from, {
              text: texts,
              footer: "Klik tombol dibawah untuk mengakses Dashboard",
              templateButtons: [
                {
                  index: 1,
                  quickReplyButton: {
                    displayText: "Buka Dashboard",
                    id: prefix + "dashboard",
                  },
                },
              ],
              viewOnce: true,
              mentions: [msg.sender],
            });
          })
          .catch((err) => {
            console.error(err);
            return msg.reply(message.hasError);
          });
      }
    }
  },
};
