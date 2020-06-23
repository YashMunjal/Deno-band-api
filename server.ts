import {Application,Router } from  "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 8080;
const router = new Router();

router
    .get("/bands",null)
    .post("/bands",null);

console.log(`App started on ${PORT}`);

await app.listen({port:PORT});