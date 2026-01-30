import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-border',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './border.component.html',
  styleUrl: './border.component.css'
})
export class BorderComponent {
  menuItems = [
    { path: '/border/crossings', label: 'Реестр пересечений', icon: '🛂' }
  ];
}
