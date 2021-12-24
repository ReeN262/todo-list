import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Project} from "../project/project.interface";
import {InProgressTask} from "./in-progress-task.interface";
import {InProgressEntity} from "../entity/in-progress.entity";

@Injectable()
export class InProgressTaskService {
  constructor(
    @InjectRepository(InProgressEntity)
    readonly InProgressEntity: Repository<InProgressEntity>
  ) {}

  addTask(data: InProgressTask): InProgressTask {
    const InProgressTask = this.InProgressEntity.create({
      taskName: data.taskName,
      project: data.project,
    });

    InProgressTask.save();

    return InProgressTask;
  }

  findAllInProgressTask(project: Project): Promise<InProgressEntity[] | undefined> {
    return this.InProgressEntity.find({where: {project}});
  }

  findInProgressTask(id: number) {
    return this.InProgressEntity.findOne(id, {loadRelationIds: true});
  }

  deleteInProgressTask(InProgressTask: InProgressEntity) {
    this.InProgressEntity.delete(InProgressTask.id);
  }
}
