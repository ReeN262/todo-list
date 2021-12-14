import { Component, ViewChild } from '@angular/core';
import { TodoListService } from '../../../service/todo-list.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  public tasks: string[] = [];
  public dataSource: MatTableDataSource<string>;

  constructor(readonly todoListService: TodoListService) {
    this.dataSource = new MatTableDataSource<string>(this.tasks);
  }
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  displayedColumns: string[] = ['task', 'done', 'remove'];

  ngOnInit(): void {
    this.getUpdate();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getUpdate() {
    this.todoListService.getTask().subscribe((tasks) => {
      this.tasks.push(tasks);
      this.dataSource.data = this.tasks;
      this.table.renderRows();
    });
  }
  deleteTask(taskIndex: number) {
    this.tasks.splice(taskIndex, 1);
    this.dataSource.data = this.tasks;
    this.table.renderRows();
  }

  addInDoneTask(taskIndex: number) {
    this.todoListService.addInDoneTask(this.tasks[taskIndex]);
    this.tasks.splice(taskIndex, 1);
    this.dataSource.data = this.tasks;
    this.table.renderRows();
  }
}
