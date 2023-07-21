import { params, response } from "../api-utility/index.js";
import { initiatePayement, verify } from "../api-utility/payment.js";
import dotenv from "dotenv";
import Payments from "../database/models/Payments.js";
dotenv.config();
export const pay = async (res, options) => {
  try {
    await params.checkParams(options, ["payerId", "mobileNo", "payerType"]);
    const amount =
      options.payerType == "application"
        ? process.env.APPLICATION_AMOUNT
        : process.env.REQUEST_AMOUNT;
    const data = await initiatePayement(res, options.mobileNo, Number(amount));
    if (!data.ref) throw new Error(data.message);
    await Payments.create({
      payerType: options.payerType,
      payerId: options.payerId,
      amount: Number(amount),
      externalReference: data.ref,
      status: data.status,
    });
    response({ res, result: data });
  } catch (error) {
    response({ res, er: true, message: error.message });
  }
};

export const verifyPayment = async (res, options) => {
  try {
    await params.checkParams(options, ["ref"]);
    const data = await verify(options.ref);
    // const data = { status: "successful" };
    if (data.status == "successful") {
      await _updatePaymentStatus(options.ref, "successful");
      response({ res, result: data });
    } else if (data.status == "failed") {
      await _updatePaymentStatus(options.ref, "failed");
      response({
        res,
        message: "Payment failed",
        result: { status: "failed" },
      });
    } else response({ res, result: data });
  } catch (error) {
    throw new Error(error);
  }
};

const _updatePaymentStatus = async (ref, status) => {
  await Payments.update({ status }, { where: { externalReference: ref } });
};
