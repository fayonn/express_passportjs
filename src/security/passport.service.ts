import {inject, injectable} from "inversify";
import {DEPENDENCY_TAG} from "../container/dependency-tags";
import {UsersService} from "../services/users.service";
import passport, {PassportStatic} from "passport";
import LocalStrategy from "passport-local";
import JwtStrategy, {ExtractJwt} from "passport-jwt";
import {JwtService} from "../services/jwt.service";
import {compareSync} from "bcrypt";

@injectable()
export class PassportService {
  private _passport: PassportStatic = passport;

  get passport() {
    return this._passport;
  }

  constructor(
    @inject(DEPENDENCY_TAG.USERS_SERVICE) private readonly usersService: UsersService,
    @inject(DEPENDENCY_TAG.JWT_SERVICE) private readonly jwtService: JwtService,
  ) {
    this.setupLocalStrategy();
    this.setupJwtStrategy();
  }

  private setupLocalStrategy(): void {
    this._passport.use(new LocalStrategy.Strategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email: string, password: string, cb) => {
        try {
          const user = await this.usersService.getByEmail(email);
          if (!user)
            return cb(null, user, {message: 'Wrong email or password'});

          if (!compareSync(password, user.password))
            return cb(null, user, {message: 'Wrong email or password'});

          return cb(null, user, {message: 'Logged In Successfully'});
        } catch (err) {
          return cb(err);
        }
      }
    ));
  }

  private setupJwtStrategy(): void {
    this._passport.use(new JwtStrategy.Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.jwtService.JWT_SECRET
      },
      async (token, cb) => {
        try {
          const user = await this.usersService.getByEmail(token.email);
          if (!user)
            return cb(null, false);

          return cb(null, user, token);
        } catch (err) {
          cb(err);
        }
      }
    ));
  }
}