import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from "express";
import Pages from "../models/Pages";
import { createHmac } from 'node:crypto';

type reportType = {
  message: string
}

export const middlewareStore = async () => {

};

export const middlewareCreate = async (request: Request, _: Response) => {
  const report: reportType = {message: "imagem baixada para o sistema 🧅"};
  const {name, link} = request.body;
  const imagename = createHmac('sha256', process.env.CRYKEY as string)
    .update(name)
    .digest('hex');
  await Pages.update_image(imagename, link);
};