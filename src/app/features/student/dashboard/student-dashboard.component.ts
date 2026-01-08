import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '../../../shared/components';

interface StudentAlert {
  id: string;
  message: string;
  type: 'warning' | 'info';
}

interface StudentEvent {
  id: string;
  title: string;
  date: string;
  status: 'new' | 'info';
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  currentStatus = signal('Студент');
  defermentInfo = signal({
    active: true,
    reason: 'Обучение в ВУЗе (очная форма)',
    expiresAt: '30.06.2026'
  });

  alerts = signal<StudentAlert[]>([]);
  events = signal<StudentEvent[]>([]);

  ngOnInit(): void {
    this.alerts.set([
      { id: 'a1', message: 'Справка скоро истекает (10 дней).', type: 'warning' },
      { id: 'a2', message: 'Заявка на проверке данных об обучении.', type: 'info' }
    ]);

    this.events.set([
      { id: 'e1', title: 'Документ принят: справка об обучении', date: '12.01.2026', status: 'new' },
      { id: 'e2', title: 'Отсрочка активирована', date: '05.01.2026', status: 'info' }
    ]);
  }
}
