const { collections } = require("./router");
const { IDMaker, DateMaker } = require("../functions/myFunc");

/**
 * @param {string} userNumber
 * @returns
 */
const newAdmin = async (userNumber) => {
  const validateAdmin = async (userNumber) => {
    const Validate = await collections.admin.findOne({ userNumber });
    if (Validate == null) {
      return false;
    } else if (Validate) {
      return true;
    }
  };
  if ((await validateAdmin(userNumber)) == true) {
    return {
      Promise: null,
      Form: "Data Already Exist",
      status: "exist",
    };
  } else if ((await validateAdmin(userNumber)) == false) {
    const Form = {
      id: IDMaker(5),
      userNumber: userNumber.trim(),
      created: DateMaker(),
    };
    const Promise = await collections.admin.insertOne(Form);
    return { Promise, Form, status: "new" };
  }
};
/**
 *
 * @param {string} targetAdmin
 */
const deleteAdmin = async (targetAdmin) => {
  return collections.admin.findOneAndDelete({ id: targetAdmin.trim() });
};

const getDataAdmin = async (target) => {
  return collections.admin.findOne({ userNumber: target.trim() });
};
const getDataAdminByID = async (target) => {
  return collections.admin.findOne({ id: target.trim() });
}
const getAllDataAdmin = async () => {
  return collections.admin.find().toArray();
};

const Owner = {
  newAdmin,
  deleteAdmin,
  getDataAdmin,
  getAllDataAdmin,
  getDataAdminByID
};

module.exports = Owner;
