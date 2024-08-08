import cors from "cors";
import express from "express";
import logger from "morgan";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "@nabeelktr/error-handler";
import { limiter } from "./utils/rateLimitter.js";
import { connectDB } from "./config/mongodb.js";
import "dotenv/config"

class App {

  constructor() {
    this.app = express();
    this.applyMiddleware();
    this.routes();
    connectDB()
  }

  applyMiddleware() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(
      cors({
        origin: [process.env.CORS_ORIGIN],
        credentials: true,
      })
    );
    this.app.use(logger("dev"));
    this.app.use(cookieParser());
    this.app.use(errorHandler);
    this.app.use(limiter)
  }

  routes() {
    this.app.use("/api/v1/user", userRoute);
  }

  startServer(port) {
    this.app.listen(port, () => {
      console.log(`Server started on port  ${port}`);
    });
  }
}

export default App;
