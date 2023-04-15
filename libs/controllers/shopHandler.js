const { collections } = require("./router");
const { IDMaker, DateMaker } = require("../functions/myFunc");

/**
 * Mengedit Data Text Dashboard
 * @param {string} captionText
 * @example
 * await editDataDashboard("caption text") => Promise <{
 *  Object {
 *    Promise: InsertOneResult<Document> | ModifyResult<Document>,
 *    data: string<"caption text">
 *  }
 * }>
 * @description
 * Insert Document if `validateDashboard` == `null` and Update Document if `validateDashboard` == `value`
 */
const editDataDashboard = async (captionText) => {
  /**
   * Check value in Dashboard
   * @returns 
   */
  const validateDashboard = async () => {
    const Data = await collections.dataBot.findOne({ key: "data-dashboard" });
    if (Data == null || !Data) {
      return false;
    } else if (Data) {
      return true;
    }
  };
  if ((await validateDashboard()) === false) {
    const Promise = await collections.dataBot.insertOne({
      key: "data-dashboard",
      data: {
        captionText,
      },
    });
    return { Promise, data: { captionText } };
  } else if ((await validateDashboard()) === true) {
    const Promise = await collections.dataBot.findOneAndUpdate(
      { key: "data-dashboard" },
      {
        $set: {
          data: {
            captionText,
          },
        },
      }
    );
    return { Promise, data: { captionText } };
  }
};
/**
 * Mengambil Data Dashboard (text)
 * @returns String
 * @example
 * await getDataDashboard() => Promise<string>
 */
const getDataDashboard = async () => {
  const Promise = await collections.dataBot.findOne({ key: "data-dashboard" });
  return {
    captionText: Promise.data.captionText,
  };
};
/**
 * @param {string} keyProduct
 * @param {string} nameProduct
 * @param {{id: string, userName: string}} data
 * @example type //equal of the ID statistics
 * await updateStatistics('typeKeyStatistics',
 *  { id: string, userName: string }) => Promise<{ ModifyResult<Document> || InsertOneResult<Document> }>
 * //will update the document if exist or inserted one if none
 */
const updateStatistics = async (keyProduct, nameProduct, data) => {
  const { id, userName } = data;
  const checkDataStatistics = async () => {
    const Check = await collections.statistic.findOne({ key: keyProduct });
    if (!Check || Check == null) {
      return false;
    } else if (Check) {
      return true;
    }
  };
  if ((await checkDataStatistics()) === true) {
    const Promise = await collections.statistic.findOneAndUpdate(
      { key: keyProduct },
      {
        $push: {
          data: {
            id,
            userName,
            timeStamp: DateMaker(),
          },
        },
      }
    );
    console.log("Statistics has been updated! ", Promise);
    return { Promise, data: { keyProduct, data } };
  } else if ((await checkDataStatistics()) === false) {
    const Promise = await collections.statistic.insertOne({
      key: keyProduct,
      nameProduct,
      data: [
        {
          id,
          userName,
          timeStamp: DateMaker(),
        },
      ],
    });
    console.log("Statistics has been created! ", Promise);
    return { Promise, data: { keyProduct, data } };
  }
};
/**
 * Mengambil Data Statistik
 * @returns Array
 * @example
 * await getStatistics() => Promise<{
 *  Array [
 *    {
 *      key,
 *      data: Array [
 *        { id, userName, nameProduct, timeStamp }
 *      ]
 *    }
 *  ]
 * }>
 */
const getStatistics = async () => {
  return await collections.statistic.find().toArray();
};
/**
 * Mengambil Data Statistik Berdasarkan Key
 * @param {string} key
 * @returns Array
 * @example
 * await getSpecifiedStatistics("key") => Promise<{
 *  Array [
 *    { id, userName, nameProduct, timeStamp }
 *  ]
 * }>
 */
const getSpecifiedStatistics = async (key) => {
  return (await collections.statistic.findOne({ key })).data;
};
/**
 * Mengupload Produk
 * @param {{name: string, price: string, category: string, imageUrl: string, desc: string}} FormData
 * @returns FormObject & <InsertOneResult<Document>>
 * @example
 * appendProduct({
 *    name: string, price: number, category: string, imageUrl: string, desc: string
 * }) => Promise<{
 *        <InsertOneResult<Document>>,
 *        Form: {
 *          id,
 *          data: { name, price, category, imageUrl, desc }
 *        }
 *      }>
 */
const appendProduct = async (FormData) => {
  const { name, price, category, imageUrl, desc } = FormData;
  const Form = {
    id: IDMaker(5),
    data: {
      name: name.trim(),
      price: price.trim(),
      category: category.trim(),
      stock: "Ready",
      imageUrl,
      desc,
      timeStamp: DateMaker(),
    },
  };
  const Promise = await collections.mainCatalog.insertOne(Form);
  console.log("Data products has been inserted! ", Promise);
  return { Promise, Form };
};
/**
 * Mengedit Produk (semua parameter)
 * @param {string} IDProduct
 * @param {object} FormData
 * @returns FormObject & <InsertOneResult<Document>>
 * @example
 * await editProduct(querySelectID, {
 *    name: string,
 *    price: number,
 *    category: string,
 *    stock: string,
 *    imageUrl: sting,
 *    desc: string
 * }) => Promise<{
 *    <ModifyResult<Document>>,
 *    Form: { name, price, category, imageUrl, desc }
 * }>
 */
const editProduct = async (IDProduct, FormData) => {
  const { name, price, category, stock, imageUrl, desc } = FormData;
  const validate = async () => {
    const Data = await collections.mainCatalog.findOne({
      id: IDProduct.trim(),
    });
    if (Data == null || !Data) {
      return false;
    } else {
      return true;
    }
  };
  if ((await validate()) == false) {
    return { Promise: null, Form: "No Data", status: "fail" };
  } else if ((await validate()) == true) {
    const Form = {
      name: name.trim(),
      price: price.trim(),
      category: category.trim(),
      stock: stock.trim(),
      imageUrl,
      desc,
      timeStamp: DateMaker(),
    };
    const Promise = await collections.mainCatalog.findOneAndUpdate(
      { id: IDProduct },
      { $set: { data: Form } }
    );
    console.log("Data products has been updated! ", Promise);
    return { Promise, Form, status: "success" };
  }
};
/* Edit Single Parameters */
/**
 * @param {string} IDProduct
 * @param {string} setName
 */
const editNameProduct = async (IDProduct, setName) => {
  const Promise = await collections.mainCatalog.findOneAndUpdate(
    { id: IDProduct.trim() },
    { $set: { "data.name": setName.trim() } }
  );
  return { Promise, data: setName };
};
/**
 * @param {string} IDProduct
 * @param {string} setPrice
 */
const editPriceProduct = async (IDProduct, setPrice) => {
  const Promise = await collections.mainCatalog.findOneAndUpdate(
    { id: IDProduct.trim() },
    { $set: { "data.price": setPrice.trim() } }
  );
  return { Promise, data: setPrice };
};
/**
 * @param {string} IDProduct
 * @param {string} setCategory
 */
const editCategoryProduct = async (IDProduct, setCategory) => {
  const Promise = await collections.mainCatalog.findOneAndUpdate(
    { id: IDProduct.trim() },
    { $set: { "data.category": setCategory.trim() } }
  );
  return { Promise, data: setCategory };
};
/**
 * @param {string} IDProduct
 * @param {string} setStock
 */
const editStockProduct = async (IDProduct, setStock) => {
  const Promise = await collections.mainCatalog.findOneAndUpdate(
    { id: IDProduct.trim() },
    { $set: { "data.stock": setStock.trim() } }
  );
  return { Promise, data: setStock };
};
/**
 * @param {string} IDProduct
 * @param {string} setDescription
 */
const editDescriptionProduct = async (IDProduct, setDescription) => {
  const Promise = await collections.mainCatalog.findOneAndUpdate(
    { id: IDProduct.trim() },
    { $set: { "data.desc": setDescription.trim() } }
  );
  return { Promise, data: setDescription };
};
/**
 * @param {string} IDProduct
 * @param {string} setName
 */
const editImageProduct = async (IDProduct, imageUrl) => {
  const Promise = await collections.mainCatalog.findOneAndUpdate(
    { id: IDProduct.trim() },
    { $set: { "data.imageUrl": imageUrl } }
  );
  return { Promise, data: imageUrl };
};
/**
 * @param {string} IDProduct
 * @returns
 */
const deleteProduct = async (IDProduct) => {
  const Promise = await collections.mainCatalog.findOneAndDelete({
    id: IDProduct.trim(),
  });
  return { Promise, status: "success" };
};
/**
 * Mengambil Semua Data Produk
 * @returns Array
 * @example
 * await getAllProduct() => Promise<{
 *    Array [{
 *      id,
 *      data: {
 *        name, price, category, imageUrl, desc, timeStamp
 *      }
 *    }]
 * }>
 */
const getAllProduct = async () => {
  try {
    return await collections.mainCatalog.find().toArray();
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};
/**
 * Mengambil Data Produk Berdasarkan ID
 * @param {string} queryID
 * @returns Document {Object}
 * @example
 * await getProductByID("123ABC") => Promise<{
 *    id,
 *    data: {
 *      name, price, category, stock, imageUrl, desc, timeStamp
 *    }
 * }>
 */
const getProductByID = async (queryID) => {
  return await collections.mainCatalog.findOne({ id: queryID.trim() });
};
/**
 * ***Management***
 */
const Admin = {
  appendProduct,
  editProduct,
  deleteProduct,
  getAllProduct,
  getProductByID,
  editDataDashboard,
  getDataDashboard,
  updateStatistics,
  getStatistics,
  getSpecifiedStatistics,
  editNameProduct,
  editPriceProduct,
  editCategoryProduct,
  editStockProduct,
  editDescriptionProduct,
  editImageProduct,
};

module.exports = Admin;

/**
 * Mohon maaf jika struktur coding nya kurang bagus/rapi
 * This is my second project
 */