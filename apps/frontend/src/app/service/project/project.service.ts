import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface Projects {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/api/project'
  private httpOptions;
  constructor(readonly http: HttpClient) {
    this.httpOptions = {
      withCredentials: true
    }
}

  newProject(name: string) {
    return this.http.post(`${this.baseUrl}/create`, {
      name: name,
    },
    this.httpOptions);
  }

  getAllProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`${this.baseUrl}/get/all`, this.httpOptions);
  }

  deleteProject(id: number) {
   return this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions)
  }
}
