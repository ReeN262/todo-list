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
import { User as UserI } from '../user/user.interface';
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@User() user: UserI, @Res() res: Response, @Session() session) {
    if (!user) {
      const newUser = await this.authService.newUser(user);

      if (!newUser) throw new BadRequestException('User create error');

      session.user = user.email;
      res.redirect('http://localhost:4200/todo-list')
    } else {
      session.user = user.email;
      res.redirect('http://localhost:4200/todo-list')
    }
  }
}
