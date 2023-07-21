import { response } from "../api-utility/index.js";
export const saveImage = (req, res) => {
  try {
    const file = req.file;
    const imageUrl = file.path;
    response({ res, result: { imageUrl } });
  } catch (error) {
    console.error(error);
    response({ res, er: true, message: error.message });
  }
};
