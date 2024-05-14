import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {

  constructor(private http:HttpClient) { }

  createUser(user: any) {
    return this.http.post('http://localhost:3000/api/users/signup', user);
  }
  
}
