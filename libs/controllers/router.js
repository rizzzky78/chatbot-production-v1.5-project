const { atlasConnect } = require("../connection/mongodbDriver");
const { ATLAS } = require("../../config/settings");

const Database = atlasConnect.db(ATLAS.DATABASE);

/**
 * ***A collection from Databases***
 */
const collections = {
  dataBot: Database.collection(ATLAS.COLLECTION.DATABOT),
  admin: Database.collection(ATLAS.COLLECTION.ADMIN),
  mainCatalog: Database.collection(ATLAS.COLLECTION.ETALASE.MAIN),
  catalog: {
    herbal: Database.collection(ATLAS.COLLECTION.ETALASE.HERBAL),
    beverages: Database.collection(ATLAS.COLLECTION.ETALASE.BEVERAGES),
    cosmetics: Database.collection(ATLAS.COLLECTION.ETALASE.COSMETICS),
  },
  statistic: Database.collection(ATLAS.COLLECTION.STATISTICS),
};

module.exports = { collections };
