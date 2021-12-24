import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(readonly http: HttpClient) { }

  getUserData() {
    return this.http.get<User>('http://localhost:3000/api/user/info', {
      withCredentials: true
    })
  }
}
