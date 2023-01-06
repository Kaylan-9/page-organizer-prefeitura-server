import { NextFunction, Request, Response } from "express";
import GroupsPages from "../models/GroupsPages";

export default (_: Request, response: Response) => {
  return response.json();
};

export const store = async (_: Request, response: Response, next: NextFunction) => {
  let data = await GroupsPages.store;
  response.json(data);
  next();
};

export const search = async (request: Request, response: Response, next: NextFunction) => {
  const {search} = request.body;  
  let data = await GroupsPages.search(search);
  response.json(data);
  next();
};

export const pages = async (request: Request, response: Response) => {
  const {_idgroup} = request.body;
  let data = await GroupsPages.pages(_idgroup);
  response.send(data);
};

export const pages_all = async (request: Request, response: Response) => {
  const {n} = request.body;
  let data = await GroupsPages.pages_all(n);
  response.send(data);
};

export const create = async (request: Request, response: Response) => {
  const {name, color, descricao} = request.body;
  let data: any = await GroupsPages.create(name, color, descricao);
  return response.json(data);
};

export const remove = async (request: Request, response: Response, next: NextFunction) => {
  const {_ids} = request.body;
  const data = await GroupsPages.remove(_ids);
  response.json(data);
  next();
}
export const update = async (request: Request, response: Response) => {
  const {_id, name, color, descricao} = request.body;
  const data = await GroupsPages.update(_id, name, color, descricao);
  return response.json(data);
};