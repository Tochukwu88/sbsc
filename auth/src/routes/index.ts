import { Application } from "express";
import authRouter from "./auth.routes";

const apiPrefix: string = "/api/v1";

const routes = [
  {
    prefix: "auth",
    name: authRouter,
  },
];

export default (app: Application) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}/${element.prefix}`, element.name);
  });
  return app;
};
