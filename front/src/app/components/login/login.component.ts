import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login/login-service.service';
import { FormsModule } from '@angular/forms';


interface LoginResponse {
  token: string;
}


@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  name!: string;
  email!: string;
  password!: string;

  

  constructor(private loginService: LoginServiceService) {}

  

  submitForm() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.login(user);
  }


  login(user: any) {
    this.loginService.login(user).subscribe((response: any) => {
      console.log("la reponse", response);
      localStorage.setItem('token', response.token);
      let token = localStorage.getItem('token');
      if (token) {
        console.log(token);
      } else {
        console.log('No token found');
      }
    });
  }
}
