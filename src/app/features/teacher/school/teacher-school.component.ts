import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, ButtonComponent, ModalComponent } from '../../../shared/components';

interface SchoolRecord {
  id: string;
  studentName: string;
  className: string;
  startDate: string;
  endDate?: string;
  document: string;
}

@Component({
  selector: 'app-teacher-school',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, ButtonComponent, ModalComponent],
  templateUrl: './teacher-school.component.html',
  styleUrl: './teacher-school.component.css'
})
export class TeacherSchoolComponent {
  showModal = false;
  formData = {
    studentName: '',
    className: '',
    startDate: '',
    endDate: '',
    document: ''
  };

  columns: TableColumn[] = [
    { key: 'studentName', label: 'Студент', sortable: true },
    { key: 'className', label: 'Класс', sortable: true },
    { key: 'startDate', label: 'Начало', sortable: true },
    { key: 'endDate', label: 'Выпуск', sortable: true },
    { key: 'document', label: 'Документ', sortable: true }
  ];

  records: SchoolRecord[] = [
    { id: 'sc1', studentName: 'Алиев Рустам', className: '10-А', startDate: '2024-09-01', document: 'Справка №12' }
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
        className: this.formData.className,
        startDate: this.formData.startDate,
        endDate: this.formData.endDate || undefined,
        document: this.formData.document
      },
      ...this.records
    ];
    this.closeModal();
  }
}
