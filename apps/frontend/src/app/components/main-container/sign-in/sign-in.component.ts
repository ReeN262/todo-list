import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent  {
  constructor() {}

  async signIn() {
    window.location.replace(`${environment.baseUrl}/api/auth/google`);
  }
}
