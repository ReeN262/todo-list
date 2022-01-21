import { Component, ViewChild } from '@angular/core';
import { TaskService } from "../../../service/task/task.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TodoListService } from '../../../service/todo/todo-list.service';

interface InProgress {
  id?: number;
  taskName: string;
  projectId: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  public tasks: InProgress[] = [];
  public dataSource: MatTableDataSource<InProgress>;
  private currentProjectId: number;

  constructor(
    readonly taskService: TaskService,
    readonly todoListService: TodoListService) {
    this.dataSource = new MatTableDataSource<InProgress>(this.tasks);
  }
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  displayedColumns: string[] = ['task', 'done', 'remove'];

  ngOnInit(): void {
    this.getUpdate();
    this.getCurrentProject();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getUpdate() {
    this.todoListService.getTask().subscribe((tasks) => {
      this.tasks = tasks;
      this.dataSource.data = this.tasks;
      this.table.renderRows();
    });
  }
  deleteTask(arrTaskIndex: number) {
    this.taskService.delete(this.tasks[arrTaskIndex].projectId).subscribe(() => {
      this.tasks.splice(arrTaskIndex, 1);
      this.dataSource.data = this.tasks;
      this.table.renderRows();
    })
  }
  getCurrentProject() {
    this.todoListService.getCurrentProject().subscribe(project => this.currentProjectId = project);
  }
  addInDoneTask(arrTaskIndex: number) {
    this.taskService.updateTask(this.tasks[arrTaskIndex].id as number, true).subscribe(() => {
      this.tasks.splice(arrTaskIndex, 1);
      this.dataSource.data = this.tasks;
      this.table.renderRows();
      this.updateDoneTaskTable();
    })
  }
  updateDoneTaskTable() {
    this.taskService.getTasks(this.currentProjectId, true).subscribe(doneTask => {
      this.todoListService.addInDoneTask(doneTask);
    })
  }
}
