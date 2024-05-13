import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstaclesPageComponent } from './obstacles-page.component';

describe('ObstaclesPageComponent', () => {
  let component: ObstaclesPageComponent;
  let fixture: ComponentFixture<ObstaclesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObstaclesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObstaclesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
