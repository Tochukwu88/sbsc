import { Request, Response, NextFunction } from "express";
import { responseConfig } from "../../config/response.config";

import { UserRepo } from "../../repository/user.repository";
import { ServerResponse } from "../../utils/ServerResponse.util";
import { TokenUtil } from "../../utils/token.util";
const userRepo = new UserRepo();

export const validateToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(responseConfig.unauthorizedResponse.statusCode)
        .json(
          ServerResponse.externalResponse(
            false,
            responseConfig.unauthorizedResponse.responseMessage,
            null
          )
        );
    }
    const token = authHeader.split(" ")[1];
    if (!token || authHeader.split(" ")[0].toLowerCase() !== "bearer") {
      return res
        .status(responseConfig.unauthorizedResponse.statusCode)
        .json(
          ServerResponse.externalResponse(
            false,
            responseConfig.unauthorizedResponse.responseMessage,
            null
          )
        );
    }

    const decoded = await TokenUtil.decodeToken(token);
    if (!decoded.success) {
      return res
        .status(responseConfig.unauthorizedResponse.statusCode)
        .json(
          ServerResponse.externalResponse(
            false,
            responseConfig.unauthorizedResponse.responseMessage,
            decoded.err
          )
        );
    }

    const entity = await userRepo.getOne(decoded.data.email);

    if (!entity.length) {
      return res
        .status(responseConfig.unauthorizedResponse.statusCode)
        .json(
          ServerResponse.externalResponse(
            false,
            responseConfig.unauthorizedResponse.responseMessage,
            null
          )
        );
    }

    req.auth = entity[0];

    next();
  } catch (err) {
    return res
      .status(responseConfig.internalServerError.statusCode)
      .json(
        ServerResponse.externalResponse(
          false,
          responseConfig.internalServerError.responseMessage,
          null
        )
      );
  }
};
