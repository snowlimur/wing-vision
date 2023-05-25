import { Body, Controller, Get, Param, Post, Patch, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { UsersService } from "./users/users.service";
import { UpdateUserDto } from "./users/dto/update-user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  profile(@Request() req) {
    return this.usersService.one({ id: +req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch("profile")
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ where: { id: +req.user.id }, data: updateUserDto });
  }
}
