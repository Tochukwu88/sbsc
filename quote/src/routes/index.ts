import { Application } from "express";
import userRouter from "./user.routes";

const apiPrefix: string = "/api/v1";

const routes = [
  {
    prefix: "quotes",
    name: userRouter,
  },
];

export default (app: Application) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}/${element.prefix}`, element.name);
  });
  return app;
};
