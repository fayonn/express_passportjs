import {Router} from "express";
import {injectable} from "inversify";
import {Route} from "./route.interface";

@injectable()
export class BaseController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  protected bindRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      const middlewares = route.middlewares?.map((x) => x.execute.bind(x));
      const pipeline = middlewares
        ? [...middlewares, route.func.bind(this)]
        : route.func.bind(this);
      this._router[route.method](route.path, pipeline);
    });
  }
}