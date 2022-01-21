import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserEntity} from "../components/user/user.entity";

@Injectable()
export class PassportGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sessionUser = request.session.user;

    if (!sessionUser) {
      throw new UnauthorizedException();
    }

    const findUser = await UserEntity.findOne({where: {email: sessionUser}});

    if (!findUser) {
      throw new UnauthorizedException();
    }
    request.user = findUser;
    return true;
  }
}
