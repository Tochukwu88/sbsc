import { IinternalServerResponse } from "../interfaces/internalServerResponse.interface";
import { IexternalServerResponse } from "../interfaces/externalServerResponse.interface";
import { Response } from "express";
import { logger } from "./logger.util";
export class ServerResponse {
  static internalResponse(
    success: boolean,

    message: string,
    status_code: number,
    data?: any
  ): IinternalServerResponse {
    logger({
      success,
      message,
      data,
      status_code,
    });
    return {
      success,
      data,
      message,
      status_code,
    };
  }
  static externalResponse(
    success: boolean,
    message: string,
    data?: any
  ): IexternalServerResponse {
    logger({
      success,
      message,
      data,
    });
    return {
      success,
      message,
      data,
    };
  }
}
