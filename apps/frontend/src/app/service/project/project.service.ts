import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

interface Projects {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = `${environment.baseUrl}/api/project`;
  constructor(readonly http: HttpClient) {}

  newProject(name: string): Observable<Projects> {
    return this.http.post<Projects>(`${this.baseUrl}/create`, { name })
  }

  getAllProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`${this.baseUrl}/get/all`);
  }

  deleteProject(id: number): Observable<Projects> {
    return this.http.delete<Projects>(`${this.baseUrl}/delete/${id}`);
  }
}
