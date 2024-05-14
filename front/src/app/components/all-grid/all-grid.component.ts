import { Component } from '@angular/core';
import { GetAllGridService } from '../../services/grid/getAllGrid/get-all-grid.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ConnectAllGridToGridService } from '../../services/connectAllGridToGrid/connect-all-grid-to-grid.service';

@Component({
  selector: 'all-grid',
  standalone: true,
  imports: [NgFor],
  templateUrl: './all-grid.component.html',
  styleUrl: './all-grid.component.css',
})
export class AllGridComponent {
  constructor(
    private allGridService: GetAllGridService,
    private router: Router,
    private connectAllGridToGridService: ConnectAllGridToGridService
  ) {}

  grids: any;

  ngOnInit() {
    this.loadGrids();
  }

  loadGrids() {
    this.allGridService.getAllGrid().subscribe((grids) => {
      this.grids = grids;
    });
  }

  selectGrid(grid: number[][]) {
    this.connectAllGridToGridService.setImportGrid(grid);
    this.router.navigate(['/Grid']);
  }
}
