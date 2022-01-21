import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import {ProjectEntity} from "./project.entity";
import { ProjectService } from './project.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
