import { Request } from "express";
import pino from "pino";

export function logger<T>(meta?: T, req?: Request) {
  let data: any;
  if (req) {
    data = {
      environment: process.env.NODE_ENV,
      host: req.hostname || "",
      headers: req.headers
        ? req.headers.apikey
        : req.headers["authorization"] || "",
      method: req.method || "",
      path: req.originalUrl || "",
      query: req.query || "",

      ip: req.ip || "",
      params: req.params || "",
      body: JSON.stringify(req.body || {}),
      statusCode: req.statusCode,
    };
  } else {
    data = meta;
  }
  const loggerOptions = {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  };
  pino(loggerOptions).info(data!);
}
