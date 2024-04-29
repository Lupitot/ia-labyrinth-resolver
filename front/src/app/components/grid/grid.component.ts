import { Component, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [
    CellComponent,
    NgFor

  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

  @Input() currentValue!: number;
  cells: number[] = Array(100).fill(0);  // Initialise un tableau de 100 cellules avec une valeur de 0

  changeCellValues(index: number) {
    this.cells[index] = this.currentValue;
  }
  
  resetGrid() {
    this.cells = Array(100).fill(0);
  }
  
}
