export const responseConfig = {
  welcomeResponse: {
    statusCode: 200,
    responseMessage: "Welcome to the Deliverfix api",
  },
  apiNotFound: {
    statusCode: 404,
    responseMessage: "Please use /api/v1/<specific resource> to acess the API",
  },
  EntityExistResponse: {
    statusCode: 409,
    responseMessage: "Entity already exists",
  },
  EntityNotFoundResponse: {
    statusCode: 404,
    responseMessage: "Entity not found",
  },
  successResponse: {
    statusCode: 200,
    responseMessage: "success",
  },
  createdResponse: {
    statusCode: 201,
    responseMessage: "created successfully",
  },
  invalidLoginDetails: {
    statusCode: 401,
    responseMessage: "incorrect login details",
  },
  unauthorizedResponse: {
    statusCode: 401,
    responseMessage: "unauthorized access",
  },
  otpSent: {
    statusCode: 201,
    responseMessage: "an OTP has been send to your email address",
  },
  internalServerError: {
    statusCode: 500,
    responseMessage: "An error occurred, Please contact Support",
  },
};
