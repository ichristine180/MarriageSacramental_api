import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import redis from "redis";
import routes from "./src/routes/index.js";
// import syncDatabase from "./dbSync.js";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);
const PORT = process.env.PORT || 3000;

//redis configuration
const client = redis.createClient(process.env.REDIS_PORT || 6379);
export const redisAsyncClient = client;
await redisAsyncClient.connect();
//Allow 'authtoken' header in CORS policy
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authtoken"
  );
  next();
});
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to uplatfrom.",
  });
});
app.use("/", (req, res) => {
  res.status(404).json({
    message: "Page not found.",
  });
});
// creating tables
// await syncDatabase();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
