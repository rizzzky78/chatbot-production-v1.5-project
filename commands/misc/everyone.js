/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["everyone"],
  groupOnly: true,
  callback: async ({ client, msg, fullArgs, message }) => {
    if (!fullArgs || fullArgs.length < 5) {
      return msg.reply("Kata-kata lu kurang panjang ler...");
    }
    if (
      !msg.groupMetadata.participants
        .filter((user) => user.admin)
        .map((user) => user.id)
        .includes(msg.senderNumber + "@s.whatsapp.net")
    ) {
      return msg.reply(
        "Lu siapa sih pler... main pake aja, lu kan bukan admin!"
      );
    } else {
      const { from, quoted } = msg;
      const meta = await client.groupMetadata(from);
      const groupMem = meta.participants;

      let mems_id = new Array();
      let groupMemsTag = "";
      for (let i of groupMem) {
        groupMemsTag += `@${i.id.split("@")[0]}\n`;
        mems_id.push(i.id);
      }

      if (!quoted) {
        await client.sendMessage(
          msg.from,
          {
            text: fullArgs + "\n\n" + groupMemsTag,
            footer: "Everynoe / Tag All",
            mentions: mems_id,
          },
          { quoted: message }
        );
      }
      if (quoted) {
        await client.sendMessage(
          msg.from,
          {
            text: fullArgs + "\n\n" + groupMemsTag,
            footer: "Everynoe / Tag All",
            mentions: mems_id,
          },
          { quoted }
        );
      }
    }
  },
};
