import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from "typeorm";

import { Project } from "./project.interface";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    readonly projectEntity: Repository<ProjectEntity>) {}

  createNewProject(data: Project): Promise<Project> {
    return this.projectEntity.save({
      name: data.name,
      user: data.user,
    })
  }

  findProjectBy(id: number): Promise<ProjectEntity> {
    return this.projectEntity.findOne(id);
  }

  deleteProject(projectId: number): Promise<DeleteResult>{
   return this.projectEntity.delete(projectId);
  }

  findAllProjects(user: UserEntity): Promise<Array<Project>> {
    return this.projectEntity.find({where: {user: user}})
  }
}
