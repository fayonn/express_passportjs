import {injectable} from "inversify";
import {UserDto} from "../dto/user.dto";
import {hash} from "bcrypt";

@injectable()
export class UsersService {
  private users: UserDto[] = [];
  private readonly SALT = 5;

  public async getByEmail(email: string): Promise<UserDto> {
    console.log("users", this.users)
    console.log(this.users.filter(u => {
      console.log(email + ' '+ u.email)
      return u.email === email
    }))
    return this.users.filter(u => u.email === email)[0];
  }

  public async add(user: UserDto): Promise<UserDto> {
    console.log(user)
    user.password = await hash(user.password, this.SALT);
    this.users.push(user);
    return user;
  }

  public async deleteByEmail(email: string): Promise<void> {
    this.users = this.users.filter(u => u.email !== email);
  }
}