const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message, metaData } = require("../../../../config/global");
const { postImage } = require("../../../../libs/functions/myFunc");

const { writeFileSync, unlinkSync } = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["uploadproduk"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
      if (!args[0]) {
        return msg.reply(message.wrongFormat.upload);
      } else {
        const bufferImage =
          (await msg.download("buffer")) ||
          (msg.quoted && (await msg.quoted.download("buffer")));
        if (!bufferImage) {
          return msg.reply(message.wrongFormat.unfullFilled.image);
        } else if (bufferImage) {
          const tokenBase64 = `data:image/jpeg;base64,${bufferImage.toString(
            "base64"
          )}`;
          const imgBuffer = Buffer.from(
            tokenBase64.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          const pathFileName = "./store/images/stateImgUpload.jpg";
          writeFileSync(pathFileName, imgBuffer);
          let arguments = args.join(" ");
          if (!arguments.split("#")[0]) {
            return msg.reply(message.wrongFormat.unfullFilled.name);
          } else if (!arguments.split("#")[1]) {
            return msg.reply(message.wrongFormat.unfullFilled.price);
          } else if (!arguments.split("#")[2]) {
            return msg.reply(message.wrongFormat.unfullFilled.category);
          } else if (!arguments.split("#")[3]) {
            return msg.reply(message.wrongFormat.unfullFilled.desc);
          } else if (
            arguments.split("#")[0] &&
            arguments.split("#")[1] &&
            arguments.split("#")[2] &&
            arguments.split("#")[3]
          ) {
            await Admin.appendProduct({
              name: arguments.split("#")[0],
              price: arguments.split("#")[1],
              category: arguments.split("#")[2],
              desc: arguments.split("#")[3],
              imageUrl: await postImage(pathFileName),
            }).then(async (res) => {
              unlinkSync(pathFileName);
              let txt =
                `*Upload Produk Berhasil!*\n\n` +
                `*${res.Form.data.name}*\n` +
                `*#${res.Form.id}*\n\n` +
                `Stok: ${res.Form.data.stock}\n` +
                `Harga: ${res.Form.data.price}\n` +
                `Kategori: ${res.Form.data.category}\n\n` +
                `Deskripsi:\n\n${res.Form.data.desc}\n\n`;

              return client
                .sendMessage(msg.from, {
                  caption: txt,
                  video: metaData.gifPlayback.uploadSucces,
                  gifPlayback: true,
                  footer: `Produk ini diupload/diupdate pada:\n${res.Form.data.timeStamp}`,
                  templateButtons: [
                    {
                      index: 1,
                      quickReplyButton: {
                        displayText: "Buka Katalog",
                        id: prefix + "catalog",
                      },
                    },
                    {
                      index: 2,
                      quickReplyButton: {
                        displayText: "Admin Dashboard",
                        id: prefix + "admindashboard",
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
            });
          }
        }
      }
    }
  },
};
