const responseHandler = ({ res, er, message, result }) => {
  if (!res || er) {
    res.status(200);
    return res.json({
      isSuccessfull: false,
      success: false,
      message: message || "internal server error",
      result: null,
    });
  }
  res.status(200);
  return res.json({
    isSuccessfull: true,
    success: true,
    message: message || "Success",
    result: result,
  });
};

export default responseHandler;
