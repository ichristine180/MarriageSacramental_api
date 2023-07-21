export const generateCode = (code) => {
  const currentYear = new Date().getFullYear();
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${currentYear}${code}${randomNumber}`;
};
export const generateAlphanumericCode = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};
