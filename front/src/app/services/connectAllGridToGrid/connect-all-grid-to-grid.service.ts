import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectAllGridToGridService {
  private importGrid!: number[][];

  setImportGrid(importGrid: number[][]) {
    this.importGrid = importGrid;
  }

  getImportGrid() {
    return this.importGrid;
  }
}
