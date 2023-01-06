import { Request, Response } from "express";
import Indicators from "../models/Indicators";

export const least_visited_pages = async (_: Request, response: Response) => {
  const data = await Indicators.least_visited_pages();
  response.send(data);
};

export const users = async (_: Request, response: Response) => {
  const data = await Indicators.users();
  response.send(data);
};

export const least_visited_infos = async (_: Request, response: Response) => {
  const data = await Indicators.least_visited_infos();
  response.send(data);
};