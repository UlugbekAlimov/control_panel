import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent, TableComponent, TableColumn, ButtonComponent, ModalComponent } from '../../../shared/components';
import { BirthRecordCreateComponent } from '../birth-record-create/birth-record-create.component';

interface BirthRecordItem {
  id: string;
  birthDateTime: string;
  motherFullName: string;
  fatherFullName: string;
  sex: 'male' | 'female';
  status: 'DRAFT' | 'SUBMITTED' | 'CANCELLED' | 'VOID';
}

@Component({
  selector: 'app-birth-record-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent, ButtonComponent, ModalComponent, BirthRecordCreateComponent],
  templateUrl: './birth-record-list.component.html',
  styleUrl: './birth-record-list.component.css'
})
export class BirthRecordListComponent {
  showCreateModal = false;
  columns: TableColumn[] = [
    { key: 'birthDateTime', label: 'Дата и время', sortable: true },
    { key: 'motherFullName', label: 'ФИО матери', sortable: true },
    { key: 'fatherFullName', label: 'ФИО отца', sortable: true },
    { key: 'sex', label: 'Пол', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  records: BirthRecordItem[] = [
    {
      id: 'br-1024',
      birthDateTime: '25.01.2026 04:18',
      motherFullName: 'Семенова Ирина Викторовна',
      fatherFullName: 'Семенов Андрей Юрьевич',
      sex: 'male',
      status: 'SUBMITTED'
    },
    {
      id: 'br-1023',
      birthDateTime: '24.01.2026 21:05',
      motherFullName: 'Кузнецова Анна Сергеевна',
      fatherFullName: 'Кузнецов Дмитрий Олегович',
      sex: 'female',
      status: 'DRAFT'
    },
    {
      id: 'br-1019',
      birthDateTime: '21.01.2026 12:40',
      motherFullName: 'Лазарева Марина Игоревна',
      fatherFullName: 'Лазарев Павел Ильич',
      sex: 'male',
      status: 'CANCELLED'
    }
  ];

  constructor(private router: Router) {}

  openCreate(): void {
    this.showCreateModal = true;
  }

  closeCreate(): void {
    this.showCreateModal = false;
  }

  openRecord(record: BirthRecordItem): void {
    this.router.navigate(['/maternity/birth-records', record.id]);
  }

  getSexLabel(sex: BirthRecordItem['sex']): string {
    return sex === 'male' ? 'Мальчик' : 'Девочка';
  }

  getStatusLabel(status: BirthRecordItem['status']): string {
    const labels: Record<BirthRecordItem['status'], string> = {
      DRAFT: 'Черновик',
      SUBMITTED: 'Отправлено',
      CANCELLED: 'Отменено',
      VOID: 'Аннулировано'
    };
    return labels[status];
  }
}

