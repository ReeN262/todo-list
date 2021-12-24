import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

interface InputData {
  id?: number;
  taskName: string;
  projectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private task$ = new Subject<InputData[]>();

  private doneTask$ = new Subject<InputData[]>();
  private currentProjectId = new Subject<number>();

  public getTask() {
    return this.task$;
  }

  getDoneTask() {
    return this.doneTask$;
  }

  getCurrentProject() {
    return this.currentProjectId;
  }
  public addTask(task: InputData[]) {
    this.task$.next(task);
  }

  public setCurrentProject(id: number) {
    this.currentProjectId.next(id);
  }

  public addInDoneTask(task: InputData[]) {
    this.doneTask$.next(task);
  }

}
