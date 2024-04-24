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
}
