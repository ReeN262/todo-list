import { Module } from '@nestjs/common';
import { DoneTaskService } from './done-task.service';
import { DoneTaskController } from './done-task.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectService} from "../project/project.service";
import {InProgressEntity} from "../entity/in-progress.entity";
import {ProjectEntity} from "../entity/project.entity";
import {DoneTaskEntity} from "../entity/doneTask.entity";
import {InProgressTaskService} from "../in-progress-task/in-progress-task.service";


@Module({
  imports: [TypeOrmModule.forFeature([InProgressEntity, ProjectEntity, DoneTaskEntity])],
  providers: [DoneTaskService, ProjectService, InProgressTaskService],
  controllers: [DoneTaskController]
})
export class DoneTaskModule {}
