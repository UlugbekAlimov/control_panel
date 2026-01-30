import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-maternity',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './maternity.component.html',
  styleUrl: './maternity.component.css'
})
export class MaternityComponent {
  menuItems = [
    { path: '/maternity/birth-records', label: 'Реестр рождений', icon: '🍼' }
  ];
}
