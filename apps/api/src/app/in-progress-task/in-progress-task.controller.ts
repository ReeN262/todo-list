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
import {ProjectService} from "../project/project.service";
import {PassportGuard} from "../passport.guard";
import {User} from "../user.decorator";
import {InProgressTaskService} from "./in-progress-task.service";
import {DeleteInProgressDto, GetAllInProgressDto, InProgressDto} from "./dtos/in-progress.dto";

@Controller('in-progress-task')
export class InProgressTaskController {
  constructor(readonly inProgressTaskService: InProgressTaskService,
              readonly projectService: ProjectService) {}

  @UseGuards(PassportGuard)
  @Post('add')
  async addInProgressTask(@Body() body: InProgressDto) {
    const doneTask = await this.inProgressTaskService.addTask({
      taskName: body.taskName,
      project: body.project
    })

    if (!doneTask) throw new BadRequestException('Adding InProgressTask error');

    return doneTask;
  }
  @UseGuards(PassportGuard)
  @Get('get/all/:projectId')
  async getAllInProgressTask(@User() user, @Param() params: GetAllInProgressDto) {
    const project = await this.projectService.findProjectBy(params.projectId);

    if (!project) throw new NotFoundException('Project not found');

    return this.inProgressTaskService.findAllInProgressTask(project);
  }

  @UseGuards(PassportGuard)
  @Delete('delete/:taskId')
  async deleteInProgressTask(@Param('taskId') param: DeleteInProgressDto)  {
    const task = await this.inProgressTaskService.findInProgressTask(param.taskId);

    if (!task) throw new NotFoundException('InProgressTask not found');

    return this.inProgressTaskService.deleteInProgressTask(task);
  }
}
