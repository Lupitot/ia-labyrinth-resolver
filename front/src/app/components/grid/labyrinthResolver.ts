import { IVector } from "../../interfaces/IVector"

export class LabyrinthResolver {
  
  static resolveLabyrinth(grid :  number[], gridSize : number): number[] {
    const path : number[] = []
    const cellsToExplore: number[] = []
    const came_from: IDictionary<number> = {}
    const cost: IDictionary<number> = {}
    const entryCell: number = grid.findIndex(cell => cell == 1);
    
    if (this.canMoveRight(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell+1)
    }
    if (this.canMoveLeft(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell-1)
    }
    if (this.canMoveUp(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell-gridSize)
    }
    if (this.canMoveDown(grid, entryCell, gridSize)) {
      cellsToExplore.push(entryCell+gridSize)
    }
    came_from[entryCell] = -1
    cost[entryCell] = 0
    let currentCell = -1;
    // while not frontier.empty():
//    current = frontier.get()

//    if current == goal:
//       break
   
//    for next in graph.neighbors(current):
//       new_cost = cost_so_far[current] + graph.cost(current, next)
//       if next not in cost_so_far or new_cost < cost_so_far[next]:
//          cost_so_far[next] = new_cost
//          priority = new_cost
//          frontier.put(next, priority)
//          came_from[next] = current
    while (cellsToExplore.length != 0) {
      currentCell = cellsToExplore[0];
      if (currentCell == grid.findIndex(cell => cell == 5)){
        break;
      }
      
    }
    

    return path
  }


  static canMoveRight(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell%gridSize != gridSize-1 && grid[cell+1] == 0) {
      return true;
    }
    return false
  }
  static canMoveLeft(grid: number[], cell : number, gridSize:number) : boolean {
    if ( cell%gridSize != 0 && grid[cell-1] == 0) {
      return true;
    }
    return false
  }
  static canMoveUp(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell >= gridSize && grid[cell-gridSize] == 0) {
      return true;
    }
    return false
  }
  static canMoveDown(grid: number[], cell : number, gridSize:number) : boolean {
    if (cell < gridSize*gridSize-gridSize && grid[cell+gridSize] == 0 ) {
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

