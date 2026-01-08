import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn } from '../../../shared/components';

@Component({
  selector: 'app-teacher-audit',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent],
  templateUrl: './teacher-audit.component.html',
  styleUrl: './teacher-audit.component.css'
})
export class TeacherAuditComponent {
  statusColumns: TableColumn[] = [
    { key: 'student', label: 'Студент', sortable: true },
    { key: 'event', label: 'Событие', sortable: true },
    { key: 'date', label: 'Дата', sortable: true }
  ];

  auditColumns: TableColumn[] = [
    { key: 'actor', label: 'Кто', sortable: true },
    { key: 'action', label: 'Изменение', sortable: true },
    { key: 'date', label: 'Дата', sortable: true }
  ];

  statusHistory = [
    { student: 'Иванов Иван', event: 'Зачисление', date: '01.09.2023' },
    { student: 'Петров Петр', event: 'Отчисление', date: '10.03.2024' }
  ];

  auditLog = [
    { actor: 'Преподаватель', action: 'Обновил справку', date: '12.01.2026' },
    { actor: 'Администратор', action: 'Подтвердил обучение', date: '10.01.2026' }
  ];
}
