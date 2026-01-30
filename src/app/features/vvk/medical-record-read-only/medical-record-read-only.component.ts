import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TableComponent, TableColumn } from '../../../shared/components';

interface MedicalVisitItem {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  notes: string;
}

@Component({
  selector: 'app-medical-record-read-only',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent],
  templateUrl: './medical-record-read-only.component.html',
  styleUrl: './medical-record-read-only.component.css'
})
export class MedicalRecordReadOnlyComponent {
  @Input() citizenName: string = '—';

  columns: TableColumn[] = [
    { key: 'date', label: 'Дата', sortable: true },
    { key: 'doctor', label: 'Врач', sortable: true },
    { key: 'diagnosis', label: 'Диагноз', sortable: true },
    { key: 'notes', label: 'Примечание', sortable: true }
  ];

  visits: MedicalVisitItem[] = [
    { id: 'm-101', date: '24.01.2026', doctor: 'Сидорова А.В.', diagnosis: 'ОРВИ', notes: 'Амбулаторно' },
    { id: 'm-097', date: '12.01.2026', doctor: 'Рахимова Н.С.', diagnosis: 'Жалобы на боли', notes: 'Назначено обследование' }
  ];
}
