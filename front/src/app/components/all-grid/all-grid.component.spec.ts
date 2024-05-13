import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGridComponent } from './all-grid.component';

describe('AllGridComponent', () => {
  let component: AllGridComponent;
  let fixture: ComponentFixture<AllGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
