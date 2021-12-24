import {Injectable} from '@angular/core';

import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    readonly http: HttpClient,
    readonly cookieService: CookieService) {
  }

  login() {
    return this.cookieService.check('connect.sid');
  }
  logout() {
    this.http.get('http://localhost:3000/api/user/delete', {
      withCredentials: true
    }).subscribe(del => del);
  }
}
