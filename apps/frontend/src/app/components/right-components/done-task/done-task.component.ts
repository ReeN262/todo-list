import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TodoListService } from '../../../service/todo/todo-list.service';
import {DoneTaskService} from "../../../service/doneTask/done-task.service";
import {InProgressService} from "../../../service/InProgress/inProgress.service";

interface DoneTask {
  id?: number;
  taskName: string;
  projectId: number;
}

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public doneTasks: DoneTask[] = [];

  public dataSource: MatTableDataSource<DoneTask>;
  private currentProjectId: number;
  constructor(readonly todoListService: TodoListService,
              readonly doneTaskService: DoneTaskService,
              readonly inProgressService: InProgressService) {
    this.dataSource = new MatTableDataSource<DoneTask>(this.doneTasks);
  }
  displayedColumns: string[] = ['doneTask', 'cancel', 'remove'];

  ngOnInit(): void {
    this.getUpdate();
    this.getCurrentProject();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getCurrentProject() {
    this.todoListService.getCurrentProject().subscribe(project => {
      this.currentProjectId = project
    });

  }
  getUpdate() {
    this.todoListService.getDoneTask().subscribe((tasks) => {
      this.doneTasks = tasks;
      this.dataSource.data = this.doneTasks;
      this.table.renderRows();
    });
  }

  removeDoneTask(doneTaskIndex: number) {
    this.doneTaskService.deleteDoneTask(this.doneTasks[doneTaskIndex].projectId).subscribe(() => {
      this.doneTasks.splice(doneTaskIndex, 1);
      this.dataSource.data = this.doneTasks;
      this.table.renderRows();
    })
  }

  cancelDoneTask(doneTaskIndex: number) {
   this.doneTaskService.backInProgress(this.doneTasks[doneTaskIndex].id).subscribe(() => {
     this.doneTasks.splice(doneTaskIndex, 1);
     this.dataSource.data = this.doneTasks;
     this.table.renderRows();
     setTimeout(() => this.updateInProgressTable(), 100);
   });
  }
  updateInProgressTable() {
    this.inProgressService.getAllInProgressTask(this.currentProjectId).subscribe( tasks => {
      this.todoListService.addTask(tasks)
    })
  }

}
