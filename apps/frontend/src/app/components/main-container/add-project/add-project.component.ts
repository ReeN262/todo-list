import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task/task.service";
import {MatDialog} from "@angular/material/dialog";
import {ProjectCreateDialogComponent} from "../project-create-dialog/project-create-dialog.component";
import {ProjectService} from "../../../service/project/project.service";
import {TodoListService} from "../../../service/todo/todo-list.service";
import {AuthService} from "../../../service/auth/auth.service";

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

interface Projects {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements  OnInit {
  @Input() currentProjectId = 0;
  name: string;
  projects: Projects[] = [];
  user: User;

  constructor(
    public dialog: MatDialog,
    readonly projectService: ProjectService,
    readonly todoListService: TodoListService,
    readonly taskService: TaskService,
    readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.userData();
    this.updateProjectList();
    this.updateInProgressTaskAndDoneTaskTable();
    }

   updateProjectList() {
    this.projectService.getAllProjects().subscribe( projects => {
       this.projects = projects;
     });
   }

    openDialogProjectCreate(): void {
    const dialogRef = this.dialog.open(ProjectCreateDialogComponent, {
      width: '250px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.newProject(result).subscribe(() => {
          this.updateProjectList();
        })
      }
    });
  }

  userData(): void {
    this.authService.login().subscribe((data: User) => {
      this.user = data;
    });
  }

  deleteCurrentProject(): void {
    this.projectService.deleteProject(this.currentProjectId).subscribe(() => {
      this.currentProjectId = 0;
      this.updateProjectList();
      this.updateInProgressTaskAndDoneTaskTable();
      this.todoListService.setCurrentProject(this.currentProjectId);
    });
  }

  updateInProgressTaskAndDoneTaskTable(): void {
    if (this.currentProjectId > 0) {
      this.taskService.getTasks(this.currentProjectId, false).subscribe( tasks => {
        this.todoListService.addTask(tasks);
      })
      this.taskService.getTasks(this.currentProjectId, true).subscribe(doneTask => {
        this.todoListService.addInDoneTask(doneTask);
      })
    } else {
      this.todoListService.addTask([]);
      this.todoListService.addInDoneTask([]);
    }
  }

  changeProject(projectName: string): void {
    this.currentProjectId = this.projects.reduce((_acc, project: Projects) => {
      if (project.name === projectName) {
         _acc = project.id;
      }
      return _acc;
    }, 0 as number)

    this.updateInProgressTaskAndDoneTaskTable()
    this.todoListService.setCurrentProject(this.currentProjectId)
  }
}
