import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  NotFoundException,
  InternalServerErrorException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
  }

  @Post("login")
  async login(@Body() loginDTO: LoginDto) {
    const user = await this.authService.validateUser(loginDTO.email, loginDTO.password);
    if (!user) {
      throw new NotFoundException();
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  async refresh(@Request() req) {
    return this.authService.login(req.user);
  }


  @Post("signup")
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create({
      email: createUserDto.email,
      password: createUserDto.password, // @todo use hash
      salt: '12345', // @todo generate salt
    });

    if (!user) {
      throw new InternalServerErrorException();
    }

    return this.authService.login(user);
  }
}
