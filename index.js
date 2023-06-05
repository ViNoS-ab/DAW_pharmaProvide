import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./connection/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import medicinesRouter from "./routes/medecines.js";
import advicesRouter from "./routes/advices.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/medicines", medicinesRouter);
app.use("/api/advices", advicesRouter);

app.get("*", (req, res) => {
  res.send("Not supported");
});

const PORT = process.env.PORT || 5000;

connectDB(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);


