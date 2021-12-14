import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressiveComponent } from './in-progressive.component';

describe('InWorkComponent', () => {
  let component: InProgressiveComponent;
  let fixture: ComponentFixture<InProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InProgressiveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
