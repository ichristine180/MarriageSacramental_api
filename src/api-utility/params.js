import newError from "./error.js";

/*
 * Checks if the specified <options> object contains a parameter <name>.
 * If not, fails with the specified error <message>.
 * Resolves with <response> if defined, otherwise with the original <options>.
 */
const checkParam = (options, name, message, response) => {
  if (!options || !options[name])
    return Promise.reject(new newError(message || name + " is required!"));
  return Promise.resolve(response || options);
};

/*
 * Checks if the specified <options> object contains all parameters in <names>.
 * If not, fails with adding the missing parameters to the specified error <message>.
 * Resolves with <response> if defined, otherwise with the original <options>.
 */
const checkParams = (options, names, message, response, code) =>
  new Promise((resolve, reject) => {
    if (!options || !names.forEach) return resolve(response || options);
    var missing = [];
    names.forEach((name) => {
      if (!options[name]) missing.push(name);
    });
    return missing.length > 0
      ? reject(
          newError(
            (message || missing.length + " missing parameter(s)") +
              ": " +
              missing.toString() +
              " required!",
            code || 400
          )
        )
      : resolve(response || options);
  });

/*
 * Checks if the specified <obj> exists.
 * If not, fails with the specified error <message>.
 * Resolves with the original <obj>.
 */
const checkExists = (obj, message, code) => {
  if (!obj)
    return Promise.reject(
      newError(message || "Missing Parameter!", code || 400)
    );
  return Promise.resolve(obj);
};

const checkIsArray = (arr) =>
  Array.isArray(arr)
    ? Promise.resolve(true)
    : Promise.reject(new Error("Expected an array!"));

const ensureIsArray = (arr) =>
  Array.isArray(arr) ? Promise.resolve(arr) : Promise.resolve([arr]);
export default {
  checkParam,
  checkParams,
  checkExists,
  checkIsArray,
  ensureIsArray,
};
