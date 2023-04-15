const Admin = require("@libs/controllers/shopHandler");
const { metaData, message } = require("../../../config/global");
const { infoMarketplace } = require("../../../config/marketplace");

const { readFileSync } = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["dashboard", "main", "help", "bantuan", "shop"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  cooldown: metaData.cooldownsCommand.dashboard,
  callback: async ({ client, msg, args, prefix }) => {
    if (args[0] === "marketplace") {
      return client.sendMessage(msg.from, {
        text: infoMarketplace,
        footer: "Klik tombol dibawah untuk mengakses menu lainnya",
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
        ],
        viewOnce: true,
        mentions: [msg.sender],
      });
    } else {
      let captionDashboard;
      try {
        const { captionText } = await Admin.getDataDashboard();
        captionDashboard = captionText;
      } catch {
        captionDashboard = message.hasNoDashboard;
      }
      return await client
        .sendMessage(msg.from, {
          caption: captionDashboard,
          video: readFileSync("./store/images/dashboard-marketplace.mp4"),
          gifPlayback: true,
          footer: "Silahkan pilih menu pada tombol dibawah ini.",
          templateButtons: [
            {
              index: 1,
              quickReplyButton: {
                displayText: "Info Marketplace",
                id: prefix + "dashboard marketplace",
              },
            },
            {
              index: 2,
              quickReplyButton: {
                displayText: "Buka Katalog",
                id: prefix + "catalog",
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
