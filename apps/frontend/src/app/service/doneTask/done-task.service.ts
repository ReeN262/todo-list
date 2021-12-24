import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface DoneTask {
  taskName: string;
  projectId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoneTaskService {
  private baseUrl = 'http://localhost:3000/api/done-task'
  private httpOptions;
  constructor(readonly http: HttpClient) {
    this.httpOptions = {
      withCredentials: true
    }
  }

  addTaskInDone(progressTaskId: number | undefined) {
    return this.http.post(`${this.baseUrl}/add`, {
        progressTaskId: progressTaskId,
      },
    this.httpOptions);
  }

  getAllDoneTask(projectId: number): Observable<DoneTask[]> {
    return this.http.get<DoneTask[]>(`${this.baseUrl}/get/all/${projectId}`, this.httpOptions);
  }

  deleteDoneTask(id: number) {
   return  this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions);
  }

  backInProgress(doneTaskId: number | undefined) {
    return this.http.put(`${this.baseUrl}/backInProgress/${doneTaskId}`, {}, this.httpOptions);
  }
}
