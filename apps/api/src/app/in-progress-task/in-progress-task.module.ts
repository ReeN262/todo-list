import { Module } from '@nestjs/common';
import { InProgressTaskService } from './in-progress-task.service';
import { InProgressTaskController } from './in-progress-task.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {InProgressEntity} from "../entity/in-progress.entity";
import {ProjectService} from "../project/project.service";
import {ProjectEntity} from "../entity/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InProgressEntity, ProjectEntity])],
  providers: [InProgressTaskService, ProjectService],
  controllers: [InProgressTaskController]
})
export class InProgressTaskModule {}
