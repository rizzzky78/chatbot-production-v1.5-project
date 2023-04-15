const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message, metaData } = require("../../../../config/global");
const { postImage } = require("../../../../libs/functions/myFunc");

const { writeFileSync, unlinkSync } = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["editgambarproduk"],
  category: "admin",
  description: "Mengedit 1 parameter produk",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    let arguments = args.join(" ");
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
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
        const pathFileName = "./store/images/stateImgEdit.jpg";
        writeFileSync(pathFileName, imgBuffer);
        if (!arguments.split("#")[0]) {
          return msg.reply(message.wrongFormat.unfullFilled.ID);
        } else if (arguments.split("#")[0]) {
          const dataProduct = await Admin.getProductByID(arguments.split('#')[0]);
          if (dataProduct == null || !dataProduct) {
            return msg.reply(message.noValidID);
          } else if (dataProduct) {
            await Admin.editImageProduct(
              arguments.split("#")[0],
              await postImage(pathFileName)
            )
              .then(async (res) => {
                console.log(JSON.stringify(res, null, 2));
                unlinkSync(pathFileName);
                let texts =
                  `*Edit Name Produk Sukses!*\n\n` +
                  `ID Produk: ${dataProduct.id}\n\n` +
                  `Silahkan cek perubahan dengan mengakses Data Produk pada Katalog\n`;

                return client.sendMessage(msg.from, {
                  caption: texts,
                  video: metaData.gifPlayback.editSuccess,
                  gifPlayback: true,
                  footer: "Klik tombol dibawah untuk mengakses menu lainnya.",
                  templateButtons: [
                    {
                      index: 1,
                      quickReplyButton: {
                        displayText: "Admin dashboard",
                        id: prefix + "admindashboard",
                      },
                    },
                    {
                      index: 2,
                      quickReplyButton: {
                        displayText: "Buka Katalog",
                        id: prefix + "catalog",
                      },
                    },
                    {
                      index: 3,
                      quickReplyButton: {
                        displayText: "Buka Produk",
                        id: prefix + `getdynamicproduct ${dataProduct.id}`,
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
      }
    }
  },
};
