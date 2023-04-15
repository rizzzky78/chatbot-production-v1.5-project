const Shop = require("@libs/controllers/shop-handler/shopDataController");
const { trimString } = require("@libs/functions/myFunc");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["catalog"],
  waitMessage: "Mohon tunggu sebentar...",
  callback: async ({ client, msg, args, prefix }) => {
    /**
     * @param {"herbal" | "beverages" | "cosmetics"} args[0]
     */
    await Shop.getAllProduct(args[0]).then(async (data) => {
      if (!data) {
        return; // something
      } else if (data) {
        let sectionProducts = [
          {
            title: "",
            rows: [],
          },
          {
            title: "Bantuan & Shortcut",
            rows: [
              {
                title: "Buka Dashboard Marketplace",
                rowId: prefix + "dashboard",
                description: "Kembali dan buka dashboard marketplace",
              },
              {
                title: "Hubungi Penjual",
                rowId: prefix + "contact seller",
                description:
                  "Kontak penjual untuk informasi produk lebih lanjut dan pemesanan",
              },
            ],
          },
          {
            title: "Butuh Informasi Lain?",
            rows: [
              {
                title: "FAQ Pelayanan Pelanggan",
                rowId: prefix + "guideinformation",
                description: "FAQ, seputar produk, keluhan, efek samping, dll",
              },
            ],
          },
        ];

        const dataProducts = data.map(
          (val) => ({
            title: trimString(val.data.nameProduct, 70),
            rowId: prefix + "getproduct" + " " + args[0] + " " + val.id,
            description: trimString(val.data.stock, 70),
          }),
          {}
        );
        sectionProducts[0].rows.push(...dataProducts);

        return client.sendMessage(msg.from, {
          title: `Katalog Produk ${args[0].toUpperCase()}`,
          text: "Blablabla...",
          footer: "Klik tombol dibawah untuk membuka list produk",
          buttonText: `Katalog ${args[0]}`,
          sections: sectionProducts,
          viewOnce: true,
          mentions: [msg.sender],
        });
      }
    });
  },
};
