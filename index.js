import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./connection/connectDB.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/api/auth", authRouter);
app.get("*", (req, res) => {
  res.send("Not supported");
});

const PORT = process.env.PORT || 5000;

connectDB(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
