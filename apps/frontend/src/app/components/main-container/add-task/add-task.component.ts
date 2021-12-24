import {Component, OnInit} from '@angular/core';
import { TodoListService } from '../../../service/todo/todo-list.service';
import {InProgressService} from "../../../service/InProgress/inProgress.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  public newTask: string | undefined;
  currentProjectId: number;

  constructor(
    readonly inProgressService: InProgressService,
    readonly todoListService: TodoListService) {}

  addTask() {
    if (!this.newTask) return;
    this.inProgressService.addTaskInProgress({
      taskName: this.newTask,
      projectId: this.currentProjectId,
    }).subscribe(() => {
      this.newTask = '';
      this.updateTableInProgress();
    });
  }

  updateTableInProgress() {
    this.inProgressService.getAllInProgressTask(this.currentProjectId).subscribe(tasks => {
      this.todoListService.addTask(tasks)
    })
  }



  ngOnInit(): void {
    this.todoListService.getCurrentProject().subscribe(project => {
      this.currentProjectId = project;
    })
  }
}
