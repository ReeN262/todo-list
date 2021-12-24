import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProjectCreateDialogComponent} from "../project-create-dialog/project-create-dialog.component";
import {TodoListService} from "../../../service/todo/todo-list.service";
import {UserService} from "../../../service/user/user.service";
import {ProjectService} from "../../../service/project/project.service";
import {InProgressService} from "../../../service/InProgress/inProgress.service";
import {DoneTaskService} from "../../../service/doneTask/done-task.service";

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
  projects: Array<Projects> = []
  user: User;

  constructor(
    public dialog: MatDialog,
    readonly userService: UserService,
    readonly projectService: ProjectService,
    readonly todoListService: TodoListService,
    readonly inProgressService: InProgressService,
    readonly doneTaskService: DoneTaskService) {
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

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.projectService.newProject(result).subscribe(() => {
          this.updateProjectList();
        })
      }
    });

  }

  userData() {
    this.userService.getUserData().subscribe(data => {
      this.user = data
    });
  }

  async deleteCurrentProject() {
    this.projectService.deleteProject(this.currentProjectId).subscribe(() => {
      this.currentProjectId = 0;
      setTimeout(() => this.updateProjectList(), 100);
      this.updateInProgressTaskAndDoneTaskTable();
      this.todoListService.setCurrentProject(this.currentProjectId);
    });
  }

  updateInProgressTaskAndDoneTaskTable() {
    if (this.currentProjectId > 0) {
      this.inProgressService.getAllInProgressTask(this.currentProjectId).subscribe(async tasks => {
        this.todoListService.addTask(tasks)
      })
      this.doneTaskService.getAllDoneTask(this.currentProjectId).subscribe(doneTask => {

        this.todoListService.addInDoneTask(doneTask);
      })
    } else {
      this.todoListService.addTask([]);
      this.todoListService.addInDoneTask([]);
    }
  }

  changeProject(projectName: string) {
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
