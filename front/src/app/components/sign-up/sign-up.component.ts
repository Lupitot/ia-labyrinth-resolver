import { Component } from '@angular/core';
import { SignUpServiceService } from '../../services/signUp/sign-up-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [
    FormsModule,
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
