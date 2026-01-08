import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption } from '../../../shared/components';
import { FormsModule } from '@angular/forms';

type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'expired';

interface DocumentEntry {
  id: string;
  name: string;
  type: string;
  status: DocumentStatus;
  updatedAt: string;
  note?: string;
}

@Component({
  selector: 'app-student-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, TableComponent, InputComponent, SelectComponent],
  templateUrl: './student-documents.component.html',
  styleUrl: './student-documents.component.css'
})
export class StudentDocumentsComponent {
  documents: DocumentEntry[] = [
    { id: 'd1', name: 'Справка об обучении', type: 'Справка', status: 'approved', updatedAt: '10.01.2026' },
    { id: 'd2', name: 'Приказ о зачислении', type: 'Приказ', status: 'pending', updatedAt: '09.01.2026' }
  ];

  statusLabels: Record<DocumentStatus, string> = {
    pending: 'На проверке',
    approved: 'Принято',
    rejected: 'Отклонено',
    expired: 'Истек срок'
  };

  typeOptions: SelectOption[] = [
    { value: 'Справка', label: 'Справка об обучении' },
    { value: 'Приказ', label: 'Приказ о зачислении' },
    { value: 'Иностранная справка', label: 'Иностранная справка' }
  ];

  columns: TableColumn[] = [
    { key: 'name', label: 'Документ', sortable: true },
    { key: 'type', label: 'Тип', sortable: true },
    { key: 'status', label: 'Статус', sortable: true },
    { key: 'updatedAt', label: 'Дата обновления', sortable: true }
  ];

  uploadType = 'Справка';
  notes = '';

  getStatusLabel(status: DocumentStatus): string {
    return this.statusLabels[status] || status;
  }
}
