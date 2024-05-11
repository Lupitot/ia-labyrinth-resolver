import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGridPageComponent } from './all-grid-page.component';

describe('AllGridPageComponent', () => {
  let component: AllGridPageComponent;
  let fixture: ComponentFixture<AllGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGridPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
