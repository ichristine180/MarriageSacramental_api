import jwt from "./jwt.js";
import { params, response } from "../api-utility/index.js";
import User from "../database/models/users.js";
import { _checkPasswordStrength } from "./authentication.js";
import randomString from "randomstring";
import { sendSms, checkCode, removeCode } from "../message/send.js";
const requiredFields = ["firstName", "lastName", "email", "mobileNo"];
export const createUser = async (options) => {
  try {
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
  await params.checkParams(options, requiredFields);
  let { email, mobileNo, firstName, lastName } = options;
  email = email.toLowerCase();
  let plainpassword = randomString.generate(12);
  const password = await jwt.hashPassword(plainpassword);
  const user = await User.create({
    email,
    mobileNo,
    firstName,
    lastName,
    password,
  });
  if (user) {
    _welcomeMessage(options, plainpassword);
    return user;
  }
};

export const mobileNumberAllowed = async (res, data) => {
  try {
    await params.checkParams(data, ["mobileNo"]);
    const res = await User.findOne({ where: { mobileNo: data.mobileNo } });
    !res
      ? true
      : Promise.reject(
          new Error("The mobile number " + data.mobile_no + " is already used!")
        );
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};

export const updateUser = async (res, data) => {
  try {
    await params.checkParams(data, ["id"]);
    if (data.email) data.email = data.email.toLowerCase();
    delete data.user_rights;
    await User.update(data, { where: { id: data.id } });
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};

export const deleteUser = async (res, data) => {
  try {
    await params.checkParams(data, ["id"]);
    await User.destroy({ where: { id: data.id } });
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};

export const activateUser = (data) =>
  params
    .checkParams(data, ["id"])
    .then(() =>
      user_user.update({ is_active: true }, { where: { id: data.id } })
    )
    .catch((error) => response({ res, er: true, message: error.message }));

export const deactivateUser = (data) =>
  params
    .checkParams(data, ["id"])
    .then(() =>
      user_user.update({ is_active: false }, { where: { id: data.id } })
    )
    .catch((error) => response({ res, er: true, message: error.message }));

const _welcomeMessage = async (data, password) =>
  await sendSms({
    to: data.mobileNo,
    text: `Dear ${data.lastName} wellcome on our platform, your username ${
      checkCode(data.mobileNo) ? removeCode(data.mobileNo) : data.mobileNo
    } password ${password}`,
  });
export const getAll = async (res) => {
  try {
    const result = await User.findAll();
    return response({ res, result });
  } catch (error) {
    return response({ res, er: true, message: error.message });
  }
};

export const findUserByMobileNo = async (res, data) => {
  try {
    await params.checkParams(data, ["mobileNo"]);
    const result = await User.findOne({ where: { mobileNo: data.mobileNo } });
    response({ res, result: result });
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};
