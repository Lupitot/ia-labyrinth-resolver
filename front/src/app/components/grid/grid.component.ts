import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGridServiceService } from '../../services/grid/createGrid/create-grid-service.service';
import { HttpHeaders } from '@angular/common/http';
import { ConnectService } from '../../services/connectGridToSelector/connect.service';
import { GetObstaclesServiceService } from '../../services/obstacle/getObstacle/get-obstacles-service.service';
import { SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ConnectAllGridToGridService } from '../../services/connectAllGridToGrid/connect-all-grid-to-grid.service';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  @Input() currentValue!: number;

  //initialiser un tableau vide
  cells: number[][] = [];
  cellColors: string[][] = [];
  name!: string;

  listeObstacles: any;

  constructor(
    private createGridService: CreateGridServiceService,
    private connectService: ConnectService,
    private allObstacleService: GetObstaclesServiceService,
    private connectAllGridToGridService: ConnectAllGridToGridService
  ) {
    this.generateGrid();
    this.loadObstacles();
  }

  // ngOnInit() {
  //   let importGrid = this.connectAllGridToGridService.getImportGrid();
  //   if (importGrid) {
  //     console.log('importGrid', importGrid);
  //     this.cells = importGrid;

  //     for (let i in this.cells) {
  //       for (let j in this.cells[i]) {
  //         for (let k in this.listeObstacles) {
  //           console.log("je passe ici")
  //           console.log("listeObstacles[k]", this.listeObstacles[k])
  //           console.log('k', k);
  //           if (parseInt(k) === this.cells[i][j]) {
  //             console.log('this.cells[i][j]', this.cells[i][j]);
  //             console.log('this.listeObstacles[k]', this.listeObstacles[k]);
  //             this.cellColors[i][j] = this.listeObstacles[k].appearance;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

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
    let importGrid = this.connectAllGridToGridService.getImportGrid();
    if (importGrid) {
      console.log('importGrid', importGrid);
      this.cells = importGrid;

      for (let i in this.cells) {
        for (let j in this.cells[i]) {
          for (let k in this.listeObstacles) {
            console.log("je passe ici")
            console.log("listeObstacles[k]", this.listeObstacles[k])
            console.log('k', k);
            if (parseInt(k) === this.cells[i][j]) {
              console.log('this.cells[i][j]', this.cells[i][j]);
              console.log('this.listeObstacles[k]', this.listeObstacles[k]);
              this.cellColors[i][j] = this.listeObstacles[k].appearance;
            }
          }
        }
      }
    }
  }
  validateGrid(grid: any) {
    const obstacles = this.listeObstacles;
    let valueReturn = true;
    for (let k in obstacles) {
      let minObstacle = obstacles[k].min;
      let obstacleCount = 0;
      for (let i = 0; i < grid.composition.length; i++) {
        for (let j = 0; j < grid.composition[i].length; j++) {
          if (parseInt(grid.composition[i][j]) === parseInt(k)) {
            obstacleCount++;
          }
        }
      }

      if (obstacleCount < minObstacle) {
        alert(
          "L'obstacle " + obstacles[k].name + " n'apparaît pas assez de fois"
        );
        valueReturn = false;
        break;
      }
    }
    return valueReturn;
  }

  resetGrid() {
    this.generateGrid();
  }
}
