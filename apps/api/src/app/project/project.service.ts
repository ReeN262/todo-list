import { Injectable } from '@nestjs/common';
import {ProjectEntity} from "../entity/project.entity";
import {Project} from "./project.interface";
import {Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    readonly projectEntity: Repository<ProjectEntity>) {}

  async createNewProject(data: Project): Promise<Project> {
    const newProject = this.projectEntity.create({
      name: data.name,
      user: data.user,
    })
    newProject.save();

    return newProject;
  }

  async findProjectBy(id: number): Promise<ProjectEntity> {
    return this.projectEntity.findOne(id);
  }

  async deleteProject(projectId: number) {
    await this.projectEntity.delete(projectId);
  }

  async findAllProjects(user: UserEntity): Promise<Array<Project>> {
    return this.projectEntity.find({where: {user: user}})
  }
}
