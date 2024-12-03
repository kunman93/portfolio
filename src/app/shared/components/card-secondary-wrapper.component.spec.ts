import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSecondaryWrapperComponent } from './card-secondary-wrapper.component';

describe('CardSecondaryWrapperComponent', () => {
  let component: CardSecondaryWrapperComponent;
  let fixture: ComponentFixture<CardSecondaryWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSecondaryWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSecondaryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
