import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private task$ = new Subject<string>();

  private doneTask$ = new Subject<string>();

  public getTask() {
    return this.task$;
  }

  getDoneTask() {
    return this.doneTask$;
  }

  public addTask(task: string) {
    this.task$.next(task);
  }

  public addInDoneTask(task: string) {
    return this.doneTask$.next(task);
  }
}
