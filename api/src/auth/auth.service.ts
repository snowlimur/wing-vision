import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.one({ email: email });
    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return {
      user: { email: user.email },
      accessToken: this.jwtService.sign(payload),
      tokenType: "bearer"
    };
  }
}
