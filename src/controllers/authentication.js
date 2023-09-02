import jwt from "./jwt.js";
import { params, response } from "../api-utility/index.js";
import User from "../database/models/users.js";
import zxcvbn from "zxcvbn";
export const login = async (res, options) => {
  try {
    await params.checkParams(options, ["mobileNo", "password"]);
    const user = await findByMobileNo(options.mobileNo);
    if (user == null)
      return response({
        res,
        er: true,
        message: "User with provided mobile no not found",
      });
    const match = await jwt.comparePassword(options.password, user.password);
    if (!match)
      return response({
        res,
        er: true,
        message: "Incorrect password",
      });
    else {
      const token = jwt.generateToken(user);
      delete user.password;
      return response({ res, result: { user: user, token: token } });
    }
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};

const findByMobileNo = async (mobileNo) =>
  User.findOne({
    where: { mobileNo: mobileNo },
    raw: true,
  });
export const changePassword = async (res, req) => {
  try {
    const data = req.body;
    await params.checkParams(data, ["password", "oldpassword"]);
    if (_checkPasswordStrength(data.password)) {
      const user = await User.findOne({
        where: { id: req.user.id },
        raw: true,
      });
      const password = await jwt.hashPassword(data.password);
      const match = await jwt.comparePassword(data.oldpassword, user.password);
      _savePassword(res, user, password, match);
    } else
      throw new Error(
        "Password is too weak! please try the combination of numbers,letters and special charcter"
      );
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};
const _savePassword = (res, user, password, match) => {
  try {
    if (match) {
      User.update({ password: password }, { where: { id: user.id } });
      return response({
        res,
        status: 200,
        message: "Password changed successfully!",
      });
    } else throw new Error("Old password is incorrect");
  } catch (error) {
    response({
      res,
      er: true,
      message: error.message,
    });
  }
};

export const _checkPasswordStrength = (password) =>
  zxcvbn(password).score >= 2 ? true : false;
