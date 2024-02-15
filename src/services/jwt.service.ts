import {injectable} from "inversify";
import {verify, decode, sign, JwtPayload} from "jsonwebtoken";
import {UserDto} from "../dto/user.dto";

@injectable()
export class JwtService {
  public readonly JWT_SECRET = 'secret'; // ;)

  public generateJWT(payload: UserDto | object): string {
    return sign(
      {
        ...payload
      },
      this.JWT_SECRET,
      {
        expiresIn: '1m',
      }
    );
  }

  public validateJWT(token: string): string | JwtPayload {
    return verify(token, this.JWT_SECRET);
  }

  public decodeJWT(token: string): string | JwtPayload | null {
    return decode(token);
  }

}