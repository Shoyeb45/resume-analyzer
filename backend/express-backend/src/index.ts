import express, { Application } from "express";
import dotenv from "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({success: true, message: "Server running!!!"})
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
