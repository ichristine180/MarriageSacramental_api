import express from "express";
import user from "./users.js";
import auth from "./authentication.js";
import upload from "./uploadImage.js";
const app = express();
app.use("/users", user);
app.use("", auth);
app.use("", upload);
export default app;
