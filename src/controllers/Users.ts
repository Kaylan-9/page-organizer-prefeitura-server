import { NextFunction, Request, Response } from "express";
import Users from "../models/Users";

export default (_: Request, response: Response) => {
  return response.json();
};

export const appointments = async (request: Request, response: Response) => {
  const {ip} = request.body;
  const data = await Users.appointments(ip);
  return response.json(data);
};

export const store = async (_: Request, response: Response, next: NextFunction) => {
  let data = await Users.store;
  response.json(data);
  next();
};

export const create = async (request: Request, response: Response, next: NextFunction) => {
  const {ip} = request.body;
  let data: any = await Users.create(ip);
  response.json(data);
  next();
};

export const pages = async (request: Request, response: Response) => {
  const {ip, n} = request.body;
  let data: any = await Users.pages(ip, n);
  return response.json(data);
};

export const page_remove = async (request: Request, response: Response) => {
  const {ip, _idpage} = request.body;
  let data: any = await Users.page_remove(ip, _idpage);
  return response.json(data);
};

export const page_add = async (request: Request, response: Response) => {
  const {ip, _idpage} = request.body;
  let data: any = await Users.page_add(ip, _idpage);
  return response.json(data);
};

export const page_exist = async (request: Request, response: Response) => {
  const {ip, _idpage} = request.body;
  let data: any = await Users.page_exist(ip, _idpage);
  return response.json(data);
};

export const view_add = async (request: Request, response: Response) => {
  const {ip, _idinfo} = request.body;
  let data: any = await Users.view_add(ip, _idinfo);
  return response.json(data);
};

export const remove = (_: Request, response: Response) => {
  return response.json();
};

export const update = (_: Request, response: Response) => {
  return response.json();
};