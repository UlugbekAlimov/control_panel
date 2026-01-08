import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '../../../shared/components';

interface NotificationItem {
  id: string;
  title: string;
  date: string;
  read: boolean;
}

@Component({
  selector: 'app-student-notifications',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './student-notifications.component.html',
  styleUrl: './student-notifications.component.css'
})
export class StudentNotificationsComponent {
  notifications: NotificationItem[] = [
    { id: 'n1', title: 'Отсрочка активирована', date: '05.01.2026', read: false },
    { id: 'n2', title: 'Документ принят: справка об обучении', date: '12.01.2026', read: true },
    { id: 'n3', title: 'Справка истекает через 15 дней', date: '18.01.2026', read: false }
  ];

  markAllRead(): void {
    this.notifications = this.notifications.map(item => ({ ...item, read: true }));
  }
}
