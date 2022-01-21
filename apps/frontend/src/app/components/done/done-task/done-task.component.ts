import { Component, OnInit, ViewChild } from '@angular/core';
import {TaskService} from "../../../service/task/task.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TodoListService } from '../../../service/todo/todo-list.service';

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
              readonly taskService: TaskService) {
    this.dataSource = new MatTableDataSource<DoneTask>(this.doneTasks);
  }
  displayedColumns: string[] = ['doneTask', 'cancel-button', 'remove-button'];

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
    this.taskService.delete(this.doneTasks[doneTaskIndex].id as number).subscribe(() => {
      this.doneTasks.splice(doneTaskIndex, 1);
      this.dataSource.data = this.doneTasks;
      this.table.renderRows();
    })
  }

  cancelDoneTask(doneTaskIndex: number) {
   this.taskService.updateTask(this.doneTasks[doneTaskIndex].id as number, false).subscribe(() => {
     this.doneTasks.splice(doneTaskIndex, 1);
     this.dataSource.data = this.doneTasks;
     this.table.renderRows();
     this.updateInProgressTable();
   });
  }
  updateInProgressTable() {
    this.taskService.getTasks(this.currentProjectId, false).subscribe( tasks => {
      this.todoListService.addTask(tasks)
    })
  }

}
