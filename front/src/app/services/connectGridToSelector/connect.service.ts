import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private appearance: string = '#f5f5f5'; 
  private max: number = 0;
  private min: number = 0;

  setColor(color: string) { //changer la couleur courante de la cellule
    this.appearance = color;
  }

  getColor() { //récupérer la couleur courante de la cellule
    return this.appearance;
  }

  setMax(max: number) { //changer la valeur max de la cellule
    this.max = max;
  }

  getMax() { //récupérer la valeur max de la cellule
    return this.max;
  }

  setMin(min: number) { //changer la valeur min de la cellule
    this.min = min;
  }

  getMin() { //récupérer la valeur min de la cellule
    return this.min;
  }


}
