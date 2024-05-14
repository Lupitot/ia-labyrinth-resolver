import { Component, Input, SimpleChange} from '@angular/core';

@Component({
  selector: 'cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})

export class CellComponent {

  @Input() value!: number;

  currentValue!: number;

  changeValue() {
    this.currentValue = this.value;
    console.log('changeValue', this.currentValue);
  }

  changeBackground(index: number) {
    if(index === 1) {
      return 'blue';
    } else if(index === 2) {
      return 'green';
    } else if(index === 3){
      return 'red';
    } else if(index === 4){
      return 'yellow';
    } else if(index === 5){
      return 'purple';
    } else if(index === 6) {
      return 'lime';
    } else {
      return 'white';
    }
  }

}