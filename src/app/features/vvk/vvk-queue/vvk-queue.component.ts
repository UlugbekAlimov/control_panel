import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, ButtonComponent, ModalComponent } from '../../../shared/components';
import { CitizenReadCardComponent, CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';
import { VvkResultCreateEditComponent } from '../vvk-result-create-edit/vvk-result-create-edit.component';
import { MedicalRecordReadOnlyComponent } from '../medical-record-read-only/medical-record-read-only.component';

interface VvkQueueItem {
  id: string;
  citizenId: string;
  fullName: string;
  birthDate: string;
  status: 'WAITING' | 'IN_REVIEW' | 'DONE';
  lastExam: string | null;
  resultId?: string | null;
}

@Component({
  selector: 'app-vvk-queue',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, ButtonComponent, ModalComponent, CitizenReadCardComponent, VvkResultCreateEditComponent, MedicalRecordReadOnlyComponent],
  templateUrl: './vvk-queue.component.html',
  styleUrl: './vvk-queue.component.css'
})
export class VvkQueueComponent {
  filters = {
    fullName: '',
    citizenId: ''
  };

  columns: TableColumn[] = [
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'citizenId', label: 'Citizen ID', sortable: true },
    { key: 'birthDate', label: 'Дата рождения', sortable: true },
    { key: 'status', label: 'Статус', sortable: true },
    { key: 'lastExam', label: 'Последнее ВВК', sortable: true }
  ];

  queue: VvkQueueItem[] = [
    { id: 'q-101', citizenId: 'CIT-771102', fullName: 'Иванов Петр Павлович', birthDate: '01.01.1980', status: 'WAITING', lastExam: '15.01.2025', resultId: null },
    { id: 'q-098', citizenId: 'CIT-552901', fullName: 'Соколова Марина Андреевна', birthDate: '05.03.1990', status: 'IN_REVIEW', lastExam: null, resultId: 'vvk-098' },
    { id: 'q-095', citizenId: 'CIT-330115', fullName: 'Поляков Сергей Николаевич', birthDate: '12.09.1967', status: 'DONE', lastExam: '28.01.2026', resultId: 'vvk-101' }
  ];

  selectedCitizen = signal<CitizenReadCardData | null>(null);
  showResultModal = false;
  showMedicalModal = false;
  selectedResultId: string | null = null;

  get filteredQueue(): VvkQueueItem[] {
    const byName = this.filters.fullName.toLowerCase();
    const byId = this.filters.citizenId.toLowerCase();
    return this.queue.filter(item => {
      const matchesName = !byName || item.fullName.toLowerCase().includes(byName);
      const matchesId = !byId || item.citizenId.toLowerCase().includes(byId);
      return matchesName && matchesId;
    });
  }

  selectCitizen(item: VvkQueueItem): void {
    this.selectedCitizen.set({
      id: item.citizenId,
      iin: '800101300123',
      fullName: item.fullName,
      birthDate: item.birthDate,
      status: 'ACTIVE'
    });
  }

  openCreate(): void {
    this.selectedResultId = null;
    this.showResultModal = true;
  }

  openResult(item: VvkQueueItem): void {
    this.selectCitizen(item);
    this.selectedResultId = item.resultId ?? null;
    this.showResultModal = true;
  }

  closeResult(): void {
    this.showResultModal = false;
    this.selectedResultId = null;
  }

  openMedical(item: VvkQueueItem): void {
    this.selectCitizen(item);
    this.showMedicalModal = true;
  }

  closeMedical(): void {
    this.showMedicalModal = false;
  }

  getStatusLabel(status: VvkQueueItem['status']): string {
    const labels: Record<VvkQueueItem['status'], string> = {
      WAITING: 'Ожидает',
      IN_REVIEW: 'На рассмотрении',
      DONE: 'Завершено'
    };
    return labels[status];
  }
}
