import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn } from '../../../shared/components';

@Component({
  selector: 'app-admin-audit',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent],
  templateUrl: './admin-audit.component.html',
  styleUrl: './admin-audit.component.css'
})
export class AdminAuditComponent {
  columns: TableColumn[] = [
    { key: 'actor', label: 'Кто', sortable: true },
    { key: 'action', label: 'Действие', sortable: true },
    { key: 'target', label: 'Объект', sortable: true },
    { key: 'date', label: 'Дата', sortable: true }
  ];

  rows = [
    { actor: 'Админ', action: 'Подтвердил отсрочку', target: 'Иванов И.И.', date: '12.01.2026' },
    { actor: 'Преподаватель', action: 'Загрузил приказ', target: 'Петров П.П.', date: '11.01.2026' }
  ];
}
