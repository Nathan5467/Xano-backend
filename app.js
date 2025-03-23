require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/user");
const MONGO_URI = "mongodb://localhost:27017/aaa";

app.use(express.json());

app.use(cors());
app.use("/api/v1", mainRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
 
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
