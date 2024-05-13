import { Component } from '@angular/core';
import { AllGridComponent } from '../../components/all-grid/all-grid.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-all-grid-page',
  standalone: true,
  imports: [AllGridComponent, NavBarComponent],
  templateUrl: './all-grid-page.component.html',
  styleUrl: './all-grid-page.component.css',
})
export class AllGridPageComponent {



  
}
