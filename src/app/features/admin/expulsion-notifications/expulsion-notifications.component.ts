import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn, ButtonComponent, ModalComponent, InputComponent } from '../../../shared/components';
import { FormsModule } from '@angular/forms';

type ExpulsionStatus = 'pending' | 'confirmed' | 'error';

interface ExpulsionItem {
  id: string;
  student: string;
  institution: string;
  orderNumber: string;
  date: string;
  status: ExpulsionStatus;
}

@Component({
  selector: 'app-expulsion-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, ButtonComponent, ModalComponent, InputComponent],
  templateUrl: './expulsion-notifications.component.html',
  styleUrl: './expulsion-notifications.component.css'
})
export class ExpulsionNotificationsComponent {
  columns: TableColumn[] = [
    { key: 'student', label: 'Студент', sortable: true },
    { key: 'institution', label: 'Учреждение', sortable: true },
    { key: 'orderNumber', label: 'Приказ', sortable: true },
    { key: 'date', label: 'Дата', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  statusLabels: Record<ExpulsionStatus, string> = {
    pending: 'Ожидает',
    confirmed: 'Снято',
    error: 'Ошибка'
  };

  items: ExpulsionItem[] = [
    { id: 'e1', student: 'Петров Петр', institution: 'Колледж №4', orderNumber: '№12', date: '10.03.2024', status: 'pending' }
  ];

  showModal = false;
  selected: ExpulsionItem | null = null;
  comment = '';
  action: ExpulsionStatus | null = null;

  openDecision(item: ExpulsionItem, action: ExpulsionStatus): void {
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

  getStatusLabel(status: ExpulsionStatus): string {
    return this.statusLabels[status] || status;
  }
}
