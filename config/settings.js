/**
 * **Pengaturan Data**
 */
const metaData = {
  /** Session Login Folder Name */
  sessionName: "chatbot-marketplace",
  dataPeople: {
    superAdmin: {
      name: "Rizzuky",
      numberPhone: "6281329585825",
    },
    developer: {
      name: "Rizu",
      numberPhone: "6281329585825",
      idPhone: "6281329585825@s.whatsapp.net",
    },
  },
  cooldownCmd: {
    dashboard: 10 * 1000,
    catalog: 10 * 1000,
    product: 5 * 1000,
    upload: 10 * 1000,
  },
};

/**
 * **MongoDB Configurations**
 * - URI merupakan link database yang sudah include Username dan Password
 * - DATABASE, nama Database yang sudah dibuat sebelumnya
 * - COLLECTION, collection yang ada di dalam Database
 *
 * Tidak perlu setup untuk Database & Collection, akan otomatis membuat baru jika Collection yang dituju tidak ada.
 *
 * Bebas untuk mengganti Nama Database / Collection
 */
const ATLAS = {
  URI: "PASTE LINK URI MONGODB DISINI",
  DATABASE: "Chatbot-Marketplace",
  COLLECTION: {
    /** Data Dashboard */
    DATABOT: "data-dashboard-chatbot",
    /** Data Admin */
    ADMIN: "data-admin-marketplace",
    /** Data Etalase */
    ETALASE: {
      MAIN: "catalogue-main",
      HERBAL: "data-product-herbal",
      BEVERAGES: "data-product-beverages",
      COSMETICS: "data-product-cosmetics",
      // bisa menambah katalog baru lagi...
    },
    /** Data Statistik */
    STATISTICS: "D-marketplace-statistics",
  },
};

module.exports = { metaData, ATLAS };
