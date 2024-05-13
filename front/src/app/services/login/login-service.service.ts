import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  //http://localhost:3000/api/users/login

  login(user: any) {
    console.log(user);
    return this.http.post('http://localhost:3000/api/users/login', user);
  }
}
