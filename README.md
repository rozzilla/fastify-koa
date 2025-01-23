# `fastify-koa`

Convert an array of Koa middlewares into [Fastify plugins](https://www.fastify.io/docs/latest/Reference/Plugins/).

## 👉🏼 IMPORTANT! 👀

It's **highly** recommended to write "native" Fastify code.
The `fastify-koa` module should only be used as a **temporary** "connector" between your Koa code and Fastify.

## Installation

`npm i fastify-koa`

## Usage

If you have a Koa middleware like this one:

```js
(_, next) => {
  console.log("middleware run");
  return next();
}
```

or a route like:

```js
const koaRouter = new Router();
koaRouter.get("/koa", async (ctx) => {
  ctx.body = "Hello from Koa\n";
});
```

you can use the `fastify-koa` plugin to use them in your Fastify code:

```js
server.register(koaToFastify, [
  // your Koa middlewares/routes
])
```

## Example

Full working example code:

```js
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

```shell
# From your node.js process
middleware run

# From the shell where you run the `curl` command
Hello from Fastify
Hello from Koa
```
