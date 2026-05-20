import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "X-25 ISP Live!",
  });
});

export default app;