import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicHistoryComponent } from './academic-history.component';

describe('AcademicHistoryComponent', () => {
  let component: AcademicHistoryComponent;
  let fixture: ComponentFixture<AcademicHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
