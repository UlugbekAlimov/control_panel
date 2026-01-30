import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-clinic',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './clinic.component.html',
  styleUrl: './clinic.component.css'
})
export class ClinicComponent {
  menuItems = [
    { path: '/clinic/records', label: 'Карта пациента', icon: '🩺' }
  ];
}
