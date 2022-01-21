import {Controller, Delete, Get, Res, Session, UseGuards} from '@nestjs/common';
import {PassportGuard} from "../../guards/passport.guard";
import {User} from "./user.interface";
import {User as UserDecorator } from "../../decorators/user.decorator";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {
  }
 @Get('info')
 @UseGuards(PassportGuard)
 async userInfo(@UserDecorator() user: User) {
   return await this.userService.findUserByEmail(user.email);
 }
 @Delete('delete')
 @UseGuards(PassportGuard)
 async logout(@Session() session, @Res() res) {
    session.destroy(() => {
      res.clearCookie('connect.sid');
      res.end()
    })
 }
}
