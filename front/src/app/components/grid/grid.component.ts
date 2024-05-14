import { Component, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { LabyrinthResolver } from './labyrinthResolver';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGridServiceService } from '../../services/grid/createGrid/create-grid-service.service';
import { HttpHeaders } from '@angular/common/http';
import { ConnectService } from '../../services/connectGridToSelector/connect.service';
import { GetObstaclesServiceService } from '../../services/obstacle/getObstacle/get-obstacles-service.service';
import { ConnectAllGridToGridService } from '../../services/connectAllGridToGrid/connect-all-grid-to-grid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [
    NgFor, 
    FormsModule
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  @Input() currentValue!: number;
  gridSize: number = 10;

  //initialiser un tableau vide
  cells: number[][] = [];
  cellColors: string[][] = [];
  name!: string;

  listeObstacles: any;

  constructor(
    private createGridService: CreateGridServiceService,
    private connectService: ConnectService,
    private allObstacleService: GetObstaclesServiceService,
    private connectAllGridToGridService: ConnectAllGridToGridService,
    private router: Router
  ) {
    this.generateGrid();
    this.loadObstacles();
  }


  generateGrid() {
    for (let i = 0; i < 10; i++) {
      //generer les 10 colones du tableau
      this.cells[i] = [];
      this.cellColors[i] = [];
      for (let j = 0; j < 10; j++) {
        //initialiser les cell des colone du tableau a 0 et la couleur de base
        this.cells[i][j] = 0;
        this.cellColors[i][j] = '#f5f5f5';
      }
    }
  }

  changeCellValues(rowIndex: number, colIndex: number) {
    const max = this.connectService.getMax(); //récupérer la valeur max de la cellule
    const appearance = this.connectService.getColor(); //récupérer la couleur de la cellule

    // compte combien de fois this.currentValue apparaît dans la grille
    let count = 0;
    for (let i in this.cells) {
      for (let j in this.cells[i]) {
        if (this.cells[i][j] === this.currentValue) {
          count++;
        }
      }
    }

    // si this.currentValue est déjà dans la grille et est supérieur ou égal à max alors supprime la cellule
    if (this.currentValue === this.cells[rowIndex][colIndex] && count >= max) {
      this.cells[rowIndex][colIndex] = 0;
      this.cellColors[rowIndex][colIndex] = '#f5f5f5';
    } else if (count >= max) {
      alert(
        'Vous ne pouvez pas ajouter cette valeur car le maximum a déjà été atteint'
      );
    }
    // sinon mettre a jour la cellule avec this.currentValue
    else if (count < max) {
      this.cells[rowIndex][colIndex] = this.currentValue; //mettre la valeur de la cellule
      this.cellColors[rowIndex][colIndex] = appearance; //mettre la couleur de la cellule
    }
  }

  async submitForm() {
    console.log(localStorage.getItem('token'));
    const grid = {
      name: this.name,
      creator: localStorage.getItem('name'),
      composition: this.cells,
    };
    console.log('grid dans submitForm', grid);
    if (this.validateGrid(grid)) {
      this.createGrid(grid);
      this.router.navigate(['/all-grid']);
    } else {
      console.log('Invalid grid');
    }
  }

  createGrid(grid: any) {
    const token = localStorage.getItem('token');
    console.log('grid dans creatGrid', grid);
    if (!token) {
      throw new Error('Token not found');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    console.log('la grid avant la requette', grid);
    this.createGridService.createGrid(grid, httpOptions).subscribe(
      //envoyer la requette de création de la grille
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadObstacles() {
    this.allObstacleService.getAllObstacle().subscribe((obstacles) => {
      this.listeObstacles = obstacles;
      console.log(this.listeObstacles);
      this.initializeGrid();
    });
  }

  initializeGrid() {
    let importGrid = this.connectAllGridToGridService.getImportGrid(); //récupérer la grille importer
    if (importGrid) {
      console.log('importGrid', importGrid);
      this.cells = importGrid; //definir la grille vide avec la grille importer

      for (let i in this.cells) {
        for (let j in this.cells[i]) {
          for (let k in this.listeObstacles) {
            if (parseInt(k) === this.cells[i][j]) { //si la cellule est un obstacle
              this.cellColors[i][j] = this.listeObstacles[k].appearance; //mettre la couleur de l'obstacle
            }
          }
        }
      }
    }
  }
  validateGrid(grid: any) {
    const obstacles = this.listeObstacles;
    let valueReturn = true;
    for (let k in obstacles) { //pour chaque obstacle
      let minObstacle = obstacles[k].min; //récupérer le nombre minimum d'obstacle
      let obstacleCount = 0; 
      for (let i = 0; i < grid.composition.length; i++) { 
        for (let j = 0; j < grid.composition[i].length; j++) {
          if (parseInt(grid.composition[i][j]) === parseInt(k)) { //si la cellule est un obstacle
            obstacleCount++;  //incrémenter le nombre d'obstacle
          }
        }
      }

      if (obstacleCount < minObstacle) { //si le nombre d'obstacle est inférieur au nombre minimum d'obstacle
        alert(
          "L'obstacle " + obstacles[k].name + " n'apparaît pas assez de fois"
        );
        valueReturn = false;
        break;
      }
    }
    return valueReturn;
  }

  convertGridtoNumberTab(grid : any) : number[] {
    let gridFinal : number[] = []
    const obstacles = this.listeObstacles;
    let valueReturn = true;
    for (let k in obstacles) {
      let minObstacle = obstacles[k].min; 
      let obstacleCount = 0; 
      for (let i = 0; i < grid.composition.length; i++) { 
        for (let j = 0; j < grid.composition[i].length; j++) {
          if (parseInt(grid.composition[i][j]) === parseInt(k)) { 
            gridFinal.push(parseInt(k)) 
          }
        }
      }
    }
  return gridFinal
}

  resetGrid() {
    this.generateGrid();
  }

  resolveLabyrinth() {
    const path = LabyrinthResolver.resolveLabyrinth(this.convertGridtoNumberTab(this.cells), this.gridSize)
    path.forEach(cell => {
      this.changeCellValues(cell, 6)
    });
  }
}
