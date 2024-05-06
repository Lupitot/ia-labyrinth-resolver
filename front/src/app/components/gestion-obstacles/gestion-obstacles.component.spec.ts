import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionObstaclesComponent } from './gestion-obstacles.component';

describe('GestionObstaclesComponent', () => {
  let component: GestionObstaclesComponent;
  let fixture: ComponentFixture<GestionObstaclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionObstaclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
