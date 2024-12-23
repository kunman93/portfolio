import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyOrbsComponent } from './technology-orbs.component';

describe('TechnologyOrbsComponent', () => {
  let component: TechnologyOrbsComponent;
  let fixture: ComponentFixture<TechnologyOrbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnologyOrbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyOrbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
