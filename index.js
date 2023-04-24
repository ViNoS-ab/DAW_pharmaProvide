import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./connection/connectDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("*", (req, res) => {
  res.send("Not supported");
});

const PORT = process.env.PORT || 5000;

connectDB(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
