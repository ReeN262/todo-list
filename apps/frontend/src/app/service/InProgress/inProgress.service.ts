import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface InProgress {
  id?: number;
  taskName: string;
  projectId: number;
}

@Injectable({
  providedIn: 'root'
})
export class InProgressService {
  private baseUrl = 'http://localhost:3000/api/in-progress-task'
  private httpOptions;
  constructor(readonly http: HttpClient) {
    this.httpOptions = {
      withCredentials: true
    }
  }

  addTaskInProgress(data: InProgress) {
   return this.http.post(`${this.baseUrl}/add`, {
        taskName: data.taskName,
        project: data.projectId,
      },
    this.httpOptions);
  }

  getAllInProgressTask(projectId: number): Observable<InProgress[]> {
    return this.http.get<InProgress[]>(`${this.baseUrl}/get/all/${projectId}`, this.httpOptions);
  }

  deleteInProgressTask(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions);
  }
}
