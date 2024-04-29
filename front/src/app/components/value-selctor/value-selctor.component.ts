import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'value-selctor',
  standalone: true,
  imports: [],
  templateUrl: './value-selctor.component.html',
  styleUrl: './value-selctor.component.css'
})
export class ValueSelctorComponent {

  @Output() selelctedValue = new EventEmitter<number>();


  currentValue = 0;


  selectValue(value: number) {
    console.log(value)
    this.currentValue = value;
    
    if (this.currentValue != null && this.currentValue >= 0) {
      console.log('currentValueAVANTEMIT', this.currentValue);
      this.selelctedValue.emit(this.currentValue);
      console.log('currentValueAPRESEMIT', this.currentValue);
    }
  }

}
