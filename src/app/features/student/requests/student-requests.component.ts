import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent, InputComponent, SelectComponent, SelectOption, TableComponent, TableColumn } from '../../../shared/components';

type RequestStatus = 'pending' | 'approved' | 'rejected';

interface RequestEntry {
  id: string;
  type: string;
  createdAt: string;
  status: RequestStatus;
  comment?: string;
}

@Component({
  selector: 'app-student-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, InputComponent, SelectComponent, TableComponent],
  templateUrl: './student-requests.component.html',
  styleUrl: './student-requests.component.css'
})
export class StudentRequestsComponent {
  requestType = 'Подтвердить отсрочку';
  comment = '';

  requestOptions: SelectOption[] = [
    { value: 'Подтвердить отсрочку', label: 'Подтвердить отсрочку' },
    { value: 'Обновить данные об учебе', label: 'Обновить данные об учебе' },
    { value: 'Исправить ошибку в профиле', label: 'Исправить ошибку в профиле' },
    { value: 'Уточнить статус', label: 'Уточнить статус' }
  ];

  columns: TableColumn[] = [
    { key: 'type', label: 'Тип заявки', sortable: true },
    { key: 'createdAt', label: 'Дата', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  statusLabels: Record<RequestStatus, string> = {
    pending: 'На проверке',
    approved: 'Принято',
    rejected: 'Отклонено'
  };

  requests: RequestEntry[] = [
    { id: 'r1', type: 'Подтвердить отсрочку', createdAt: '08.01.2026', status: 'pending' },
    { id: 'r2', type: 'Уточнить статус', createdAt: '20.12.2025', status: 'approved' }
  ];

  submit(): void {
    this.requests = [
      {
        id: Date.now().toString(),
        type: this.requestType,
        createdAt: new Date().toLocaleDateString('ru-RU'),
        status: 'pending',
        comment: this.comment
      },
      ...this.requests
    ];
    this.comment = '';
  }

  getStatusLabel(status: RequestStatus): string {
    return this.statusLabels[status] || status;
  }
}
