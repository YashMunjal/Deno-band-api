import {MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";


//client
const client = new MongoClient();

client.connectWithUri("mongodb://localhost:27017");

const dbname :string = "Bands_data";
const db = client.database(dbname);

const collection = db.collection("band_collection");

export {db,collection};