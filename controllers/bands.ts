import { Band } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let bands: Band[] = [];

const getBands = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: bands,
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
    const band: Band = body.value;
    band.id = v4.generate();
    bands.push(band);
    response.status = 201;
    response.body = {
      success: true,
      msg: band,
    };
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
  let id: Band | undefined = bands.find((e) => e.id == params.id);
  if (id === undefined) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Could Not find",
    };
  }else{
  response.status = 201;
  response.body = {
    success: true,
    data: id,
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
