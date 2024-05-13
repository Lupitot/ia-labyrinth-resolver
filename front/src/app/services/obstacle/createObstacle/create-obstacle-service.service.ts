import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreateObstacleServiceService {
  constructor(private http: HttpClient) {}
  //http://localhost:3000/api/obstacles/post


  createObstacle(obstacle: any, httpOptions: any) {
    console.log('juste avant la requette dans le service', obstacle);
    return this.http.post(
      'http://localhost:3000/api/obstacles/post',
      obstacle,
      httpOptions
    );
  }
}
