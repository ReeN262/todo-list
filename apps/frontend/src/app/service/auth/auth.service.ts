import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}/api/user`
  constructor(
    readonly http: HttpClient) {
  }

  login(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/info`)
  }
  logout(): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/delete`);
  }
}
