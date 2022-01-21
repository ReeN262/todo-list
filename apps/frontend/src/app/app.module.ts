import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import {NgModule, Provider} from '@angular/core';

import { AddProjectComponent } from './components/main-container/add-project/add-project.component';
import { AddTaskComponent } from './components/main-container/add-task/add-task.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoneComponent } from './components/done/done.component';
import { DoneTaskComponent } from './components/done/done-task/done-task.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { InProgressiveComponent } from './components/InProgress/in-progressive.component';
import { LogoutComponent } from './components/main-container/logout/logout.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProjectCreateDialogComponent } from './components/main-container/project-create-dialog/project-create-dialog.component';
import { SignInComponent } from './components/main-container/sign-in/sign-in.component';
import { TaskComponent } from './components/InProgress/task/task.component';
import {AuthInterceptor} from "./auth.interceptor";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}

@NgModule({
  declarations: [
    AppComponent,
    InProgressiveComponent,
    DoneComponent,
    AddTaskComponent,
    TaskComponent,
    DoneTaskComponent,
    AddProjectComponent,
    MainContainerComponent,
    ProjectCreateDialogComponent,
    LogoutComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
