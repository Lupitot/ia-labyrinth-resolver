import { Component, Output, EventEmitter } from '@angular/core';
import { GetObstaclesServiceService } from '../../services/obstacle/getObstacle/get-obstacles-service.service';
import { NgFor } from '@angular/common';
import { ConnectService } from '../../services/connectGridToSelector/connect.service';

@Component({
  selector: 'value-selctor',
  standalone: true,
  imports: [NgFor],
  templateUrl: './value-selctor.component.html',
  styleUrl: './value-selctor.component.css',
})
export class ValueSelctorComponent {
  @Output() selelctedValue = new EventEmitter<number>();

  constructor(private allObstacleService: GetObstaclesServiceService, private connectService : ConnectService ) {}

  currentValue = 0;

  listeObstacles: any;
  selectedObstacle: any;

  selectValue(value: number) {
    console.log(value);
    this.selectedObstacle = this.listeObstacles[value]; //récupérer l'obstacle selectionné
    this.currentValue = value;
    if (this.currentValue != null && this.currentValue >= 0) { //si la valeur est supérieur ou égale à 0
      console.log('currentValueAVANTEMIT', this.currentValue);
      this.selelctedValue.emit(this.currentValue); //emettre la valeur selectionné
      console.log('currentValueAPRESEMIT', this.currentValue);
      this.changeAppearance(this.selectedObstacle.appearance); //changer l'apparence de la cellule
      console.log('max', this.selectedObstacle.max);
      console.log('min', this.selectedObstacle.min);
      this.changeMax(this.selectedObstacle.max); //changer la valeur max de la cellule
      this.changeMin(this.selectedObstacle.min); //changer la valeur min de la cellule
    }
  }

  changeAppearance(newAppearance: string) {
    this.connectService.setColor(newAppearance); // envoyer la nouvelle couleur de la cellule
  }

  changeMax(newMax: number) {
    this.connectService.setMax(newMax); // envoyer la nouvelle valeur max de la cellule
  }

  changeMin(newMin: number) {
    this.connectService.setMin(newMin); // envoyer la nouvelle valeur min de la cellule
  }

  ngOnInit() {
    this.loadObstacles();
  }

  loadObstacles() {
    this.allObstacleService.getAllObstacle().subscribe((obstacles) => {
      this.listeObstacles = obstacles;
      console.log(this.listeObstacles);
    });
  }
}
