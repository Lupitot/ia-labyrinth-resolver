import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login/login-service.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet, RouterLink, RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  name!: string;
  email!: string;
  password!: string;

  

  constructor(private loginService: LoginServiceService, private router: Router ) {}

  

  submitForm() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.login(user);
    this.router.navigate(['/all-grid']);
  }


  login(user: any) {
    this.loginService.login(user).subscribe(
      (response: any) => {
        console.log("la reponse", response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.name);
        let token = localStorage.getItem('token');
        if (token) {
          console.log(token);
        } else {
          console.log('No token found');
        }
      },
      (error) => {
        console.error('Erreur lors de la connexion : ', error);
      }
    );
  }
}
