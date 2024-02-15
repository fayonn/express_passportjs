import {MiddlewareInterface} from "../common/middleware.interface";
import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "inversify";
import {DEPENDENCY_TAG} from "../container/dependency-tags";
import {PassportService} from "../security/passport.service";

@injectable()
export class LoginMiddleware implements MiddlewareInterface {
  constructor(
    @inject(DEPENDENCY_TAG.PASSPORT_SERVICE) private passportService: PassportService,
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    this.passportService.passport.authenticate(
      "local",
      {session: false},
    )(req, res, next);
  }

}