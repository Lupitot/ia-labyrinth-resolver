import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateObstacleServiceService } from '../../services/obstacle/createObstacle/create-obstacle-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'gestion-obstacles',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './gestion-obstacles.component.html',
  styleUrl: './gestion-obstacles.component.css',
})
export class GestionObstaclesComponent {
  name!: string;
  traversable!: boolean;
  effect!: string;
  appearance!: string;
  min!: number;
  max!: number;

  constructor(private createObstacleService: CreateObstacleServiceService) {}

  submitForm() {
    const obstacle = {
      name: this.name,
      traversable: this.traversable,
      effect: this.effect,
      appearance: this.appearance,
      min: this.min,
      max: this.max,
    };
    console.log(obstacle);
    this.createObstacle(obstacle);
  }
  createObstacle(obstacle: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    this.createObstacleService.createObstacle(obstacle, httpOptions).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
