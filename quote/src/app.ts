import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

import cors from "cors";
import { responseConfig } from "./config/response.config";
import { ServerResponse } from "./utils/ServerResponse.util";
import { logger } from "./utils/logger.util";
import routes from "./routes";
import { validateToken } from "./middlewares/authMiddlewares/validateToken";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors);
dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.get("/", (req: Request, res: Response) => {
  logger(null, req);
  res
    .status(responseConfig.welcomeResponse.statusCode)
    .json(
      ServerResponse.externalResponse(
        true,
        responseConfig.welcomeResponse.responseMessage,
        null
      )
    );
});

app.post("/protect", (req: any, res: Response) => {
  logger(null, req);
  res
    .status(responseConfig.welcomeResponse.statusCode)
    .json(
      ServerResponse.externalResponse(
        true,
        responseConfig.welcomeResponse.responseMessage,
        req.auth
      )
    );
});

routes(app);
app.all("*", (req: Request, res: Response) => {
  logger(null, req);
  res
    .status(responseConfig.apiNotFound.statusCode)
    .json(
      ServerResponse.externalResponse(
        false,
        responseConfig.apiNotFound.responseMessage,
        null
      )
    );
});

export = app;
