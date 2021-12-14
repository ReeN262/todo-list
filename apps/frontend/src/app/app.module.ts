import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { InProgressiveComponent } from './components/left-components/in-progressive/in-progressive.component';
import { DoneComponent } from './components/right-components/done/done.component';
import { AddTaskComponent } from './components/main-container/add-task/add-task.component';
import { TaskComponent } from './components/left-components/task/task.component';
import { DoneTaskComponent } from './components/right-components/done-task/done-task.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddProjectComponent } from './components/main-container/add-project/add-project.component';
import { MainContainerComponent } from './components/main-container/main-container.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
