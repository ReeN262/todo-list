import {AuthService} from "../../../service/auth/auth.service";
import { Component, OnInit } from '@angular/core';
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
    this.authService.logout().subscribe();
    window.location.replace('http://localhost:4200/todo-list');
  }
}
