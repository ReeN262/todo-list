import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTaskComponent } from '../../done/done-task/done-task.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let taskFixture: ComponentFixture<TaskComponent>;
  let doneFixture: ComponentFixture<DoneTaskComponent>;
  let doneTaskComponent: DoneTaskComponent;
  const task = 'task';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatTableModule, MatPaginatorModule],
      declarations: [TaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    taskFixture = TestBed.createComponent(TaskComponent);
    component = taskFixture.componentInstance;
    taskFixture.detectChanges();

    doneFixture = TestBed.createComponent(DoneTaskComponent);
    doneTaskComponent = doneFixture.componentInstance;
    doneFixture.detectChanges();

    component.tasks = [task];
  });

  it('should adding task in done stage', () => {
    component.addInDoneTask(0);
    expect(component.tasks).toEqual([]);
    expect(doneTaskComponent.doneTasks).toEqual([task]);
  });

  it('should remove from done task', () => {
    component.deleteTask(0);
    expect(component.tasks).toEqual([]);
  });

  it('should update done tasks', () => {
    component.tasks = [];
    component.todoListService.addTask(task);
    component.getUpdate();
    expect(component.tasks).toEqual([task]);
  });
});
