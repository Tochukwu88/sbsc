import { UserService } from "../services/user.service";
import { ServerResponse } from "../utils/ServerResponse.util";
import { Request, Response } from "express";
import { responseConfig } from "../config/response.config";
import { logger } from "../utils/logger.util";
const userService = new UserService();

export class userController {
  static async get(req: any, res: Response): Promise<any> {
    logger(null, req);

    try {
      const response = await userService.get(req.auth.name);
      res
        .status(response.status_code)
        .json(
          ServerResponse.externalResponse(
            response.success,
            response.message,
            response.data
          )
        );
    } catch (error) {
      logger(error);
      res
        .status(responseConfig.internalServerError.statusCode)
        .json(
          ServerResponse.externalResponse(
            false,
            responseConfig.internalServerError.responseMessage,
            null
          )
        );
    }
  }
}
