import { Application, Router } from 'https://deno.land/x/oak@v6.5.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { routes } from './routes.ts';

const PORT = 4000;

const router = new Router();
router
  .get('/characters', routes.getCharacters)
  .get('/characters/:id', routes.getCharacter);

const app = new Application();

app.use(
  oakCors({
    origin: '*',
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}`);

await app.listen({ port: PORT });
