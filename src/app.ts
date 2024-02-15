import {inject, injectable} from "inversify";
import express, {Express, json} from "express";
import {Server} from 'http';
import 'reflect-metadata';
import {DEPENDENCY_TAG} from "./container/dependency-tags";
import {UserController} from "./controllers/user.controller";
import {PassportService} from "./security/passport.service";
import {AuthController} from "./controllers/auth.controller";

@injectable()
export class App {
  private app: Express;
  private server: Server;
  private port = 8000;

  constructor(
    @inject(DEPENDENCY_TAG.USERS_CONTROLLER) private userController: UserController,
    @inject(DEPENDENCY_TAG.AUTH_CONTROLLER) private authController: AuthController,
  ) {
    this.app = express();
  }

  private useRoutes(): void {
    this.app.use('/v1/auth', this.authController.router);
    this.app.use('/v1/users', this.userController.router);
  }

  public async init(): Promise<void> {
    this.app.use(json());
    this.useRoutes();
    this.app.listen(this.port);
    console.log(`Server has been started on http://localhost:${this.port}`)
  }

}