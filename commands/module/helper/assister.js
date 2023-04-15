const { metaData } = require("../../../config/global");
const { assisterSelector } = require("../../../store/document/module.helper");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const { caption, imgUrl } = assisterSelector(args[0]);

    return client.sendMessage(msg.from, {
      caption,
      image: { url: imgUrl },
      footer: "Klik tombol dibawah untuk mendownload Modul Panduan.",
      templateButtons: [
        {
          index: 1,
          quickReplyButton: {
            displayText: "Modul Admin",
            id: prefix + "modul admin",
          },
        },
        {
          index: 2,
          quickReplyButton: {
            displayText: "Modul User",
            id: prefix + "modul user",
          },
        },
        {
          index: 3,
          quickReplyButton: {
            displayText: "Buka Dashboard",
            id: prefix + "dashboard",
          },
        },
      ],
      viewOnce: true,
      mentions: [msg.sender],
    });
  },
};
