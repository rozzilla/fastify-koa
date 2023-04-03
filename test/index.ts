import koaToFastify from '../';
import Router from 'koa-router';
import fastify from 'fastify';
import tap from 'tap';

const port = 4042;
const server = fastify();

const koaRouter = new Router();
koaRouter.get('/koa', async (ctx) => (ctx.body = 'This is NOT the way!'));

(async () => {
  server.register(koaToFastify, [koaRouter.routes()]);
  server.get('/fastify', async () => 'This is the way!');

  await server.ready();

  server.listen({ port });

  tap.test('Should load both Fastify and Koa code', {}, async () => {
    try {
      const fastifyResponse = await fetch('http://localhost:4042/fastify');
      const fastifyText = await fastifyResponse.text();

      const koaResponse = await fetch('http://localhost:4042/koa');
      const koaText = await koaResponse.text();

      tap.equal(fastifyText, 'This is the way!');
      tap.equal(koaText, 'This is NOT the way!');
    } catch (err) {
      console.error(err);
      tap.equal(true, false);
    }
  });
})();

tap.teardown(async () => {
  try {
    await server.close();
  } catch (err) {
    console.error(err);
  }
});
