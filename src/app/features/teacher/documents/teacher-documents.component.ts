import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption, ButtonComponent, ModalComponent } from '../../../shared/components';

type DocumentStatus = 'pending' | 'approved' | 'rejected';

interface DocumentItem {
  id: string;
  name: string;
  uploader: string;
  status: DocumentStatus;
  date: string;
}

@Component({
  selector: 'app-teacher-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, SelectComponent, ButtonComponent, ModalComponent],
  templateUrl: './teacher-documents.component.html',
  styleUrl: './teacher-documents.component.css'
})
export class TeacherDocumentsComponent {
  showModal = false;
  documentType = 'Справка';
  comment = '';

  typeOptions: SelectOption[] = [
    { value: 'Справка', label: 'Справка об обучении' },
    { value: 'Приказ', label: 'Приказ' },
    { value: 'Подтверждение', label: 'Подтверждение очной формы' }
  ];

  columns: TableColumn[] = [
    { key: 'name', label: 'Документ', sortable: true },
    { key: 'uploader', label: 'Кто загрузил', sortable: true },
    { key: 'status', label: 'Статус', sortable: true },
    { key: 'date', label: 'Дата', sortable: true }
  ];

  statusLabels: Record<DocumentStatus, string> = {
    pending: 'На проверке',
    approved: 'Принято',
    rejected: 'Отклонено'
  };

  documents: DocumentItem[] = [
    { id: 'd1', name: 'Справка №12', uploader: 'Преподаватель', status: 'approved', date: '10.01.2026' },
    { id: 'd2', name: 'Приказ о зачислении', uploader: 'Преподаватель', status: 'pending', date: '12.01.2026' }
  ];

  getStatusLabel(status: DocumentStatus): string {
    return this.statusLabels[status] || status;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
