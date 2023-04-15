const { faqSelector } = require("../../../store/document/module.helper");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["faq", "question"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const { caption, imgUrl } = faqSelector(args[0]);
    return client.sendMessage(msg.from, {
      caption,
      image: { url: imgUrl },
      footer: "FAQ & Help",
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
  },
};
