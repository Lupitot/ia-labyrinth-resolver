import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetObstaclesServiceService {
  constructor(private http: HttpClient) {}

  //http://localhost:3000/api/obstacles/get

  getAllObstacle() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get('http://localhost:3000/api/obstacles/get', { headers });
  }

  private getToken() {
    return localStorage.getItem('token');
  }
}
