import {Container} from "inversify";
import {App} from "../app";
import {DEPENDENCY_TAG} from "./dependency-tags";
import {UsersService} from "../services/users.service";
import {UserController} from "../controllers/user.controller";
import {PassportService} from "../security/passport.service";
import {JwtService} from "../services/jwt.service";
import {SecureMiddleware} from "../middlewares/secure.middleware";
import {LoginMiddleware} from "../middlewares/login.middleware";
import {AuthController} from "../controllers/auth.controller";

export class AppContainer extends Container{
  constructor() {
    super();

    this.bind<App>(DEPENDENCY_TAG.APPLICATION).to(App).inSingletonScope();
    this.bind<UsersService>(DEPENDENCY_TAG.USERS_SERVICE).to(UsersService).inSingletonScope();
    this.bind<UserController>(DEPENDENCY_TAG.USERS_CONTROLLER).to(UserController).inSingletonScope();
    this.bind<PassportService>(DEPENDENCY_TAG.PASSPORT_SERVICE).to(PassportService).inSingletonScope();
    this.bind<JwtService>(DEPENDENCY_TAG.JWT_SERVICE).to(JwtService).inSingletonScope();
    this.bind<SecureMiddleware>(DEPENDENCY_TAG.SECURE_MIDDLEWARE).to(SecureMiddleware).inSingletonScope();
    this.bind<LoginMiddleware>(DEPENDENCY_TAG.LOGIN_MIDDLEWARE).to(LoginMiddleware).inSingletonScope();
    this.bind<AuthController>(DEPENDENCY_TAG.AUTH_CONTROLLER).to(AuthController).inSingletonScope();
  }
}