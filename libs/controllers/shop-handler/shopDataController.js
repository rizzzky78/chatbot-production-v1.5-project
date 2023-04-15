"use-strict";

const { IDMaker, DateMaker } = require("@libs/functions/myFunc");
const { collections } = require("../router");

/**
 *
 * @param {{nameProduct: string, price: string, category: string, stock: number, description: string, image: {url: string, base64: string}}} dataForm
 * @param {"herbal" | "beverages" | "cosmetics"} typeCatalog
 */
const addProduct = async (dataForm, typeCatalog) => {
  const { nameProduct, price, category, stock, description, image } = dataForm;
  const form = {
    id: IDMaker(7),
    data: {
      nameProduct,
      price,
      category,
      stock,
      description,
      image: {
        url: image.url ? image.url : null,
        base64: image.base64 ? image.base64 : null,
      },
    },
    timeStamp: DateMaker(),
  };
  const catalogs = collections.catalog[typeCatalog];
  const upsertProduct = await catalogs.insertOne(form);
  return { upsertProduct, form };
};

/**
 *
 * @param {"herbal" | "beverages" | "cosmetics"} typeCatalog
 * @param {string} idProduct
 */
const getSingleProducts = async (typeCatalog, idProduct) => {
  const collection = collections.catalog[typeCatalog];
  return await collection.findOne({ id: idProduct });
};

/**
 *
 * @param {"herbal" | "beverages" | "cosmetics"} typeCatalog
 */
const getAllProduct = async (typeCatalog) => {
  const collection = collections.catalog[typeCatalog];
  return await collection.find().toArray();
};

const Shop = {
  getSingleProducts,
  getAllProduct,
};

module.exports = Shop;
//