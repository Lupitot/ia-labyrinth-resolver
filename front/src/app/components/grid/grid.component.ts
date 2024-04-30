import { Component, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [CellComponent, NgFor],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {


  @Input() currentValue!: number;
  cells: number[][] = []; //initialiser un tableau vide

  constructor() {
    this.generateGrid();
  }

  generateGrid() {
    for (let i = 0; i < 10; i++) { //generer les 10 colones du tableau
      this.cells[i] = []; 
      for (let j = 0; j < 10; j++) { //initialiser les cell des colone du tableau a 0
        this.cells[i][j] = 0;
      }
    }
  }

  changeCellValues(rowIndex: number, colIndex: number) {
    this.cells[rowIndex][colIndex] = this.currentValue; //changer la valeur de la cell
    console.log(this.cells);
  }

  changeBackground(rowIndex: number, colIndex: number) {
    switch (this.cells[rowIndex][colIndex]) { //changer la couleur de la cell
      case 0: return 'white';
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'yellow';
      case 4: return 'red';
      case 5: return 'black';
      default: return 'white';
    }
  }

  
  resetGrid() {
    this.generateGrid();
  }
}
