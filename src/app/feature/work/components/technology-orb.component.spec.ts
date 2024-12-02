import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyOrbComponent } from './technology-orb.component';

describe('TechnologyOrbComponent', () => {
  let component: TechnologyOrbComponent;
  let fixture: ComponentFixture<TechnologyOrbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnologyOrbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyOrbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
