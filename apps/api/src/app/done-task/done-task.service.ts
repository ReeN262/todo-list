import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DoneTask} from "./done-task.interface";
import {DoneTaskEntity} from "../entity/doneTask.entity";
import {Project} from "../project/project.interface";

@Injectable()
export class DoneTaskService {

  constructor(
    @InjectRepository(DoneTaskEntity)
    readonly doneTaskEntity: Repository<DoneTaskEntity>
  ) {}

   addTask(data: DoneTask): DoneTask {
    const doneTask = this.doneTaskEntity.create({
      taskName: data.taskName,
      project: data.project,
    });

    doneTask.save();

    return doneTask;
  }

  findAllDoneTask(project: Project): Promise<DoneTaskEntity[] | undefined> {
    return this.doneTaskEntity.find({where: {project: project.id}});
  }

  findDoneTask(taskId: number): Promise<DoneTaskEntity | undefined> {
    return this.doneTaskEntity.findOne(taskId, {loadRelationIds: true});
  }

  deleteDoneTask(doneTask: DoneTaskEntity) {
    this.doneTaskEntity.delete(doneTask.id);
  }
}
