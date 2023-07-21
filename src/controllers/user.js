import jwt from "./jwt.js";
import { params, response } from "../api-utility/index.js";
import User from "../database/models/users.js";
import { _checkPasswordStrength } from "./authentication.js";
import randomString from "randomstring";
import { sendSms, checkCode, removeCode } from "../message/send.js";
const requiredFields = ["firstName", "lastName", "email", "mobileNo"];
const createUser = async (res, options) => {
  try {
    await params.checkParams(options, requiredFields);
    const data = options;
    data.email = data.email.toLowerCase();
    const password = randomString.generate(12);
    data.password = await jwt.hashPassword(password);
    const user = await User.create(data);
    if (user) {
      _welcomeMessage(data, password);
      response({ res, result: user });
    }
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};

export const setUserRights = async (data) => {
  try {
    await params.checkParams(data, ["id", "user_rights"]);
    data.user_rights > 0
      ? true
      : Promise.reject(new Error("Users must have at least one right."));
    User.update({ user_rights: data.user_rights }, { where: { id: data.id } });
  } catch (error) {
    response({ res, er: true, message: error.message });
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
    to: data.userName,
    text: `Dear ${data.lastName} wellcome on Litigation management system, 
      username ${
        checkCode(data.userName) ? removeCode(data.userName) : data.userName
      } 
      password ${password}`,
  });
export const getAll = async (res) => {
  try {
    const result = await User.findAll();
    return response({ res, result });
  } catch (error) {
    return response({ res, er: true, message: error.message });
  }
};

