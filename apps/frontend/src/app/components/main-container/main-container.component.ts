import { AuthService } from "../../service/auth/auth.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  authValidate: boolean = false;
  constructor(readonly authService: AuthService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
   this.authService.login().subscribe( auth => {
    this.authValidate = !!auth;
   })
  }
}
