import {Application,Router } from  "https://deno.land/x/oak/mod.ts";
import {getBands,addBand} from "./controllers/bands.ts";

const app = new Application();
const PORT = 8080;
const router = new Router();

router
    .get("/bands",getBands)
    .post("/bands",addBand);



app.use(router.routes());
console.log(`App started on ${PORT}`);

await app.listen({port:PORT});