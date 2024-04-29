import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSelctorComponent } from './value-selctor.component';

describe('ValueSelctorComponent', () => {
  let component: ValueSelctorComponent;
  let fixture: ComponentFixture<ValueSelctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueSelctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValueSelctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
