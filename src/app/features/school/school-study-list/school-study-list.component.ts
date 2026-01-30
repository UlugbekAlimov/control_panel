import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption, ButtonComponent, ModalComponent } from '../../../shared/components';
import { SchoolStudyCreateEditComponent } from '../school-study-create-edit/school-study-create-edit.component';

interface SchoolStudyItem {
  id: string;
  startDate: string;
  endDate: string | null;
  fullName: string;
  classLevel: string;
  status: 'ACTIVE' | 'GRADUATED' | 'TRANSFERRED';
}

@Component({
  selector: 'app-school-study-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, SelectComponent, ButtonComponent, ModalComponent, SchoolStudyCreateEditComponent],
  templateUrl: './school-study-list.component.html',
  styleUrl: './school-study-list.component.css'
})
export class SchoolStudyListComponent {
  showModal = false;
  selectedRecordId: string | null = null;
  filters = {
    fullName: '',
    classLevel: '',
    status: 'all'
  };

  statusOptions: SelectOption[] = [
    { value: 'all', label: 'Все статусы' },
    { value: 'ACTIVE', label: 'Обучается' },
    { value: 'GRADUATED', label: 'Выпуск' },
    { value: 'TRANSFERRED', label: 'Переведен' }
  ];

  columns: TableColumn[] = [
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'classLevel', label: 'Класс', sortable: true },
    { key: 'startDate', label: 'Начало', sortable: true },
    { key: 'endDate', label: 'Окончание', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  records: SchoolStudyItem[] = [
    {
      id: 'sch-101',
      startDate: '01.09.2022',
      endDate: null,
      fullName: 'Смирнов Алексей Игоревич',
      classLevel: '7Б',
      status: 'ACTIVE'
    },
    {
      id: 'sch-098',
      startDate: '01.09.2014',
      endDate: '25.05.2024',
      fullName: 'Полякова Мария Денисовна',
      classLevel: '11А',
      status: 'GRADUATED'
    },
    {
      id: 'sch-091',
      startDate: '01.09.2021',
      endDate: '10.01.2026',
      fullName: 'Ким Сергей Павлович',
      classLevel: '6В',
      status: 'TRANSFERRED'
    }
  ];

  constructor() {}

  get filteredRecords(): SchoolStudyItem[] {
    const byName = this.filters.fullName.toLowerCase();
    const byClass = this.filters.classLevel.toLowerCase();
    const byStatus = this.filters.status;

    return this.records.filter(record => {
      const matchesName = !byName || record.fullName.toLowerCase().includes(byName);
      const matchesClass = !byClass || record.classLevel.toLowerCase().includes(byClass);
      const matchesStatus = byStatus === 'all' || record.status === byStatus;
      return matchesName && matchesClass && matchesStatus;
    });
  }

  openCreate(): void {
    this.selectedRecordId = null;
    this.showModal = true;
  }

  openEdit(record: SchoolStudyItem): void {
    this.selectedRecordId = record.id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRecordId = null;
  }

  getStatusLabel(status: SchoolStudyItem['status']): string {
    const labels: Record<SchoolStudyItem['status'], string> = {
      ACTIVE: 'Обучается',
      GRADUATED: 'Выпуск',
      TRANSFERRED: 'Переведен'
    };
    return labels[status];
  }
}
