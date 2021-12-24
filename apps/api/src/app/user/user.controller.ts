import {Controller, Get, Req, Res, Session, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {PassportGuard} from "../passport.guard";
import {User as UserDecorator } from "../user.decorator";
import {User} from "./user.interface";
import * as redis from "redis";

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {
  }
 @Get('info')
 @UseGuards(PassportGuard)
 async userInfo(@UserDecorator() user: User) {
   return this.userService.findUserByEmail(user.email)
 }
 @Get('delete')
 @UseGuards(PassportGuard)
 async logout(@Session() session, @Res() res, @Req() req) {
    session.destroy(() => {
      res.clearCookie('connect.sid');
      res.end()
    })
 }
}
