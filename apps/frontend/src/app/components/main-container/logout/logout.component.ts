import {AuthService} from "../../../service/auth/auth.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe();
    window.location.replace('http://localhost:4200/todo-list');
  }
}
