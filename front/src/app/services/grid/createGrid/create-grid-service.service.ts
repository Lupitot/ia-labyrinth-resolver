import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateGridServiceService {

  constructor(private http:HttpClient) { }

  //http://localhost:3000/api/level/post

  createGrid(grid: any, httpOptions: any) {
    return this.http.post('http://localhost:3000/api/level/post', grid, httpOptions);
  }
}
