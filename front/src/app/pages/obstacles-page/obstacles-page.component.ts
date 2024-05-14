import { Component } from '@angular/core';
import { GestionObstaclesComponent } from '../../components/gestion-obstacles/gestion-obstacles.component';

@Component({
  selector: 'app-obstacles-page',
  standalone: true,
  imports: [
    GestionObstaclesComponent
  ],
  templateUrl: './obstacles-page.component.html',
  styleUrl: './obstacles-page.component.css'
})
export class ObstaclesPageComponent {

}
