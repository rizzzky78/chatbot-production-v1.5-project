const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message } = require("../../../../config/global");
const { herbsProduct } = require("../../../../store/static/dataProduk");

const { readFileSync, unlinkSync } = require("fs");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["recap-data-products"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    const adminData = await Owner.getDataAdmin(msg.senderNumber);
    if (adminData == null || !adminData) {
      return msg.reply(message.notRegasAdmin);
    } else if (adminData) {
      const DataProducts = await Admin.getAllProduct();
      if (DataProducts.length <= 0) {
        return msg.reply(message.noProductsToRecap);
      } else {
        const Documents = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const Columns = [
          "No",
          "ID",
          "Nama Produk",
          "Katgori",
          "Harga",
        ];

        const Rows = [];
        DataProducts.forEach((item, index) => {
          const Row = [
            index + 1,
            item.id,
            item.data.name,
            item.data.category,
            item.data.price,
          ];
          Rows.push(Row);
        });

        Documents.autoTable({
          head: [Columns],
          body: Rows,
        });
        const pathFileName = "./store/pdf/state-recap-products.pdf";
        Documents.save(pathFileName);
        setTimeout(async () => {
          return await client
            .sendMessage(msg.from, {
              document: readFileSync(pathFileName),
              fileName: "Data Rekap Produk",
              mimetype: "application/pdf",
              viewOnce: true,
              mentions: [msg.sender],
            })
            .then(() => {
              unlinkSync(pathFileName);
            })
            .catch((err) => {
              console.error(err);
              return msg.reply(message.hasError);
            });
        }, 5000);
      }
    }
  },
};
