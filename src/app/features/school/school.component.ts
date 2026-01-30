import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent {
  menuItems = [
    { path: '/school/studies', label: 'Реестр обучения', icon: '🏫' }
  ];
}
