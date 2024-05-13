import { Component } from '@angular/core';
import { GridComponent } from '../../components/grid/grid.component';
import { ValueSelctorComponent} from '../../components/value-selctor/value-selctor.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-grid-page',
  standalone: true,
  imports: [
    GridComponent,
    ValueSelctorComponent,
    NavBarComponent
  ],
  templateUrl: './grid-page.component.html',
  styleUrl: './grid-page.component.css'
})
export class GridPageComponent {
  currentValue!: number;


  currentValueSelected(value: number) {
    console.log('currentValueSelectedPAGE', value);
    this.currentValue = value;
    console.log('currentValueSelectedPAGE2', this.currentValue);
  }
}
