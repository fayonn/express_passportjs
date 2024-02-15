import {BaseController} from "../common/base.controller";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {DEPENDENCY_TAG} from "../container/dependency-tags";
import {PassportService} from "../security/passport.service";
import {UsersService} from "../services/users.service";
import {NextFunction, Request, Response} from "express";
import {SecureMiddleware} from "../middlewares/secure.middleware";

@injectable()
export class UserController extends BaseController {

  constructor(
    @inject(DEPENDENCY_TAG.PASSPORT_SERVICE) private passportService: PassportService,
    @inject(DEPENDENCY_TAG.USERS_SERVICE) private usersService: UsersService,
  ) {
    super();
    this.bindRoutes([
      {path: "/:email", method: "get", func: this.getUser, middlewares: [new SecureMiddleware(this.passportService)]}
    ]);
  }

  async getUser(
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction,
  ) {
    // no check )
    console.log("req.query.email", req.params.email)
    const user = await this.usersService.getByEmail(req.params.email as string);
    res.status(200).send(user);
  }
}