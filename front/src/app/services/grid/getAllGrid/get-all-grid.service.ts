import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAllGridService {

  constructor(private http:HttpClient) { }

  //http://localhost:3000/api/level/get

  
  getAllGrid() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get('http://localhost:3000/api/level/get', { headers });
  }

  private getToken() {
    return localStorage.getItem('token');
  }

}
