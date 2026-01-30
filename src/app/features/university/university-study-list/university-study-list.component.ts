import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption, ButtonComponent, ModalComponent } from '../../../shared/components';
import { UniversityStudyCreateEditComponent } from '../university-study-create-edit/university-study-create-edit.component';

interface UniversityStudyItem {
  id: string;
  fullName: string;
  faculty: string;
  course: string;
  startDate: string;
  endDate: string | null;
  status: 'ENROLLED' | 'EXPELLED';
  form: 'FULL_TIME' | 'PART_TIME';
}

@Component({
  selector: 'app-university-study-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, SelectComponent, ButtonComponent, ModalComponent, UniversityStudyCreateEditComponent],
  templateUrl: './university-study-list.component.html',
  styleUrl: './university-study-list.component.css'
})
export class UniversityStudyListComponent {
  showModal = false;
  selectedRecordId: string | null = null;
  filters = {
    fullName: '',
    faculty: '',
    status: 'all'
  };

  statusOptions: SelectOption[] = [
    { value: 'all', label: 'Все статусы' },
    { value: 'ENROLLED', label: 'Поступил' },
    { value: 'EXPELLED', label: 'Отчислен' }
  ];

  columns: TableColumn[] = [
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'faculty', label: 'Факультет', sortable: true },
    { key: 'course', label: 'Курс', sortable: true },
    { key: 'form', label: 'Форма', sortable: true },
    { key: 'startDate', label: 'Поступление', sortable: true },
    { key: 'endDate', label: 'Отчисление', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  records: UniversityStudyItem[] = [
    {
      id: 'uni-201',
      fullName: 'Смирнов Алексей Игоревич',
      faculty: 'Информатика',
      course: '2',
      startDate: '01.09.2024',
      endDate: null,
      status: 'ENROLLED',
      form: 'FULL_TIME'
    },
    {
      id: 'uni-198',
      fullName: 'Кузнецова Мария Сергеевна',
      faculty: 'Экономика',
      course: '4',
      startDate: '01.09.2021',
      endDate: '15.01.2026',
      status: 'EXPELLED',
      form: 'FULL_TIME'
    },
    {
      id: 'uni-191',
      fullName: 'Иванов Петр Павлович',
      faculty: 'Менеджмент',
      course: '1',
      startDate: '01.09.2025',
      endDate: null,
      status: 'ENROLLED',
      form: 'PART_TIME'
    }
  ];

  constructor() {}

  get filteredRecords(): UniversityStudyItem[] {
    const byName = this.filters.fullName.toLowerCase();
    const byFaculty = this.filters.faculty.toLowerCase();
    const byStatus = this.filters.status;

    return this.records.filter(record => {
      const matchesName = !byName || record.fullName.toLowerCase().includes(byName);
      const matchesFaculty = !byFaculty || record.faculty.toLowerCase().includes(byFaculty);
      const matchesStatus = byStatus === 'all' || record.status === byStatus;
      return matchesName && matchesFaculty && matchesStatus;
    });
  }

  openCreate(): void {
    this.selectedRecordId = null;
    this.showModal = true;
  }

  openEdit(record: UniversityStudyItem): void {
    this.selectedRecordId = record.id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRecordId = null;
  }

  getStatusLabel(status: UniversityStudyItem['status']): string {
    const labels: Record<UniversityStudyItem['status'], string> = {
      ENROLLED: 'Поступил',
      EXPELLED: 'Отчислен'
    };
    return labels[status];
  }

  getFormLabel(form: UniversityStudyItem['form']): string {
    return form === 'FULL_TIME' ? 'Очная' : 'Заочная';
  }
}
