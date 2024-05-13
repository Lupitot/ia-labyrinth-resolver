import { Component } from '@angular/core';
import { SignUpServiceService } from '../../services/signUp/sign-up-service.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet, RouterLink, RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(private signUpService: SignUpServiceService) {}

  submitForm() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.createUser(user);
  }

  createUser(user: any) {
    this.signUpService.createUser(user).subscribe((response) => {
      console.log(response);
    });
  }
}

//http://localhost:3000/api/level/post
