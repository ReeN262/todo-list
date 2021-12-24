import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {TodoListService} from "../../../service/todo/todo-list.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    readonly todoListService: TodoListService,
    readonly authService: AuthService) { }

  ngOnInit(): void {
  }
  updateInProgressTaskTable() {
    this.todoListService.addTask([])
  }

  updateDoneTaskTable() {
    this.todoListService.addInDoneTask([]);
  }


  logout() {
    this.authService.logout();
    this.updateInProgressTaskTable();
    this.updateDoneTaskTable();
  }
}
