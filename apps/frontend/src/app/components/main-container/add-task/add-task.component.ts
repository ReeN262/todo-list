import { Component } from '@angular/core';
import { TodoListService } from '../../../service/todo-list.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  public newTask: string | undefined;

  constructor(readonly todoListService: TodoListService) {}

  addTask() {
    if (!this.newTask) return;

    this.todoListService.addTask(this.newTask);
    this.newTask = '';
  }
}
