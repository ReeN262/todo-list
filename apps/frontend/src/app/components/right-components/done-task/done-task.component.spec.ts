import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTaskComponent } from './done-task.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskComponent } from '../../left-components/task/task.component';

describe('DoneTaskComponent', () => {
  let doneComponent: DoneTaskComponent;
  let taskComponent: TaskComponent;
  let doneFixture: ComponentFixture<DoneTaskComponent>;
  let taskFixture: ComponentFixture<TaskComponent>;
  const task = 'task';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatTableModule, MatPaginatorModule],
      declarations: [DoneTaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    doneFixture = TestBed.createComponent(DoneTaskComponent);
    doneComponent = doneFixture.componentInstance;
    doneFixture.detectChanges();

    taskFixture = TestBed.createComponent(TaskComponent);
    taskComponent = taskFixture.componentInstance;
    taskFixture.detectChanges();

    doneComponent.doneTasks = [task];
  });

  it('should cancel task and back in progressive stage', () => {
    doneComponent.cancelDoneTask(0);

    expect(doneComponent.doneTasks).toEqual([]);
    expect(taskComponent.tasks).toEqual([task]);
  });

  it('should remove from done task', () => {
    doneComponent.removeDoneTask(0);
    expect(doneComponent.doneTasks).toEqual([]);
  });

  it('should update done tasks', () => {
    doneComponent.doneTasks = [];
    doneComponent.todoListService.addInDoneTask(task);
    doneComponent.getUpdate();
    expect(doneComponent.doneTasks).toEqual([task]);
  });
});
