import { NextFunction, request, Request, Response } from "express";
import Pages from "../models/Pages";

export default (_: Request, response: Response) => {
  return response.json();
};

export const store = async (request: Request, response: Response, next: NextFunction) => {
  const {n} = request.body;
  let data = await Pages.store(n);
  response.json(data);
  next();
};

export const item = async (request: Request, response: Response) => {
  const {_id} = request.body;
  let data = await Pages.item(_id);
  response.json(data);
}

export const create = async (request: Request, response: Response, next: NextFunction) => {
  const {_idgroup, name, link} = request.body;
  let data: any = await Pages.create(_idgroup, name, link);
  response.json(data);
  if(data.status!=="error") {
    console.log({message: "página registrada no sistema 🌭"});
    next();
  }
};

export const search = async (request: Request, response: Response) => {
  const {search} = request.body;  
  let data = await Pages.search(search);
  response.json(data);
};

export const update = async (request: Request, response: Response) => {
  const {_id, name, link} = request.body;
  const data = await Pages.update(_id, name, link);
  return response.json(data);
}

export const isonline = async (request: Request, response: Response) => {
  const {link} = request.body;
  const data = await Pages.isonline(link);
  return response.json(data);
}

export const remove = async (request: Request, response: Response) => {
  const {_ids} = request.body;
  const data = await Pages.removeList(_ids);
  return response.json(data);
};
