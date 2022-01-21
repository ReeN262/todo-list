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
import {TaskService} from "./task.service";
import {PassportGuard} from "../../guards/passport.guard";
import {ProjectService} from "../project/project.service";
import {User} from "../../decorators/user.decorator";
import {Task} from "./task.interface";

@Controller('task')
export class TaskController {
  constructor(readonly taskService: TaskService,
              readonly projectService: ProjectService) {}

  @UseGuards(PassportGuard)
  @Post('add')
  async addTask(@Body() body: Task) {
    const task = await this.taskService.addTask({
      taskName: body.taskName,
      project: body.project
    })

    if (!task) throw new BadRequestException('Adding task error');

    return task;
  }
  @UseGuards(PassportGuard)
  @Get('get/all/:projectId/:isDone')
  async getAllTask(@User() user, @Param() params: { projectId: number, isDone: boolean }) {
    const project = await this.projectService.findProjectBy(params.projectId);

    if (!project) throw new NotFoundException('Project not found');

    return this.taskService.findAllTask(project, params.isDone);
  }

  @UseGuards(PassportGuard)
  @Put('update')
  async updateTask(@Body() body: { taskId: number, isDone: boolean }): Promise<boolean> {
    const task = await this.taskService.findTask(body.taskId);

    if (!task) throw new NotFoundException('Task not found');

    await this.taskService.updateTask(task, body.isDone);

    return true;
  }

  @UseGuards(PassportGuard)
  @Delete('delete/:taskId')
  async deleteTask(@Param('taskId') param: { taskId: number })  {
    const task = await this.taskService.findTask(param.taskId);

    if (!task) throw new NotFoundException('Task not found');

    return this.taskService.deleteTask(task);
  }
}
