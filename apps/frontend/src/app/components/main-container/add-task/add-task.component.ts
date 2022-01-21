import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task/task.service";
import { TodoListService } from '../../../service/todo/todo-list.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  public newTask: string | undefined;
  currentProjectId: number;

  constructor(
    readonly taskService: TaskService,
    readonly todoListService: TodoListService) {}

  addTask(): void {
    if (!this.newTask) return;

    this.taskService.addTask({
      taskName: this.newTask,
      projectId: this.currentProjectId,
    }).subscribe(() => {
      this.newTask = '';
      this.updateTableInProgress();
    });
  }

  updateTableInProgress(): void {
    this.taskService.getTasks(this.currentProjectId, false).subscribe(tasks => {
      this.todoListService.addTask(tasks)
    })
  }

  ngOnInit(): void {
    this.todoListService.getCurrentProject().subscribe(project => {
      this.currentProjectId = project;
    })
  }
}
