import { IVector } from "../../interfaces/IVector"
import {IDictionary} from "../../interfaces/IDictionary"

export class LabyrinthResolver {
  
  static resolveLabyrinth(grid :  number[], gridSize : number): number[] {
    let path : number[] = []
    let cellsToExplore: number[] = []
    let came_from: IDictionary<number>[] = []
    let cost: IDictionary<number>[] = []
    let newCost: number = 0
    const entryCell: number = grid.findIndex(cell => cell == 1);
    const finalCell: number = grid.findIndex(cell => cell == 5);
    
    if (this.canMoveRight(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell+1)
      came_from.push({[entryCell+1]:entryCell})
    }
    if (this.canMoveLeft(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell-1)
      came_from.push({[entryCell-1]:entryCell})
    }
    if (this.canMoveUp(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell-gridSize)
      came_from.push({[entryCell-gridSize]:entryCell})
    }
    if (this.canMoveDown(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell+gridSize)
      came_from.push({[entryCell+gridSize]:entryCell})
    }
    cost.push({[entryCell]:1})
    let currentCell = -1;

    while (cellsToExplore.length != 0){
      cellsToExplore.sort((a,b) => cost[cost.findIndex(obj=>obj[came_from[came_from.findIndex(obj => obj[a])][a]])][came_from[came_from.findIndex(obj => obj[a])][a]]-cost[cost.findIndex(obj=>obj[came_from[came_from.findIndex(obj => obj[b])][b]])][came_from[came_from.findIndex(obj => obj[b])][b]] )
      currentCell = cellsToExplore[0];
      if (currentCell == finalCell)
        break;
      cellsToExplore = cellsToExplore.filter(cell => cell !== cellsToExplore[0])
      newCost =  cost[cost.findIndex(obj => obj[came_from[came_from.findIndex(obj => obj[currentCell])][currentCell]])][came_from[came_from.findIndex(obj => obj[currentCell])][currentCell]]+ this.cellCost(grid,currentCell)
      if (cost.findIndex(obj=> obj[currentCell]) != -1 && newCost >= cost[cost.findIndex(obj=> obj[currentCell])][currentCell])
        continue;        
      if (cost.findIndex(obj=> obj[currentCell]) == -1)
        {
          cost.push({[currentCell]:newCost})
        }
      if (cost.findIndex(obj=> obj[currentCell]) != -1 && newCost < cost[cost.findIndex(obj=> obj[currentCell])][currentCell])
         cost[cost.findIndex(obj=> obj[currentCell])][currentCell] = newCost
      if (this.canMoveRight(grid, currentCell, gridSize)) {
        cellsToExplore.push(currentCell+1)
        came_from.push({[currentCell+1]:currentCell})
      }
      if (this.canMoveLeft(grid, currentCell, gridSize)) {
        cellsToExplore.push(currentCell-1)
        came_from.push({[currentCell-1]:currentCell})
      }
      if (this.canMoveUp(grid, currentCell, gridSize)) {
        cellsToExplore.push(currentCell-gridSize)
        came_from.push({[currentCell-gridSize]:currentCell})
      }
      if (this.canMoveDown(grid, currentCell, gridSize)) {
        cellsToExplore.push(currentCell+gridSize)
        came_from.push({[currentCell+gridSize]:currentCell})
      }
    }
    
    let pathCell = finalCell
    while (pathCell != entryCell) {
      pathCell = came_from[came_from.findIndex(obj => obj[pathCell])][pathCell]
      path.push(pathCell)
    }
    path.pop()
    return path
  }

  static cellCost(grid: number[], cell : number) : number {
    switch(grid[cell]) {
      case 2: { 
        return 2
     } 
     case 3: { 
      return 100
   } 
    case 4: { 
      return 1000
  } 
      default: { 
        return 1; 
     } 
    }
  }

  static canMoveRight(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell%gridSize != gridSize-1 && grid[cell+1] != 4) {
      return true;
    }
    return false
  }
  static canMoveLeft(grid: number[], cell : number, gridSize:number) : boolean {
    if ( cell%gridSize != 0 && grid[cell-1] != 4) {
      return true;
    }
    return false
  }
  static canMoveUp(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell >= gridSize && grid[cell-gridSize] != 4) {
      return true;
    }
    return false
  }
  static canMoveDown(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell < gridSize*gridSize-gridSize && grid[cell+gridSize] != 4 ) {
      return true;
    }
    return false
  }

  static cellToCoordinates(cellIndex : number, gridSize : number) : IVector {
    const coordinates : IVector = {
      x: 0,
      y: 0
    }
    coordinates.x = Math.floor(cellIndex/gridSize);
    coordinates.y = cellIndex%gridSize;
    return coordinates
  }

  }

