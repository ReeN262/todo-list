import {TaskEntity} from "./task.entity";
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import {ProjectEntity} from "../project/project.entity";
import {ProjectService} from "../project/project.service";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProjectEntity])],
  providers: [TaskService, ProjectService],
  controllers: [TaskController]
})
export class TaskModule {}
