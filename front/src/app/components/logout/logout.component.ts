import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logoutBtn',
  standalone: true,
  imports: [
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

}
