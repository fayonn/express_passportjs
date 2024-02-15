import { Request, Response, NextFunction, Router } from 'express';
import {MiddlewareInterface} from "./middleware.interface";

export interface Route {
  path: string;
  func: (req: Request<any>, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'put' | 'patch' | 'delete' | 'post'>;
  middlewares?: MiddlewareInterface[]
}