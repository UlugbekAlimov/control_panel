import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn, ButtonComponent, InputComponent, ModalComponent } from '../../../shared/components';
import { FormsModule } from '@angular/forms';

type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'needs_work';

interface ReviewItem {
  id: string;
  student: string;
  institution: string;
  document: string;
  submittedAt: string;
  status: ReviewStatus;
}

@Component({
  selector: 'app-deferment-review',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, ButtonComponent, InputComponent, ModalComponent],
  templateUrl: './deferment-review.component.html',
  styleUrl: './deferment-review.component.css'
})
export class DefermentReviewComponent {
  columns: TableColumn[] = [
    { key: 'student', label: 'Студент', sortable: true },
    { key: 'institution', label: 'Учреждение', sortable: true },
    { key: 'document', label: 'Документ', sortable: true },
    { key: 'submittedAt', label: 'Дата', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  statusLabels: Record<ReviewStatus, string> = {
    pending: 'На проверке',
    approved: 'Подтверждено',
    rejected: 'Отказ',
    needs_work: 'Доработка'
  };

  items: ReviewItem[] = [
    { id: 'r1', student: 'Иванов Иван', institution: 'МГТУ', document: 'Справка №14', submittedAt: '12.01.2026', status: 'pending' },
    { id: 'r2', student: 'Петров Петр', institution: 'Колледж №4', document: 'Приказ №11', submittedAt: '11.01.2026', status: 'pending' }
  ];

  showModal = false;
  comment = '';
  selected: ReviewItem | null = null;
  action: ReviewStatus | null = null;

  openDecision(item: ReviewItem, action: ReviewStatus): void {
    this.selected = item;
    this.action = action;
    this.comment = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selected = null;
    this.action = null;
  }

  applyDecision(): void {
    if (!this.selected || !this.action) return;
    this.items = this.items.map(item =>
      item.id === this.selected!.id ? { ...item, status: this.action! } : item
    );
    this.closeModal();
  }

  getStatusLabel(status: ReviewStatus): string {
    return this.statusLabels[status] || status;
  }
}
