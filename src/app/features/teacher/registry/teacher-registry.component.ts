import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption, ButtonComponent, ModalComponent } from '../../../shared/components';

type StudentStatus = 'school' | 'student' | 'expelled';

interface RegistryStudent {
  id: string;
  fullName: string;
  documentId?: string;
  status: StudentStatus;
  startDate: string;
  endDate?: string;
  group: string;
}

@Component({
  selector: 'app-teacher-registry',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    TableComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ModalComponent
  ],
  templateUrl: './teacher-registry.component.html',
  styleUrl: './teacher-registry.component.css'
})
export class TeacherRegistryComponent {
  searchQuery = '';
  docQuery = '';
  statusFilter: StudentStatus | 'all' = 'all';
  startDate = '';
  endDate = '';

  selectedStudent: RegistryStudent | null = null;
  showModal = false;

  statusOptions: SelectOption[] = [
    { value: 'all', label: 'Все статусы' },
    { value: 'school', label: 'Школьник' },
    { value: 'student', label: 'Студент' },
    { value: 'expelled', label: 'Отчислен' }
  ];

  columns: TableColumn[] = [
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'documentId', label: 'ИИН/паспорт', sortable: true },
    { key: 'status', label: 'Статус', sortable: true },
    { key: 'startDate', label: 'Начало', sortable: true },
    { key: 'endDate', label: 'Окончание', sortable: true },
    { key: 'group', label: 'Группа', sortable: true }
  ];

  students: RegistryStudent[] = [
    {
      id: 's1',
      fullName: 'Иванов Иван Иванович',
      documentId: 'AA123456',
      status: 'student',
      startDate: '2023-09-01',
      endDate: '2027-06-30',
      group: 'ИТ-21'
    },
    {
      id: 's2',
      fullName: 'Петров Петр Сергеевич',
      documentId: 'BB553322',
      status: 'expelled',
      startDate: '2021-09-01',
      endDate: '2024-03-10',
      group: 'ИНФ-19'
    }
  ];

  get filteredStudents(): RegistryStudent[] {
    return this.students.filter(student => {
      const matchesQuery = this.searchQuery
        ? student.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      const matchesDoc = this.docQuery
        ? (student.documentId || '').toLowerCase().includes(this.docQuery.toLowerCase())
        : true;
      const matchesStatus = this.statusFilter === 'all' || student.status === this.statusFilter;
      const matchesStart = this.startDate ? student.startDate >= this.startDate : true;
      const matchesEnd = this.endDate ? (student.endDate || '') <= this.endDate : true;

      return matchesQuery && matchesDoc && matchesStatus && matchesStart && matchesEnd;
    });
  }

  getStatusLabel(status: StudentStatus): string {
    const labels: Record<StudentStatus, string> = {
      school: 'Школьник',
      student: 'Студент',
      expelled: 'Отчислен'
    };
    return labels[status] || status;
  }

  openCard(student: RegistryStudent): void {
    this.selectedStudent = student;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedStudent = null;
  }
}
