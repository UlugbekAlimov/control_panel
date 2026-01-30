import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-vvk',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './vvk.component.html',
  styleUrl: './vvk.component.css'
})
export class VvkComponent {
  menuItems = [
    { path: '/vvk/queue', label: 'Очередь ВВК', icon: '🩻' }
  ];
}
