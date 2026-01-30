import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, InputComponent, ButtonComponent, ModalComponent } from '../../../shared/components';
import { CitizenReadCardComponent, CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';
import { PassportCreateEditComponent } from '../passport-create-edit/passport-create-edit.component';
import { AddressCreateEditComponent } from '../address-create-edit/address-create-edit.component';
import { MilOfficeAssignmentCreateEditComponent } from '../mil-office-assignment-create-edit/mil-office-assignment-create-edit.component';

interface CitizenSearchResult {
  id: string;
  iin: string;
  fullName: string;
  birthDate: string;
  status: 'ACTIVE' | 'DECEASED' | 'REMOVED';
  photoId: string | null;
}

@Component({
  selector: 'app-citizen-search',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, InputComponent, ButtonComponent, CitizenReadCardComponent, ModalComponent, PassportCreateEditComponent, AddressCreateEditComponent, MilOfficeAssignmentCreateEditComponent],
  templateUrl: './citizen-search.component.html',
  styleUrl: './citizen-search.component.css'
})
export class CitizenSearchComponent {
  showPassportModal = false;
  showAddressModal = false;
  showMilOfficeModal = false;
  filters = {
    citizenId: '',
    iin: '',
    fullName: '',
    birthDate: ''
  };

  selectedCitizen = signal<CitizenReadCardData | null>(null);

  columns: TableColumn[] = [
    { key: 'id', label: 'Citizen ID', sortable: true },
    { key: 'iin', label: 'ИИН', sortable: true },
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'birthDate', label: 'Дата рождения', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  results: CitizenSearchResult[] = [
    { id: 'CIT-771102', iin: '800101300123', fullName: 'Иванов Петр Павлович', birthDate: '01.01.1980', status: 'ACTIVE', photoId: 'PHOTO-771102' },
    { id: 'CIT-552901', iin: '900305400987', fullName: 'Соколова Марина Андреевна', birthDate: '05.03.1990', status: 'ACTIVE', photoId: null },
    { id: 'CIT-330115', iin: '670912500456', fullName: 'Поляков Сергей Николаевич', birthDate: '12.09.1967', status: 'REMOVED', photoId: 'PHOTO-330115' }
  ];

  get filteredResults(): CitizenSearchResult[] {
    const byId = this.filters.citizenId.toLowerCase();
    const byIin = this.filters.iin.toLowerCase();
    const byName = this.filters.fullName.toLowerCase();
    const byDate = this.filters.birthDate ? this.formatDate(this.filters.birthDate) : '';

    return this.results.filter(item => {
      const matchesId = !byId || item.id.toLowerCase().includes(byId);
      const matchesIin = !byIin || item.iin.toLowerCase().includes(byIin);
      const matchesName = !byName || item.fullName.toLowerCase().includes(byName);
      const matchesDate = !byDate || item.birthDate === byDate;
      return matchesId && matchesIin && matchesName && matchesDate;
    });
  }

  selectCitizen(item: CitizenSearchResult): void {
    this.selectedCitizen.set({
      id: item.id,
      iin: item.iin,
      fullName: item.fullName,
      birthDate: item.birthDate,
      status: item.status,
      photoId: item.photoId
    });
  }

  openPassportFor(item: CitizenSearchResult): void {
    this.selectCitizen(item);
    this.openPassport();
  }

  openAddressFor(item: CitizenSearchResult): void {
    this.selectCitizen(item);
    this.openAddress();
  }

  openMilOfficeFor(item: CitizenSearchResult): void {
    this.selectCitizen(item);
    this.openMilOffice();
  }

  clearSelection(): void {
    this.selectedCitizen.set(null);
  }

  openPassport(): void {
    this.showPassportModal = true;
  }

  openAddress(): void {
    this.showAddressModal = true;
  }

  openMilOffice(): void {
    this.showMilOfficeModal = true;
  }

  closePassport(): void {
    this.showPassportModal = false;
  }

  closeAddress(): void {
    this.showAddressModal = false;
  }

  closeMilOffice(): void {
    this.showMilOfficeModal = false;
  }

  private formatDate(value: string): string {
    const [year, month, day] = value.split('-');
    if (!year || !month || !day) return value;
    return `${day}.${month}.${year}`;
  }
}
