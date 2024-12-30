import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrimaryWrapperComponent } from './card-primary-wrapper.component';

describe('CardPrimaryWrapperComponent', () => {
  let component: CardPrimaryWrapperComponent;
  let fixture: ComponentFixture<CardPrimaryWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPrimaryWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPrimaryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
