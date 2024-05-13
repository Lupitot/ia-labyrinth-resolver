import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {LogoutComponent} from '../logout/logout.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, LogoutComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {


}
