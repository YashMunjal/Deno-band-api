import {  MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";



//client
const client = new MongoClient();
client.connectWithUri("mongodb+srv://yashMunjal:aHOENZEeXxzEfrht@cluster0-gjasl.mongodb.net/<dbname>?retryWrites=true&w=majority");

const dbname :string = "Bands_data";
const db = client.database(dbname);


export {db};

//  "aHOENZEeXxzEfrht"