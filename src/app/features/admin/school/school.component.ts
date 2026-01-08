import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitizenService } from '../../../services/citizen.service';
import { EducationRecord, EducationType, Citizen } from '../../../models';
import { CardComponent, TableComponent, TableColumn, ButtonComponent, ModalComponent, InputComponent, SelectComponent, SelectOption } from '../../../shared/components';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    TableComponent,
    ButtonComponent,
    ModalComponent,
    InputComponent,
    SelectComponent
  ],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent implements OnInit {
  educationRecords = signal<EducationRecord[]>([]);
  citizens = signal<Citizen[]>([]);
  showModal = signal(false);
  editingRecord = signal<EducationRecord | null>(null);

  formData: {
    citizenId: string;
    institutionName: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    hasDeferment: boolean;
    documentNumber: string;
    documentDate: string;
    notes: string;
  } = {
    citizenId: '',
    institutionName: '',
    startDate: '',
    endDate: '',
    isActive: true,
    hasDeferment: true,
    documentNumber: '',
    documentDate: '',
    notes: ''
  };

  columns: TableColumn[] = [
    { key: 'citizenName', label: 'Гражданин', sortable: true },
    { key: 'institutionName', label: 'Учебное заведение', sortable: true },
    { key: 'startDate', label: 'Начало обучения', sortable: true },
    { key: 'endDate', label: 'Окончание', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  constructor(private citizenService: CitizenService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.citizens.set(this.citizenService.getCitizens()());
    const allRecords = this.citizenService.getEducationRecords();
    this.educationRecords.set(allRecords.filter(r => r.educationType === EducationType.SCHOOL));
  }

  getCitizenOptions(): SelectOption[] {
    return this.citizens().map(c => ({
      value: c.id,
      label: `${c.lastName} ${c.firstName} ${c.middleName || ''}`.trim()
    }));
  }

  getCitizenName(citizenId: string): string {
    const citizen = this.citizens().find(c => c.id === citizenId);
    return citizen ? `${citizen.lastName} ${citizen.firstName} ${citizen.middleName || ''}`.trim() : '';
  }

  openAddModal(): void {
    this.editingRecord.set(null);
    this.formData = {
      citizenId: '',
      institutionName: '',
      startDate: '',
      endDate: '',
      isActive: true,
      hasDeferment: true,
      documentNumber: '',
      documentDate: '',
      notes: ''
    };
    this.showModal.set(true);
  }

  openEditModal(record: EducationRecord): void {
    this.editingRecord.set(record);
    this.formData = {
      citizenId: record.citizenId,
      institutionName: record.institutionName,
      startDate: record.startDate ? new Date(record.startDate).toISOString().split('T')[0] : '',
      endDate: record.endDate ? new Date(record.endDate).toISOString().split('T')[0] : '',
      isActive: record.isActive,
      hasDeferment: record.hasDeferment,
      documentNumber: record.documentNumber || '',
      documentDate: record.documentDate ? new Date(record.documentDate).toISOString().split('T')[0] : '',
      notes: record.notes || ''
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingRecord.set(null);
  }

  saveRecord(): void {
    const data = this.formData;
    const recordData: Omit<EducationRecord, 'id'> = {
      citizenId: data.citizenId,
      educationType: EducationType.SCHOOL,
      institutionName: data.institutionName,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      isActive: data.isActive,
      hasDeferment: data.hasDeferment,
      documentNumber: data.documentNumber || undefined,
      documentDate: data.documentDate ? new Date(data.documentDate) : undefined,
      notes: data.notes || undefined
    };

    if (this.editingRecord()) {
      this.citizenService.updateEducationRecord(this.editingRecord()!.id, recordData);
    } else {
      this.citizenService.createEducationRecord(recordData);
      
      // Обновляем статус гражданина на "Школьник" если это начало обучения
      if (data.isActive && !data.endDate) {
        // В реальном приложении здесь будет обновление статуса
      }
    }

    this.loadData();
    this.closeModal();
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ru-RU');
  }

  graduateStudent(record: EducationRecord): void {
    if (confirm('Зафиксировать выпуск из школы?')) {
      this.citizenService.updateEducationRecord(record.id, {
        isActive: false,
        endDate: new Date()
      });
      this.loadData();
    }
  }
}

