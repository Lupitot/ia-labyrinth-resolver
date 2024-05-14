import { Component, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { LabyrinthResolver } from './labyrinthResolver';
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
  gridSize: number = 10;

  changeCellValues(index: number, value : number = this.currentValue) {
    this.cells[index] = value;
  }
  
  resetGrid() {
    this.cells = Array(100).fill(0);
  }

  resolveLabyrinth() {
    const path = LabyrinthResolver.resolveLabyrinth(this.cells, this.gridSize)
    path.forEach(cell => {
      this.changeCellValues(cell, 6)
    });
  }
}
