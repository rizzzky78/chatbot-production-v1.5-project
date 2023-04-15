const { readFileSync } = require("fs");

const metaData = {
  chatBotName: "Development Chatbot",
  /**
   * ***Session Creds***
   * - Bebas ubah nama
   * - Dapat dimanipulasi untuk memilih session yang ingin diaktifkan
   */
  sessionName: "chatbot-marketplace",
  cooldownsCommand: {
    dashboard: 10 * 1000,
    catalog: 10 * 1000,
    product: 5 * 1000,
    upload: 10 * 1000,
  },
  admin: {
    name: "Rizuky",
    number: "6281329585825",
  },
  developer: {
    name: "Rizuky",
    number: "6281329585825",
    numberID: "6281329585825@s.whatsapp.net", //6281329585825@s.whatsapp.net
  },
  templateData: {
    dashboardImage: "https://telegra.ph/file/445eb47f9b0833bc67378.png",
    marketplaceInfoImage: "https://telegra.ph/file/445eb47f9b0833bc67378.png",
    trialDashboard: "https://telegra.ph/file/445eb47f9b0833bc67378.png",
    emptyCatalog: "https://telegra.ph/file/f9b8835fc934ccb8f2165.png",
  },
  gifPlayback: {
    marketplaceDashboard: readFileSync(
      "./store/images/dashboard-marketplace.mp4"
    ),
    adminDashboard: readFileSync("./store/images/dashboard-admin.mp4"),
    userDashboard: readFileSync("./store/images/dashboard-user.mp4"),
    demo: readFileSync("./store/images/user-demo.mp4"),
    uploadSucces: readFileSync("./store/images/state-loading-upload.mp4"),
    editSuccess: readFileSync("./store/images/state-loading-edit.mp4"),
    deleteSuccess: readFileSync("./store/images/state-loading-delete.mp4"),
    // trial
    newUser: readFileSync("./store/images/state-user-new.mp4"),
    userDelete: readFileSync("./store/images/state-user-delete.mp4"),
  },
};
const holderData = {
  templateData: {
    dashboardImage: "https://telegra.ph/file/445eb47f9b0833bc67378.png",
    marketplaceInfoImage: "https://telegra.ph/file/445eb47f9b0833bc67378.png",
    trialDashboard: "https://telegra.ph/file/445eb47f9b0833bc67378.png",
    emptyCatalog: "https://telegra.ph/file/f9b8835fc934ccb8f2165.png",
  },
  gifPlayback: {
    marketplaceDashboard: readFileSync(
      "./store/images/dashboard-marketplace.mp4"
    ),
    adminDashboard: readFileSync("./store/images/dashboard-admin.mp4"),
    userDashboard: readFileSync("./store/images/dashboard-user.mp4"),
    demo: readFileSync("./store/images/user-demo.mp4"),
    uploadSucces: readFileSync("./store/images/state-loading-upload.mp4"),
    editSuccess: readFileSync("./store/images/state-loading-edit.mp4"),
    deleteSuccess: readFileSync("./store/images/state-loading-delete.mp4"),
    // trial
    newUser: readFileSync("./store/images/state-user-new.mp4"),
    userDelete: readFileSync("./store/images/state-user-delete.mp4"),
  },
};
/**
 * ***MongoDB Configurations***
 * - URI merupakan link database yang sudah include Username dan Password
 * - DATABASE, nama Database yang sudah dibuat sebelumnya
 * - COLLECTION, collection yang ada di dalam Database
 *
 * Tidak perlu setup untuk Collection, akan otomatis membuat Collection baru jika Collection yang dituju tidak ada.
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
      // bisa menambah katalog baru lagi...
    },
    /** Data Statistik */
    STATISTICS: "D-marketplace-statistics",
  },
};

module.exports = { ATLAS, message: require("./message"), metaData, holderData };
