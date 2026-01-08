import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  menuItems = [
    { path: '/teacher/dashboard', label: 'Панель преподавателя', icon: '🧭' },
    { path: '/teacher/profile', label: 'Профиль', icon: '👤' },
    { path: '/teacher/registry', label: 'Реестр студентов', icon: '👥' },
    { path: '/teacher/school', label: 'Школа', icon: '🏫' },
    { path: '/teacher/university', label: 'ВУЗ / Колледж', icon: '🎓' },
    { path: '/teacher/documents', label: 'Документы', icon: '📄' },
    { path: '/teacher/requests', label: 'Заявки', icon: '📝' },
    { path: '/teacher/notifications', label: 'Уведомления', icon: '🔔' },
    { path: '/teacher/audit', label: 'История и аудит', icon: '🧾' },
    { path: '/teacher/reports', label: 'Отчеты', icon: '📊' }
  ];
}
