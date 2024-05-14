import { IVector } from "../../interfaces/IVector"
import {IDictionary} from "../../interfaces/IDictionary"

export class LabyrinthResolver {
  
  static resolveLabyrinth(grid :  number[], gridSize : number): number[] {
    let path : number[] = []
    let cellsToExplore: number[] = []
    let came_from: IDictionary<number>[] = []
    let cost: IDictionary<number>[] = []
    let newCost: number = 0
    const entryCell: number = grid.findIndex(cell => cell == 2);
    const finalCell: number = grid.findIndex(cell => cell == 5);
    
    if (this.canMoveRight(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell+1)
      came_from.push({[entryCell+1]:entryCell==0 ? 1 : entryCell})
    }
    if (this.canMoveLeft(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell-1)
      came_from.push({[entryCell-1]:entryCell==0 ? 1 : entryCell})
    }
    if (this.canMoveUp(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell-gridSize)
      came_from.push({[entryCell-gridSize]:entryCell==0 ? 1 : entryCell})
    }
    if (this.canMoveDown(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell+gridSize)  
      came_from.push({[entryCell+gridSize]:entryCell==0 ? 1 : entryCell})
    }
    
    cost.push({[entryCell]:1})
    let currentCell = entryCell;
    const finalCoord = this.cellToCoordinates(finalCell, gridSize)
    while (cellsToExplore.length != 0){
      let coordCurrentCell = this.cellToCoordinates(currentCell,gridSize)
      if (finalCoord.x > coordCurrentCell.x && currentCell<10){
        cellsToExplore = cellsToExplore.filter(cell => cell < currentCell)
      }
      if (currentCell == 0){
        cost.push({1:1})
        cost.push({10:1})
      }
      
      let XToGo = finalCoord.x - coordCurrentCell.x
      let YToGo = finalCoord.y - coordCurrentCell.y
      let shouldMoveX = Math.abs(XToGo) > Math.abs(YToGo)
      if (shouldMoveX)
        cellsToExplore.sort((a,b)=> (a-came_from[came_from.findIndex(obj => obj[a])][a])- (b-came_from[came_from.findIndex(obj => obj[b])][b]))
      else
        cellsToExplore.sort((a,b)=> (b-came_from[came_from.findIndex(obj => obj[b])][b])-(a-came_from[came_from.findIndex(obj => obj[a])][a]))
      cellsToExplore.sort((a,b) => cost[cost.findIndex(obj=>obj[came_from[came_from.findIndex(obj => obj[a])][a]])][came_from[came_from.findIndex(obj => obj[a])][a]]-cost[cost.findIndex(obj=>obj[came_from[came_from.findIndex(obj => obj[b])][b]])][came_from[came_from.findIndex(obj => obj[b])][b]] )
      currentCell = cellsToExplore[0];
      if (currentCell == finalCell)
        break;
      cellsToExplore = cellsToExplore.filter(cell => cell !== cellsToExplore[0])
      let costBefore = cost[cost.findIndex(obj => obj[came_from[came_from.findIndex(obj => obj[currentCell])][currentCell]])][came_from[came_from.findIndex(obj => obj[currentCell])][currentCell]]
      newCost = costBefore + this.cellCost(grid,currentCell)
      if (cost.findIndex(obj=> obj[currentCell]) != -1 && newCost >= costBefore && currentCell != 1){
        console.log(cost.findIndex(obj=> obj[currentCell]) != -1)
        console.log(currentCell + " oui ")
        continue;
      }
              
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
    while (pathCell != entryCell) 
      {
      if (entryCell == 0 && pathCell == 1 || pathCell == 10)
        break
      pathCell = came_from[came_from.findIndex(obj => obj[pathCell])][pathCell]
      path.push(pathCell)
    }
    if (entryCell != 0)
      path.pop()
    return path
  }

  static cellCost(grid: number[], cell : number) : number {
    switch(grid[cell]) {
    case 4: { 
      return 20
  } 
      default: { 
        return 1; 
     } 
    }
  }

  static canMoveRight(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell%gridSize != gridSize-1 && grid[cell+1] != 1 && grid[cell+1] != 3) {
      return true;
    }
    return false
  }
  static canMoveLeft(grid: number[], cell : number, gridSize:number) : boolean {
    if ( cell%gridSize != 0 && grid[cell-1] != 1 && grid[cell-1] != 3) {
      return true;
    }
    return false
  }
  static canMoveUp(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell >= gridSize && grid[cell-gridSize] != 1 && grid[cell-gridSize] != 3) {
      return true;
    }
    return false
  }
  static canMoveDown(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell < gridSize*gridSize-gridSize && grid[cell+gridSize] != 1 &&grid[cell+gridSize] != 3) {
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

