import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {UserEntity} from "./entity/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import * as redis from 'redis';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import {SessionModule} from "nestjs-session";
import {ProjectEntity} from "./entity/project.entity";
import {InProgressEntity} from "./entity/in-progress.entity";
import {DoneTaskEntity} from "./entity/doneTask.entity";
import {ProjectModule} from "./project/project.module";
import {UserModule} from "./user/user.module";
import {DoneTaskModule} from "./done-task/done-task.module";
import {InProgressTaskModule} from "./in-progress-task/in-progress-task.module";

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
        cookie: {httpOnly: false, secure: false},
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserEntity, ProjectEntity, InProgressEntity, DoneTaskEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, ProjectEntity, InProgressEntity, DoneTaskEntity]),
    ProjectModule,
    DoneTaskModule,
    InProgressTaskModule,
    UserModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
