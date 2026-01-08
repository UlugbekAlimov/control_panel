import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '../../../shared/components';

interface TeacherNotification {
  id: string;
  title: string;
  date: string;
  read: boolean;
}

@Component({
  selector: 'app-teacher-notifications',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './teacher-notifications.component.html',
  styleUrl: './teacher-notifications.component.css'
})
export class TeacherNotificationsComponent {
  notifications: TeacherNotification[] = [
    { id: 'tn1', title: 'Новая заявка на подтверждение обучения', date: '12.01.2026', read: false },
    { id: 'tn2', title: 'Истекает срок справки у Иванова И.', date: '11.01.2026', read: false },
    { id: 'tn3', title: 'Запрос от военкомата', date: '09.01.2026', read: true }
  ];

  markAllRead(): void {
    this.notifications = this.notifications.map(item => ({ ...item, read: true }));
  }
}
