import { params, response } from "../api-utility/index.js";
import Application from "../database/models/Application.js";
import { sendSms } from "../message/send.js";

class Apply {
  async apply(req, res) {
    try {
      await params.checkParams(req.body, [
        "requestMariageDate",
        "christianId",
        "partenerId",
      ]);
      req.body.status = "pending";
      await Application.create(req.body);
      response({
        res,
        message:
          "Application received,you will get notification on your registered phone when the application is approved!",
      });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }

  async findOne(req, res) {
    try {
      const data = await Application.findOne({ where: req.body });
      response({ res, result: data });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }
  async findAll(req, res) {
    try {
      const data = await Application.findAll();
      response({ res, result: data });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }
  async process(req, res) {
    const approveText = `Dear christian ${req.body.names} congratularions your application has  been approved, you are getting married on this date ${req.body.date}`;
    const rejectText = `Dear christian ${req.body.names} sorry to inform you that your application has  been rejected preast message ${req.body.message}`;
    try {
      params.checkParams(req.body, ["id", "status", "names", "mobileNo"]);
      await Application.update(
        { status: req.body.status },
        { where: { id: req.body.id } }
      );
      response({ res, message: "Successfully processed" });
      await sendSms({
        to: req.body.mobileNo,
        text: req.body.status == "approved" ? approveText : rejectText,
      });
    } catch (error) {
      response({ res, er: true, message: error.message });
    }
  }
}

export default Apply;
