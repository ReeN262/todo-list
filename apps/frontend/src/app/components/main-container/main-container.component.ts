import { Component, OnInit } from '@angular/core';
import {TodoListService} from "../../service/todo/todo-list.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  constructor(
    readonly authService: AuthService,
    readonly todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  checkLogin() {
   return this.authService.login()
  }
}
