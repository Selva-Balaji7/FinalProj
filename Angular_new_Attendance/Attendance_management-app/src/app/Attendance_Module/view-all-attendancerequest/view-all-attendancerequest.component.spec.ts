import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAttendanceRequestComponent } from './view-all-attendancerequest.component';

describe('AttendanceRequestTeacherComponent', () => {
  let component: ViewAllAttendanceRequestComponent;
  let fixture: ComponentFixture<ViewAllAttendanceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAttendanceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAttendanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});