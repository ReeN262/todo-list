import { Component } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent  {

  constructor(
  readonly authService: AuthService) {
  }
  async signIn() {
    window.location.replace(`http://localhost:3000/api/auth/google`);
  }
}
