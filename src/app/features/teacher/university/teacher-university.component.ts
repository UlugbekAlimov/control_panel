import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption, ButtonComponent, ModalComponent } from '../../../shared/components';

interface UniversityRecord {
  id: string;
  studentName: string;
  faculty: string;
  course: string;
  form: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expelled';
}

@Component({
  selector: 'app-teacher-university',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, SelectComponent, ButtonComponent, ModalComponent],
  templateUrl: './teacher-university.component.html',
  styleUrl: './teacher-university.component.css'
})
export class TeacherUniversityComponent {
  showModal = false;
  formData = {
    studentName: '',
    faculty: '',
    course: '',
    form: 'Очная',
    startDate: '',
    endDate: ''
  };

  columns: TableColumn[] = [
    { key: 'studentName', label: 'Студент', sortable: true },
    { key: 'faculty', label: 'Факультет', sortable: true },
    { key: 'course', label: 'Курс', sortable: true },
    { key: 'form', label: 'Форма', sortable: true },
    { key: 'startDate', label: 'Зачисление', sortable: true },
    { key: 'endDate', label: 'Окончание', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  records: UniversityRecord[] = [
    {
      id: 'u1',
      studentName: 'Иванов Иван',
      faculty: 'ИТ',
      course: '2',
      form: 'Очная',
      startDate: '2023-09-01',
      endDate: '2027-06-30',
      status: 'active'
    }
  ];

  formOptions: SelectOption[] = [
    { value: 'Очная', label: 'Очная' }
  ];

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addRecord(): void {
    if (!this.formData.studentName || !this.formData.startDate) return;
    this.records = [
      {
        id: Date.now().toString(),
        studentName: this.formData.studentName,
        faculty: this.formData.faculty,
        course: this.formData.course,
        form: this.formData.form,
        startDate: this.formData.startDate,
        endDate: this.formData.endDate,
        status: 'active'
      },
      ...this.records
    ];
    this.closeModal();
  }

  expel(record: UniversityRecord): void {
    this.records = this.records.map(item =>
      item.id === record.id ? { ...item, status: 'expelled' } : item
    );
  }

  getStatusLabel(status: UniversityRecord['status']): string {
    return status === 'active' ? 'Обучается' : 'Отчислен';
  }
}
