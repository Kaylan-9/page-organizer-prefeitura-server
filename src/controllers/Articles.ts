import { Request, Response } from "express";
import Articles from "../models/Articles";

export default (_: Request, response: Response) => {
  return response.json();
};

export const store = async (_: Request, response: Response) => {
  let data = await Articles.store;
  response.send(data);
};

export const store_n = async (request: Request, response: Response) => {
  const {n} = request.body;
  let data = await Articles.store_n(n);
  response.send(data);
};


export const text = async (request: Request, response: Response) => {
  const {_id} = request.params;
  let data = await Articles.text(_id);
  response.send({text: data});
};

export const create = async (request: Request, response: Response) => {
  const {title, _content} = request.body;
  let data: any = await Articles.create(title, _content);
  return response.json(data);
};

export const remove = async (request: Request, response: Response) => {
  const {_ids} = request.body;
  const data = await Articles.remove(_ids);
  response.json(data);
}

export const update = async (request: Request, response: Response) => {
  const {_id, _content} = request.body;
  const data = await Articles.update(_id, _content);
  return response.json(data);
};


