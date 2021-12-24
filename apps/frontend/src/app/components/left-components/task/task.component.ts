import { Component, ViewChild } from '@angular/core';
import { TodoListService } from '../../../service/todo/todo-list.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {InProgressService} from "../../../service/InProgress/inProgress.service";
import {DoneTaskService} from "../../../service/doneTask/done-task.service";

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
    readonly inProgressService: InProgressService,
    readonly todoListService: TodoListService,
    readonly doneTaskService: DoneTaskService) {
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
    this.inProgressService.deleteInProgressTask(this.tasks[arrTaskIndex].projectId).subscribe(() => {
      this.tasks.splice(arrTaskIndex, 1);
      this.dataSource.data = this.tasks;
      this.table.renderRows();
    })
  }
  getCurrentProject() {
    this.todoListService.getCurrentProject().subscribe(project => this.currentProjectId = project);
  }
  addInDoneTask(arrTaskIndex: number) {
    this.doneTaskService.addTaskInDone(this.tasks[arrTaskIndex].id).subscribe(() => {
      this.tasks.splice(arrTaskIndex, 1);
      this.dataSource.data = this.tasks;
      this.table.renderRows();
      setTimeout(() =>  this.updateDoneTaskTable(), 100);
    })
  }
  updateDoneTaskTable() {
    this.doneTaskService.getAllDoneTask(this.currentProjectId).subscribe(doneTask => {
      this.todoListService.addInDoneTask(doneTask);
    })
  }
}
