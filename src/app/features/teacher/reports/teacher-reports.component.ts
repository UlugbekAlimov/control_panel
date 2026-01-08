import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn, ButtonComponent } from '../../../shared/components';

@Component({
  selector: 'app-teacher-reports',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent, ButtonComponent],
  templateUrl: './teacher-reports.component.html',
  styleUrl: './teacher-reports.component.css'
})
export class TeacherReportsComponent {
  activeColumns: TableColumn[] = [
    { key: 'student', label: 'Студент', sortable: true },
    { key: 'group', label: 'Группа', sortable: true },
    { key: 'startDate', label: 'Зачисление', sortable: true },
    { key: 'endDate', label: 'Окончание', sortable: true }
  ];

  expelledColumns: TableColumn[] = [
    { key: 'student', label: 'Студент', sortable: true },
    { key: 'date', label: 'Дата отчисления', sortable: true },
    { key: 'reason', label: 'Причина', sortable: true }
  ];

  activeStudents = [
    { student: 'Иванов Иван', group: 'ИТ-21', startDate: '01.09.2023', endDate: '30.06.2027' }
  ];

  expelledStudents = [
    { student: 'Петров Петр', date: '10.03.2024', reason: 'Личное заявление' }
  ];
}
