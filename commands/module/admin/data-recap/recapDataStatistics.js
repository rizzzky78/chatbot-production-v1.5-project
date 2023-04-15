const Owner = require("@libs/controllers/admin");
const Admin = require("@libs/controllers/shopHandler");
const { message } = require("../../../../config/global");

const { readFileSync, unlinkSync } = require("fs");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["recap-data-statistics"],
  category: "admin",
  description: "Upload produk ke database katalog",
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg }) => {
    const adminData = await Owner.getDataAdmin(msg.senderNumber);
    if (adminData == null || !adminData) {
      return msg.reply(message.notRegasAdmin);
    } else if (adminData) {
      await Admin.getStatistics()
        .then(async (dataStatistics) => {
          if (!dataStatistics | (dataStatistics.length < 1)) {
            return msg.reply(message.noStatisticsToRecap);
          } else {
            const Documents = new jsPDF({
              orientation: "portrait",
              unit: "mm",
              format: "a4",
            });
            const Colums = ["No", "ID Produk", "Nama Produk", "Kunjungan"];
            const Rows = [];
            dataStatistics.forEach((item, index) => {
              const Row = [
                index + 1,
                item.key,
                item.nameProduct,
                item.data.length,
              ];
              Rows.push(Row);
            });
            Documents.autoTable({
              head: [Colums],
              body: Rows,
            });
            const pathFileName = "./store/pdf/recap-statistics.pdf";
            Documents.save(pathFileName);

            setTimeout(async () => {
              return await client
                .sendMessage(msg.from, {
                  document: readFileSync(pathFileName),
                  fileName: "Data Rekap Statistik",
                  mimetype: "application/pdf",
                  viewOnce: true,
                  mentions: [msg.sender],
                })
                .then(() => {
                  unlinkSync(pathFileName);
                });
            }, 5000);
          }
        })
        .catch((err) => {
          comsole.error(err);
          return msg.reply(message.hasError);
        });
    }
  },
};
