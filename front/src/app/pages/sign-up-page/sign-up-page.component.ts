import { Component } from '@angular/core';
import {SignUpComponent} from '../../components/sign-up/sign-up.component';

@Component({
  selector: 'sign-up-page',
  standalone: true,
  imports: [
    SignUpComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {


}
