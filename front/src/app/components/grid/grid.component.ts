import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGridServiceService } from '../../services/grid/createGrid/create-grid-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  @Input() currentValue!: number; //verifié si c'est utile
  cells: number[][] = []; //initialiser un tableau vide
  name!: string;
  constructor(private createGridService: CreateGridServiceService) {
    this.generateGrid();
  }

  generateGrid() {
    for (let i = 0; i < 10; i++) {
      //generer les 10 colones du tableau
      this.cells[i] = [];
      for (let j = 0; j < 10; j++) {
        //initialiser les cell des colone du tableau a 0
        this.cells[i][j] = 0;
      }
    }
  }

  changeCellValues(rowIndex: number, colIndex: number) {
    this.cells[rowIndex][colIndex] = this.currentValue; //changer la valeur de la cell
    console.log(this.cells);
  }

  changeBackground(rowIndex: number, colIndex: number) {
    switch (
      this.cells[rowIndex][colIndex] //changer la couleur de la cell
    ) {
      case 0:
        return 'white'; //vide
      case 1:
        return 'blue'; // obstacle/ralentisseur
      case 2:
        return 'green'; //point d'arrivée
      case 3:
        return 'yellow'; //point de départ
      case 4:
        return 'red'; //piege, fin de jeu
      case 5:
        return 'black'; //mur
      default:
        return 'white';
    }
  }

  submitForm() {
    console.log(localStorage.getItem('token'));
    const grid = {
      name: this.name,
      creator: localStorage.getItem('name'),
      composition: this.cells,
    };
    console.log("grid dans submitForm",grid);
    this.createGrid(grid);
  }

  createGrid(grid: any) {
    const token = localStorage.getItem('token');
    console.log("grid dans creatGrid",grid)
    if (!token) {
      throw new Error('Token not found');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    console.log("la grid avant la requette", grid)
    this.createGridService.createGrid(grid, httpOptions).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  resetGrid() {
    this.generateGrid();
  }
}
