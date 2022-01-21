import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import {Repository} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [LocalStrategy, AuthService, Repository, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
