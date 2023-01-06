import { Request, Response } from "express";
import Adms from "../models/Adms";

export const login = async (request: Request, response: Response) => {
  const {name, password} = request.body;
  const data = await Adms.login(name, password);
  console.log(data.exist);
  return response.json(data);
};