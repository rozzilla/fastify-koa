# fastify-koa

Convert Koa middlewares into Fastify plugins

## Installation

`npm i fastify-koa`

## Usage

If you have a Koa middleware like this one:

```
(_, next) => {
  console.log("middleware run");
  return next();
}
```

or a route like:

```
const koaRouter = new Router();
koaRouter.get("/koa", async (ctx) => {
  ctx.body = "Hello from Koa\n";
});
```

you can use the `fastify-koa` plugin to use them in your Fastify code:

```
server.register(koaToFastify, [
  // your Koa middlewares/routes
])
```

## Example

Full working example code:

```
import fastify, { FastifyInstance } from "fastify";
import koaToFastify from "fastify-koa";
import Router from "koa-router";

const port = 3000;
const server: FastifyInstance = fastify();

const koaRouter = new Router();
koaRouter.get("/koa", async (ctx) => {
  ctx.body = "Hello from Koa\n";
});

(async () => {
  server.register(koaToFastify, [
    (_, next) => {
      console.log("middleware run");
      return next();
    },
    koaRouter.routes(),
  ]);

  server.get("/fastify", async () => "Hello from Fastify\n");

  await server.ready();

  server.listen({ port }, (err) =>
    err ? console.error(err) : console.log("listening on port", port)
  );
})();
```

When you build and run this code, calling `curl http://localhost:3000/fastify && curl http://localhost:3000/koa` you'll get:

```
# From your node.js process
middleware run

# From the shell where you run the `curl` command
Hello from Fastify
Hello from Koa
```
