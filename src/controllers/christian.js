import { params, response } from "../api-utility/index.js";
import Christian from "../database/models/Christian.js";

import { createUser } from "./user.js";

class Christians {
  async register(req, res) {
    const requiredFields = ["cardNumber", "dob", "location", "parish"];
    try {
      await params.checkParams(req.body, requiredFields);
      const { cardNumber, dob, location, parish } = req.body;
      const user = await createUser(req.body, res);
      await Christian.create({
        cardNumber,
        dob,
        parish,
        location,
        accountId: user.id,
      });
      response({ res, message: "Registered Successfull", result: user });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }
  async validateChristian(req, res) {
    try {
      params.checkParams(req.body, ["id", "status"]);
      await Christian.update(
        { status: req.body.status },
        { where: { accountId: req.body.id } }
      );
      response({ res, message: "Successfully validated" });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }
  async getChristian(req, res) {
    try {
      const data = await Christian.findOne({ where: req.body });
      response({ res, result: data });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }
}

export default Christians;
