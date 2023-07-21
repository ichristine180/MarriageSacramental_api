const newError = (message, code) => {
  let e = new Error(message || "Unknown Error");
  e.errorCode = code || 400;
  return e;
};

export default newError;
