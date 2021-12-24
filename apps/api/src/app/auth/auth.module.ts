import { Module } from '@nestjs/common';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import {UserEntity} from "../entity/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthService } from './auth.service';
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthStrategy, AuthService, Repository, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
