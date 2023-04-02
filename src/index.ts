import fastifyExpress from '@fastify/express';
import plugin from 'fastify-plugin';
import k2e from 'koa-to-express';
import Router from 'koa-router';

export default plugin<Router.IMiddleware[]>((server, middlewares) =>
  server.register(fastifyExpress).after(() => middlewares.forEach((middleware) => server.use(k2e(middleware)))),
);
