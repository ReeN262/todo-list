import {
  BadRequestException,
  Controller,
  Get,
  Res,
  Session,
  UseGuards
} from '@nestjs/common';

import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express'
import { User } from "../../decorators/user.decorator";
import { UserService } from "../user/user.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@User() user, @Res() res: Response, @Session() session) {

    const findUser = await this.userService.findUserByEmail(user.email)

    if (!findUser) {

      const newUser = await this.userService.newUser(user);

      if (!newUser) throw new BadRequestException('User create error');

      session.user = user.email;
      res.redirect('http://localhost:4200/todo-list')
    } else {
      session.user = user.email;
      res.redirect('http://localhost:4200/todo-list')
    }
  }
}
