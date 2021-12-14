import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TodoListService } from '../../../service/todo-list.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public doneTasks: string[] = [];

  public dataSource: MatTableDataSource<string>;
  constructor(readonly todoListService: TodoListService) {
    this.dataSource = new MatTableDataSource<string>(this.doneTasks);
  }
  displayedColumns: string[] = ['doneTask', 'cancel', 'remove'];

  ngOnInit(): void {
    this.getUpdate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUpdate() {
    this.todoListService.getDoneTask().subscribe((tasks) => {
      this.doneTasks.push(tasks);
      this.dataSource.data = this.doneTasks;
      this.table.renderRows();
    });
  }

  removeDoneTask(doneTaskIndex: number) {
    this.doneTasks.splice(doneTaskIndex, 1);
    this.dataSource.data = this.doneTasks;
    this.table.renderRows();
  }

  cancelDoneTask(doneTaskIndex: number) {
    this.todoListService.addTask(this.doneTasks[doneTaskIndex]);
    this.doneTasks.splice(doneTaskIndex, 1);
    this.dataSource.data = this.doneTasks;
    this.table.renderRows();
  }
}
