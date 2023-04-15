const moment = require("moment-timezone");
const axios = require("axios");
const BodyForm = require("form-data");
const lzString = require("lz-string");
const { existsSync, createReadStream } = require("fs");
const cryptoRandomString = require("crypto-random-string");

const Runtime = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
/**
 * @param {number} num
 * @returns Crypto Random String Upper Case
 * @example
 * IDMaker(5) => "7DE5X"
 */
const IDMaker = (num) => {
  return cryptoRandomString(num).toUpperCase();
};
/**
 * Date Maker
 * @returns String
 * @example
 * Format: "Day" + "Month" + "Year" + "Local Time"
 * DateMaker() => String<"Senin 13 Maret 2023, 19:45:05 WIB">
 */
const DateMaker = () => {
  let makeDate = moment()
    .tz("Asia/Jakarta")
    .locale("id")
    .format("dddd D MMMM YYYY, H:mm:ss");
  return makeDate + " " + "WIB";
};
/**
 * Trim a String from specified length of String
 * @param {string} str
 * @param {number} maxLength
 */
const trimString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
};
/**
 * Post Images and return URL
 * @param {string | directory} pathFile input Buffer
 * @returns String
 * @example
 * await postImage("./images/dog.png") => Promise<String<"https://telegra.ph/12345.jpg">>
 */
const postImage = (pathFile) => {
  return new Promise(async (resolve, reject) => {
    if (!existsSync(pathFile)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("file", createReadStream(pathFile));
      const data = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      });
      return resolve("https://telegra.ph" + data.data[0].src);
    } catch (err) {
      return reject(new Error(err));
    }
  });
};
/**
 * @param {string} input
 * @description The files uploaded only last for 24 hour
 * @example
 * await uploadFileUgu("./images/picture1.jpg") => Promise<{
 *  // the output params
 *    Object {
 *      hash: string,
 *      name: string,
 *      url: string,
 *      size: number
 *    }
 * }>
 */
const uploadFileUgu = async (input) => {
  return new Promise(async (resolve, reject) => {
    const form = new BodyForm();
    form.append("files[]", createReadStream(input));
    await axios({
      url: "https://uguu.se/upload.php",
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        ...form.getHeaders(),
      },
      data: form,
    })
      .then((data) => {
        return resolve(data.data.files[0]);
      })
      .catch((err) => reject(err));
  });
};
/**
 * Convert Buffer data into String, then compressed using lzString
 * @param {Buffer} data Data from files
 * @returns String
 */
const compressData = (data) => {
  const base64String = Buffer.from(data).toString("base64");
  return lzString.compressToBase64(base64String);
};
/**
 * Convert compressed Base64String into Original Base64String of Buffer
 * @param {"str" | "buff"} type
 * @param {compressedBase64String} data
 * @returns String or Buffer, based on type option
 */
const decodeCompressedData = (type, data) => {
  const decompressedData = lzString.decompressFromBase64(data);
  if (type === "str") {
    return Buffer.from(decompressedData, "base64").toString();
  }
  if (type === "buff") {
    return Buffer.from(decompressedData, "base64");
  }
};
/**
 * @param {Array} dataProducts
 * @property Shop
 */
const makeSectionProducts = (dataProducts) => {
  return dataProducts.map(
    (item) => ({
      title: item.data.name,
      rowId: "." + "getdynamicproduct" + item.id,
      description: item.data.price,
    }),
    {}
  );
};
/**
 * 
 * @param {string} queryID
 * @param {Array} staticDataProduct
 * @example
 * getStaticProductByID("queryID",
 *    Array[{
 *      no, id, name, price, category, stock, image, desc
 *    }]
 * ) => <{
 *  <filteredArray<Object>> : {
 *    no, id, name, price, category, stock, image, desc
 *  }
 * }>
 */
const getStaticProductByID = (queryID, staticDataProduct) => {
  const filteredProduct = staticDataProduct.find(
    (selectProduct) => selectProduct.id === queryID
  );
  return filteredProduct;
};
/**
 * @param {string} queryID
 * @param {Array} dataUserProduct
 * @property Demo/Trial User
 * @example InputExample:
 * getUserProductByID("123AB", catalogStore) => Object <{
 *   id,
 *   data: {
 *     name, price, category, desc, imageUrl
 *   }
 * }>
 */
const getUserProductByID = (queryID, dataUserProduct) => {
  const valueData = dataUserProduct.find(
    (selectProduct) => selectProduct.key === queryID.trim()
  );
  return valueData;
};

module.exports = {
  Runtime,
  IDMaker,
  DateMaker,
  trimString,
  postImage,
  uploadFileUgu,
  makeSectionProducts,
  getUserProductByID,
  getStaticProductByID,
  compressData,
  decodeCompressedData,
};
