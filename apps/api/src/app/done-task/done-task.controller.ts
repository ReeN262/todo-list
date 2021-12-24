import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post, Put,
  UseGuards
} from '@nestjs/common';
import {DoneTaskService} from "./done-task.service";
import {DeleteDoneTaskDto, DoneTaskDto, GetAllDoneTaskDto} from "./dtos/doneTask.dto";
import {User} from "../user.decorator";
import {ProjectService} from "../project/project.service";
import {PassportGuard} from "../passport.guard";
import {InProgressTaskService} from "../in-progress-task/in-progress-task.service";


@Controller('done-task')
export class DoneTaskController {
  constructor(readonly doneTaskService: DoneTaskService,
              readonly projectService: ProjectService,
              readonly inProgressService: InProgressTaskService) {}

  @UseGuards(PassportGuard)
  @Post('add')
  async addDoneTask(@Body() body: DoneTaskDto) {
    const task = await this.inProgressService.findInProgressTask(body.progressTaskId);
    if (!task) throw new NotFoundException('Task not found');

    const doneTask = this.doneTaskService.addTask({
      taskName: task.taskName,
      project: task.project,
    })
    await this.inProgressService.deleteInProgressTask(task);

    if (!doneTask) throw new BadRequestException('Adding doneTask error');

    return doneTask;
  }
  @UseGuards(PassportGuard)
  @Get('get/all/:projectId')
  async getAllDoneTask(@User() user, @Param() params: GetAllDoneTaskDto) {
    const project = await this.projectService.findProjectBy(params.projectId);

    if (!project) throw new NotFoundException('Project not found');
    return this.doneTaskService.findAllDoneTask(project);
  }

  @UseGuards(PassportGuard)
  @Delete('delete/:taskId')
  async deleteDoneTask(@Param('taskId') param: DeleteDoneTaskDto)  {
    const task = await this.doneTaskService.findDoneTask(param.taskId);

    if (!task) throw new NotFoundException('Done task not found');

    return this.doneTaskService.deleteDoneTask(task);
  }

  @UseGuards(PassportGuard)
  @Put('backInProgress/:taskId')
  async backInProgress(@Param('taskId') param: DeleteDoneTaskDto)  {
    const task = await this.doneTaskService.findDoneTask(param.taskId);

    if (!task) throw new NotFoundException('Done task not found');

    const progressTask = this.inProgressService.addTask({
      taskName: task.taskName,
      project: task.project,
    })

    await this.doneTaskService.deleteDoneTask(task);

    if (!progressTask) throw new BadRequestException('Error create task');

    return this.doneTaskService.deleteDoneTask(task);
  }
}
