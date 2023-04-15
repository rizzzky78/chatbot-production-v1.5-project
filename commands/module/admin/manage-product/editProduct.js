const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message } = require("../../../../config/global");
const { postImage } = require("../../../../libs/functions/myFunc");

const { writeFileSync, unlinkSync } = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["editproduk"],
  category: "admin",
  description: "Edit produk di database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const dataAdmin = await Owner.getDataAdmin(msg.senderNumber);
    if (!dataAdmin || dataAdmin == null) {
      return msg.reply(message.notRegasAdmin);
    } else if (dataAdmin) {
      if (!args[0]) {
        return msg.reply(message.wrongFormat.edit.all);
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
          const pathFileName = "./store/images/stateImgEdit.jpg";
          writeFileSync(pathFileName, imgBuffer);
          let arguments = args.join(" ");
          if (!arguments.split("#")[1]) {
            return msg.reply(message.wrongFormat.unfullFilled.name);
          } else if (!arguments.split("#")[2]) {
            return msg.reply(message.wrongFormat.unfullFilled.price);
          } else if (!arguments.split("#")[3]) {
            return msg.reply(message.wrongFormat.unfullFilled.category);
          } else if (!arguments.split("#")[4]) {
            return msg.reply(message.wrongFormat.unfullFilled.stock);
          } else if (!arguments.split("#")[5]) {
            return msg.reply(message.wrongFormat.unfullFilled.desc);
          } else {
            await Admin.editProduct(arguments.split("#")[0].trim(), {
              name: arguments.split("#")[1],
              price: arguments.split("#")[2],
              category: arguments.split("#")[3],
              stock: arguments.split("#")[4],
              desc: arguments.split("#")[5],
              imageUrl: await postImage(pathFileName),
            })
              .then(async (res) => {
                if (res.status === "fail") {
                  return msg.reply(message.noValidID);
                } else if (res.status === "success") {
                  unlinkSync(pathFileName);
                  let txt =
                    `*Edit Produk Berhasil!*\n\n` +
                    `*${res.Form.name}*\n` +
                    `*#${args[0]}*\n\n` +
                    `Stok: ${res.Form.stock}\n` +
                    `Harga: ${res.Form.price}\n` +
                    `Kategori: ${res.Form.category}\n` +
                    `Deskripsi:\n\n${res.Form.desc}\n\n`;

                  return client.sendMessage(msg.from, {
                    caption: txt,
                    image: { url: res.Form.imageUrl },
                    footer: `Produk ini diupload/diupdate pada:\n${res.Form.timeStamp}`,
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
                  });
                }
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
