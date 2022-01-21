import * as RedisStore from 'connect-redis';
import * as redis from 'redis';
import * as session from 'express-session';
import {ConfigModule} from "@nestjs/config";
import { Module } from '@nestjs/common';
import {SessionModule} from "nestjs-session";
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./components/auth/auth.module";
import {TaskEntity} from "./components/task/task.entity";
import {TaskModule} from "./components/task/task.module";
import { ProjectEntity } from "./components/project/project.entity";
import {ProjectModule} from "./components/project/project.module";
import {UserEntity} from "./components/user/user.entity";
import {UserModule} from "./components/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SessionModule.forRoot({
      session: {
        store: new (RedisStore(session))({
          client: redis.createClient({
            url: process.env.REDIS_URL,
          }),
        }),
        secret: `${process.env.REDIS_SECRET_KEY}`,
        resave: false,
        saveUninitialized: false,
        // cookie: {httpOnly: false, secure: false},
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserEntity, ProjectEntity, TaskEntity],
      synchronize: true,
    }),
    ProjectModule,
    TaskModule,
    UserModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
