import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {ProjectDeleteDto, ProjectDto} from "./dtos/project.dto";
import {User} from "../user.decorator";
import {PassportGuard} from "../passport.guard";

@Controller('project')
export class ProjectController {
  constructor(readonly projectService: ProjectService) {
  }

  @Post('create')
  @UseGuards(PassportGuard)
  async createNewProject(@User() user, @Body() body: ProjectDto) {

    const userData = {
      id: body.id,
      name: body.name,
      user: user
    };
    const project = await this.projectService.createNewProject(userData)

    if (!project) throw new BadRequestException('Create project error');

    return project;
  }

  @UseGuards(PassportGuard)
  @Get('get/all')
  async getAllProjects(@User() user) {
    return await this.projectService.findAllProjects(user);
  }

  @UseGuards(PassportGuard)
  @Delete('delete/:id')
  async deleteProject(@User() user, @Param() params: ProjectDeleteDto) {
    const findProject = await this.projectService.findProjectBy(params.id);

    if (!findProject) throw new NotFoundException('Project not found');

    return await this.projectService.deleteProject(params.id);
  }
}
