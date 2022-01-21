import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { TaskEntity } from "./task.entity";
import { Task } from "./task.interface";
import { Project } from "../project/project.interface";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    readonly taskEntity: Repository<TaskEntity>
  ) {}

  async addTask(data: Task): Promise<Task> {
    return await this.taskEntity.save({
      taskName: data.taskName,
      project: data.project,
      isDone: false,
    });
  }

  findAllTask(project: Project, isDone?: boolean): Promise<TaskEntity[] | undefined> {
    return this.taskEntity.find({ where: { project, isDone } });
  }

  findTask(taskId: number) {
    return this.taskEntity.findOne(taskId, { loadRelationIds: true });
  }
  async updateTask(task: TaskEntity, status: boolean): Promise<Task> {
    task.isDone = status;

    return await task.save();
  }

  async deleteTask(task: TaskEntity): Promise<boolean> {
    const deleteTask = await this.taskEntity.delete(task.id);

    return deleteTask.raw !== undefined;
  }
}
