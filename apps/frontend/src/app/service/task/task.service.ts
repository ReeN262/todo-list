import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'

interface Task {
  id?: number;
  taskName: string;
  projectId: number;
  isDone?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = `${environment.baseUrl}/api/task`;

  constructor(readonly http: HttpClient) {}

  addTask(data: Task) {
   return this.http.post<Task>(`${this.baseUrl}/add`, {
        taskName: data.taskName,
        project: data.projectId,
   });
  }

  getTasks(projectId: number, isDone: boolean): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/get/all/${projectId}/${isDone}`);
  }

  updateTask(taskId: number, isDone: boolean): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/update`, {
      taskId,
      isDone,
    })
  }


  delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/delete/${id}`);
  }
}
