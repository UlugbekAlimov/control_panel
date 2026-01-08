import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  menuItems = [
    { path: '/student/dashboard', label: 'Панель студента', icon: '🧭' },
    { path: '/student/profile', label: 'Мой профиль', icon: '👤' },
    { path: '/student/education', label: 'Образование', icon: '🎓' },
    { path: '/student/documents', label: 'Документы', icon: '📄' },
    { path: '/student/requests', label: 'Заявки', icon: '📝' },
    { path: '/student/notifications', label: 'Уведомления', icon: '🔔' },
    { path: '/student/settings', label: 'Настройки', icon: '⚙️' }
  ];
}
