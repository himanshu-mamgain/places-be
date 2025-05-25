import express, { Express } from "express";
import { IPagination, IGetRequestUser } from "../../utils/interface";

declare global {
  namespace Express {
    interface Request {
      pagination: IPagination;
      payload: any;
      searchQuery: { [key: string]: any };
      sortQuery: { [key: string]: string };
      user?: IGetRequestUser;
    }
  }
}
