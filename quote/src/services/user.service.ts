import { responseConfig } from "../config/response.config";

import { IinternalServerResponse } from "../interfaces/internalServerResponse.interface";
import { UserRepo } from "../repository/user.repository";

import { ServerResponse } from "../utils/ServerResponse.util";

import { Quote } from "./quote.service";

export class UserService {
  userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }

  async get(userName: string): Promise<IinternalServerResponse> {
    const newQuote = await Quote.getQuote();

    return ServerResponse.internalResponse(
      true,
      `${responseConfig.successResponse.responseMessage} ${userName}`,
      responseConfig.createdResponse.statusCode,
      newQuote
    );
  }
}
