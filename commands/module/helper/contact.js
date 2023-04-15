const { admin, developer } = require("../../../config/global").metaData;

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["contact"],
  category: "about",
  description: "Show owner this bot.",
  callback: async ({ msg, client, args }) => {
    if (args[0] === "seller") {
      const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        `FN:${admin.name}\n` + // full name
        `ORG:${admin.name} Admin Marketplace, ini hanya contoh;\n` + // the organization of the contact
        `TEL;type=CELL;type=VOICE;waid=${admin.number}:+${admin.number}\n` + // WhatsApp ID + phone number
        "END:VCARD";
      return client.sendMessage(msg.from, {
        contacts: {
          displayName: admin.name,
          contacts: [{ vcard }],
        },
      });
    } else if (args[0] === "developer") {
      const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        `FN:${developer.name}\n` + // full name
        `ORG:Pengembang / Developer Chatbot;\n` + // the organization of the contact
        `TEL;type=CELL;type=VOICE;waid=${developer.number}:+${developer.number}\n` + // WhatsApp ID + phone number
        "END:VCARD";

      return client.sendMessage(msg.from, {
        contacts: {
          displayName: developer.name,
          contacts: [{ vcard }],
        },
      });
    }
  },
};
