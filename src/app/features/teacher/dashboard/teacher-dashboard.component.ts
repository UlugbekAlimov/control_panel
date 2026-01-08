import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '../../../shared/components';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {
  alerts: Array<{ id: string; message: string; type: 'warning' | 'info' }> = [];
  notifications: Array<{ id: string; title: string; date: string }> = [];

  ngOnInit(): void {
    this.alerts = [
      { id: 't1', message: 'Истекает срок справки у 3 студентов.', type: 'warning' },
      { id: 't2', message: 'Новые заявки на подтверждение обучения.', type: 'info' }
    ];
    this.notifications = [
      { id: 'n1', title: 'Запрос от военкомата по студенту №145', date: '12.01.2026' },
      { id: 'n2', title: 'Данные об учебе подтверждены', date: '10.01.2026' }
    ];
  }
}
