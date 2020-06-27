import { Band } from "../types.ts";
// import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { db } from "../db/dbconnect.ts";

const bandCollection = db.collection("bandCollection");
const bands: Band = [];
const getBands = async (ctx:any) => {
    const data = await bandCollection.find();
    ctx.render("static/bands.html",{data:data});
    ctx.response.body = {
      success: true,
    };
  };

const addBand = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "The request is empty",
    };
  } else {
    const { name, genre, website }: Band = body.value;
    const id = await bandCollection.insertOne({
      name: name,
      genre: genre,
      website: website,
    });

    response.status = 201;
    response.body = id;
  }
};
const getBandsById = async ({
  request,
  response,
  params,
}: {
  request: any;
  response: any;
  params: { id: string };
}) => {
  let id: string | undefined = params.id;
  const data: any = await bandCollection.findOne({ _id: { "$oid": id } });
  if (!data) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Could Not find",
    };
  } else {
    response.status = 201;
    response.body = {
      success: true,
      data: data,
    };
  }
};
const deleteBand = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: true,
      msg: "The request is empty",
    };
  } else {
    var x = bands.pop();
    console.log(x);
    response.status = 201;
    response.body = {
      success: true,
      msg: `${x.data} Removed`,
    };
  }
};

export { getBands, addBand, deleteBand, getBandsById };
