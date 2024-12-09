import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetEarthComponent } from './planet-earth.component';

describe('PlanetEarthComponent', () => {
  let component: PlanetEarthComponent;
  let fixture: ComponentFixture<PlanetEarthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetEarthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetEarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
