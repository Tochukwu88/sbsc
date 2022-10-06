import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../../utils/ServerResponse.util";

export const validateSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  let schema;
  if (req.query.q == "company") {
    schema = Joi.object({
      name: Joi.string().required().error(new Error("fullName is required")),
      password: Joi.string()
        .required()
        .error(new Error("password is required")),
      email: Joi.string().required().error(new Error("email is required")),
      phone: Joi.string().optional(),
      address: Joi.string().optional(),
      otp: Joi.string().optional(),
      workDays: Joi.string().optional(),
      workHours: Joi.string().optional(),
    });
    const { error } = schema.validate(body);

    if (error) {
      res
        .status(400)
        .json(ServerResponse.externalResponse(false, error?.message, null));
      return;
    }
  }
  if (req.query.q == "user") {
    schema = Joi.object({
      email: Joi.string().required().error(new Error("email is required")),

      otp: Joi.string().required().error(new Error("otp is required")),
    });
    const { error } = schema.validate(body);

    if (error) {
      res
        .status(400)
        .json(ServerResponse.externalResponse(false, error?.message, null));
      return;
    }
  }

  next();
};
export const validateSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  const schema = Joi.object({
    password: Joi.string().required().error(new Error("password is required")),
    email: Joi.string().required().error(new Error("email is required")),
  });
  const { error } = schema.validate(body);

  if (error) {
    res
      .status(400)
      .json(ServerResponse.externalResponse(false, error?.message, null));
    return;
  }

  next();
};
export const validatePreSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  const schema = Joi.object({
    fullName: Joi.string().required().error(new Error("fullName is required")),
    password: Joi.string().required().error(new Error("password is required")),
    email: Joi.string().required().error(new Error("email is required")),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    otp: Joi.string().optional(),
  });
  const { error } = schema.validate(body);

  if (error) {
    res
      .status(400)
      .json(ServerResponse.externalResponse(false, error?.message, null));
    return;
  }

  next();
};
export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  const schema = Joi.object({
    email: Joi.string().required().error(new Error("email is required")),
  });
  const { error } = schema.validate(body);

  if (error) {
    res
      .status(400)
      .json(ServerResponse.externalResponse(false, error?.message, null));
    return;
  }

  next();
};
export const validateNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  const schema = Joi.object({
    password: Joi.string().required().error(new Error("password is required")),
    email: Joi.string().required().error(new Error("email is required")),

    otp: Joi.string().required().error(new Error("otp is required")),
  });
  const { error } = schema.validate(body);

  if (error) {
    res
      .status(400)
      .json(ServerResponse.externalResponse(false, error?.message, null));
    return;
  }

  next();
};
