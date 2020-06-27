import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import {
  getBands,
  addBand,
  deleteBand,
  getBandsById,
} from "./controllers/bands.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const denjuckEngine = engineFactory.getDenjuckEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();
const PORT = 8080;
const router = new Router();

app.use(viewEngine(oakAdapter, denjuckEngine));

router
  .get("/", (ctx) => {
    ctx.render("static/index.html");
  })
  .get("/bands", getBands)
  .post("/bands", addBand)
  .post("/delbands", deleteBand)
  .get("/bands/:id", getBandsById);

app.use(router.routes());
app.use(router.allowedMethods());
console.log(`App started on ${PORT}`);

await app.listen({ port: PORT });
