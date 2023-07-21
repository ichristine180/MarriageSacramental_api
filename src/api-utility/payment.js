import dotenv from "dotenv";
import fetch from "node-fetch";
import { generateAlphanumericCode } from "./common.js";
import responseHandler from "./response.js";
dotenv.config();
var options = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
const getaccessToken = async () => {
  try {
    options.method = "POST";
    const response = await fetch(
      `${process.env.PAYPACK_API_URL}/auth/agents/authorize`,
      {
        ...options,
        body: JSON.stringify({
          client_id: process.env.APPLICATION_ID,
          client_secret: process.env.APPLICATION_SECRET,
        }),
      }
    );
    const body = await response.json();
    return body.access;
  } catch (error) {
    console.log(error);
  }
};

export const initiatePayement = async (res, mobile, amount) => {
  try {
    const accessToken = await getaccessToken();
    const indepontencyKey = generateAlphanumericCode(32);
    options.headers.Authorization = `Bearer ${accessToken}`;
    const response = await fetch(
      `${process.env.PAYPACK_API_URL}/transactions/cashin?Idempotency-Key=${indepontencyKey}`,
      {
        ...options,
        body: JSON.stringify({
          amount: amount,
          number: mobile,
        }),
      }
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.log(error);
    responseHandler({ res, er: true, message: error.message });
  }
};

export const verify = async (refCode) => {
  try {
    const accessToken = await getaccessToken();
    options.headers.Authorization = `Bearer ${accessToken}`;
    options.method = "GET";
    const response = await fetch(
      `${process.env.PAYPACK_API_URL}/events/transactions?ref=${refCode}`,
      options
    );
    const body = await response.json();
    if (!body.transactions) throw new Error(body.message);
    return body.transactions[0].data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

// await verifyPayment("9f37ef6d-4a0a-41a4-b1fe-dc8a808fa5ae");
