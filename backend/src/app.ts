import express from "express";
import authRouter from "./routers/auth";
import vacationsRouter from "./routers/vacations";
import followersRouter from "./routers/followers";
import config from "config";
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";
import UserDTO from "./models/auth/user-dto";
import enforceUser from "./middlewares/enforce-user";
import authUser from "./middlewares/auth";
import enforceGuest from "./middlewares/enforce-guest";
import fileUpload from "express-fileupload";
import path from "path";
import stripTags from "./middlewares/strip-tags";
import { limiter } from "./middlewares/limiter";

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}

const server = express();
server.use(limiter);
server.use(
  cors({
    // origin:'localhost:3000'
  })
);
server.use(express.json());
server.use(stripTags);

server.use(fileUpload());

server.use("/api", authUser);
server.use("/api/auth", authRouter);
server.use("/api/vacations", enforceGuest, vacationsRouter);
server.use("/api/followers", enforceGuest, followersRouter);
server.use(
  "/images",
  express.static(path.resolve(config.get<string>("app.images.path")))
);

// special middleware for not found error
server.use(notFound);

// error middlewares
server.use(errorHandler);

export default server;
