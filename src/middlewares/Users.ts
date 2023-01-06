import { Request, Response } from "express";
import Users from "../models/Users";

type reportType = {
  message: string
}

export const middlewareStore = async () => {
  const report: reportType = {message: "🍓"};
  return console.log(report);
};

export const middlewareCreate = async (request: Request, _: Response) => {
  const report: reportType = {message: "teste 🧅"};
  return console.log(report);
};