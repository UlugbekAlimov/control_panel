import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './university.component.html',
  styleUrl: './university.component.css'
})
export class UniversityComponent {
  menuItems = [
    { path: '/university/studies', label: 'Реестр обучения', icon: '🎓' }
  ];
}
