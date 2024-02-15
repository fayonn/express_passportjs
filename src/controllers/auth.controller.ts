import {BaseController} from "../common/base.controller";
import {inject, injectable} from "inversify";
import {Request, Response, NextFunction} from "express";
import {UserDto} from "../dto/user.dto";
import {DEPENDENCY_TAG} from "../container/dependency-tags";
import {UsersService} from "../services/users.service";
import 'reflect-metadata';
import {PassportService} from "../security/passport.service";
import {LoginMiddleware} from "../middlewares/login.middleware";
import {JwtService} from "../services/jwt.service";

@injectable()
export class AuthController extends BaseController {

  constructor(
    @inject(DEPENDENCY_TAG.USERS_SERVICE) private usersService: UsersService,
    @inject(DEPENDENCY_TAG.PASSPORT_SERVICE) private passportService: PassportService,
    @inject(DEPENDENCY_TAG.JWT_SERVICE) private jwtService: JwtService,
  ) {
    super();

    this.bindRoutes([
      {path: '/signIn', method: 'post', func: this.signIn, middlewares: [new LoginMiddleware(this.passportService)]},
      {path: '/signUp', method: 'post', func: this.signUp},
      {path: '/logout/:userId', method: 'post', func: this.logout},
    ]);
  }

  async signIn(
    {body}: Request<{}, {}, Partial<UserDto>>,
    res: Response,
    next: NextFunction,
  ) {
    console.log("LOGIN", body);

    const jwt = this.jwtService.generateJWT(body);

    res.send(jwt);
  }

  async signUp(
    req: Request<{}, {}, UserDto>,
    res: Response,
    next: NextFunction,
  ) {
    console.log("BODY", req.body)
    await this.usersService.add(req.body);
    res.send(req.body);
  }

  async logout(
    req: Request<{userId: string}>,
    res: Response,
    next: NextFunction,
  ) {

  }
}