import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.PINDO_TOKEN}`,
  },
};
export const sendSms = async (data) => {
  data.sender = "Nderaparish";
  data.to = checkCode(data.to) ? data.to : addCode(data.to);
  const res = await fetch("https://api.pindo.io/v1/sms/", {
    ...options,
    body: JSON.stringify(data),
  });
  const body = await res.text();
  console.log(body);
  return body;
};

export const checkCode = (number) => number.startsWith("+25");
export const addCode = (number) => "+25".concat(number);
export const removeCode = (number) => number.replace("+25", "");
