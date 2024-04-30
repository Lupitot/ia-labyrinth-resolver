import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css',
})
export class CellComponent {
  @Input() value!: number;

  currentValue: number = 0;

  changeValue() {
    this.currentValue = (this.currentValue + 1) % 6;
  }
}
