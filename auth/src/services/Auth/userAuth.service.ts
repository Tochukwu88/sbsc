import { responseConfig } from "../../config/response.config";
import { IUser } from "../../interfaces/user.interface";
import { IinternalServerResponse } from "../../interfaces/internalServerResponse.interface";
import { UserRepo } from "../../repository/user.repository";
import { Hasher } from "../../utils/hash.util";
import { v4 as uuidv4 } from "uuid";

import { ServerResponse } from "../../utils/ServerResponse.util";
import { TokenUtil } from "../../utils/token.util";
import { userCreatedEvent } from "../../utils/event";

export class userAuth {
  userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }
  async signIn(
    email: string,
    password: string
  ): Promise<IinternalServerResponse> {
    //check if user with email  exists
    const checkIfuserExist = await this.userRepo.getOne(email);
    console.log(checkIfuserExist);
    if (!checkIfuserExist[0]) {
      //return
      return ServerResponse.internalResponse(
        false,
        responseConfig.invalidLoginDetails.responseMessage,
        responseConfig.invalidLoginDetails.statusCode,
        null
      );
    }
    console.log({ checkIfuserExist });
    //compare password
    if (!Hasher.compare(password, checkIfuserExist[0].password)) {
      return ServerResponse.internalResponse(
        false,
        responseConfig.invalidLoginDetails.responseMessage,
        responseConfig.invalidLoginDetails.statusCode,
        null
      );
    }

    const token = await TokenUtil.generateToken({
      id: checkIfuserExist[0].id,
      name: checkIfuserExist[0].name,
      email: checkIfuserExist[0].email,
    });
    return ServerResponse.internalResponse(
      true,
      responseConfig.successResponse.responseMessage,
      responseConfig.successResponse.statusCode,
      token
    );
  }

  async signUp(payload: IUser): Promise<IinternalServerResponse> {
    const checkIfuserExist = await this.userRepo.getOne(payload.email);
    console.log(checkIfuserExist);
    if (checkIfuserExist && checkIfuserExist.length) {
      //return
      return ServerResponse.internalResponse(
        false,
        responseConfig.EntityExistResponse.responseMessage,
        responseConfig.EntityExistResponse.statusCode,
        null
      );
    }
    //hash the pasword
    const hashedPassword = Hasher.encrypt(payload.password);
    payload.password = hashedPassword;
    payload.id = uuidv4();
    //save to the database
    await this.userRepo.save(payload);
    await userCreatedEvent(payload);

    //generate a token
    const token = await TokenUtil.generateToken({
      id: payload.id,
      name: payload.name,
      email: payload.email,
    });

    //return to the controller
    return ServerResponse.internalResponse(
      true,
      responseConfig.createdResponse.responseMessage,
      responseConfig.createdResponse.statusCode,
      token
    );
  }
  async get(): Promise<IinternalServerResponse> {
    //check if there is a user with tha email address for the sake of this test i am going to skip this check
    const checkIfuserExist = await this.userRepo.getOne("email");
    console.log("users", checkIfuserExist);

    //return to the controller
    return ServerResponse.internalResponse(
      true,
      responseConfig.createdResponse.responseMessage,
      responseConfig.createdResponse.statusCode,
      checkIfuserExist
    );
  }
}
