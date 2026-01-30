import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn } from '../../../shared/components';

interface AuditItem {
  id: string;
  date: string;
  actor: string;
  entity: 'Passport' | 'Address' | 'MilOfficeAssignment';
  action: 'CREATE' | 'UPDATE';
  details: string;
}

@Component({
  selector: 'app-history-audit',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent],
  templateUrl: './history-audit.component.html',
  styleUrl: './history-audit.component.css'
})
export class HistoryAuditComponent {
  columns: TableColumn[] = [
    { key: 'date', label: 'Дата', sortable: true },
    { key: 'actor', label: 'Кто', sortable: true },
    { key: 'entity', label: 'Раздел', sortable: true },
    { key: 'action', label: 'Операция', sortable: true },
    { key: 'details', label: 'Изменение', sortable: true }
  ];

  entries: AuditItem[] = [
    {
      id: 'a-101',
      date: '25.01.2026 10:22',
      actor: 'Паспортный стол №2',
      entity: 'Address',
      action: 'UPDATE',
      details: 'Смена адреса регистрации'
    },
    {
      id: 'a-098',
      date: '24.01.2026 16:05',
      actor: 'Паспортный стол №2',
      entity: 'Passport',
      action: 'UPDATE',
      details: 'Коррекция серии/номера'
    },
    {
      id: 'a-091',
      date: '22.01.2026 09:40',
      actor: 'Паспортный стол №1',
      entity: 'MilOfficeAssignment',
      action: 'CREATE',
      details: 'Первичное прикрепление'
    }
  ];

  getEntityLabel(entity: AuditItem['entity']): string {
    const labels: Record<AuditItem['entity'], string> = {
      Passport: 'Паспорт',
      Address: 'Адрес',
      MilOfficeAssignment: 'Военкомат'
    };
    return labels[entity];
  }

  getActionLabel(action: AuditItem['action']): string {
    const labels: Record<AuditItem['action'], string> = {
      CREATE: 'Создание',
      UPDATE: 'Изменение'
    };
    return labels[action];
  }
}
