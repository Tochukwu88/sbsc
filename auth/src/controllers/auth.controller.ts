import { userAuth } from "../services/Auth/userAuth.service";
import { ServerResponse } from "../utils/ServerResponse.util";
import { Request, Response } from "express";
import { responseConfig } from "../config/response.config";
import { logger } from "../utils/logger.util";
const userService = new userAuth();

export class authController {
  static async signUp(req: Request, res: Response): Promise<any> {
    logger(null, req);

    try {
      const response = await userService.signUp(req.body);
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
  static async get(req: Request, res: Response): Promise<any> {
    logger(null, req);

    try {
      const response = await userService.get();
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
  static async signIn(req: Request, res: Response): Promise<any> {
    logger(null, req);
    try {
      const email = req.body.email;
      const password = req.body.password;
      const response = await userService.signIn(email, password);
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
