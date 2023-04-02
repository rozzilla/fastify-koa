declare module "koa-to-express" {
  import Router from "koa-router";
  import { ApplicationRequestHandler } from "express";

  export default function koaToExpress(
    opt: Router.IMiddleware
  ): ApplicationRequestHandler;
}
