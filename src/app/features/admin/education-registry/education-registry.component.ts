import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, SelectComponent, SelectOption, ButtonComponent, ModalComponent } from '../../../shared/components';

type StudyStatus = 'school' | 'student' | 'expelled';

interface EducationRegistryRow {
  id: string;
  fullName: string;
  documentId: string;
  status: StudyStatus;
  institution: string;
  form: string;
  startDate: string;
  endDate?: string;
  defermentActive: boolean;
}

@Component({
  selector: 'app-education-registry',
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
  templateUrl: './education-registry.component.html',
  styleUrl: './education-registry.component.css'
})
export class EducationRegistryComponent {
  searchQuery = '';
  docQuery = '';
  statusFilter: StudyStatus | 'all' = 'all';
  institutionQuery = '';
  formFilter: 'all' | 'Очная' | 'Заочная' | 'Дистанционная' = 'all';
  startDate = '';
  endDate = '';

  selected: EducationRegistryRow | null = null;
  showCard = false;

  statusOptions: SelectOption[] = [
    { value: 'all', label: 'Все статусы' },
    { value: 'school', label: 'Школьник' },
    { value: 'student', label: 'Студент' },
    { value: 'expelled', label: 'Отчислен' }
  ];

  formOptions: SelectOption[] = [
    { value: 'all', label: 'Все формы' },
    { value: 'Очная', label: 'Очная' },
    { value: 'Заочная', label: 'Заочная' },
    { value: 'Дистанционная', label: 'Дистанционная' }
  ];

  columns: TableColumn[] = [
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'documentId', label: 'ID/паспорт', sortable: true },
    { key: 'status', label: 'Статус', sortable: true },
    { key: 'institution', label: 'Учреждение', sortable: true },
    { key: 'form', label: 'Форма', sortable: true },
    { key: 'startDate', label: 'Зачисление', sortable: true },
    { key: 'endDate', label: 'Отчисление', sortable: true }
  ];

  rows: EducationRegistryRow[] = [
    {
      id: 'er1',
      fullName: 'Иванов Иван Иванович',
      documentId: 'AA123456',
      status: 'student',
      institution: 'МГТУ им. Баумана',
      form: 'Очная',
      startDate: '2023-09-01',
      endDate: '',
      defermentActive: true
    },
    {
      id: 'er2',
      fullName: 'Петров Петр Сергеевич',
      documentId: 'BB987654',
      status: 'expelled',
      institution: 'Колледж №4',
      form: 'Очная',
      startDate: '2021-09-01',
      endDate: '2024-03-10',
      defermentActive: false
    }
  ];

  get filteredRows(): EducationRegistryRow[] {
    return this.rows.filter(row => {
      const matchesName = this.searchQuery
        ? row.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      const matchesDoc = this.docQuery
        ? row.documentId.toLowerCase().includes(this.docQuery.toLowerCase())
        : true;
      const matchesStatus = this.statusFilter === 'all' || row.status === this.statusFilter;
      const matchesInstitution = this.institutionQuery
        ? row.institution.toLowerCase().includes(this.institutionQuery.toLowerCase())
        : true;
      const matchesForm = this.formFilter === 'all' || row.form === this.formFilter;
      const matchesStart = this.startDate ? row.startDate >= this.startDate : true;
      const matchesEnd = this.endDate ? (row.endDate || '') <= this.endDate : true;
      return matchesName && matchesDoc && matchesStatus && matchesInstitution && matchesForm && matchesStart && matchesEnd;
    });
  }

  getStatusLabel(status: StudyStatus): string {
    const labels: Record<StudyStatus, string> = {
      school: 'Школьник',
      student: 'Студент',
      expelled: 'Отчислен'
    };
    return labels[status] || status;
  }

  openCard(row: EducationRegistryRow): void {
    this.selected = row;
    this.showCard = true;
  }

  closeCard(): void {
    this.showCard = false;
    this.selected = null;
  }
}
