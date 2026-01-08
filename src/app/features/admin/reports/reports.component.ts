import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Citizen, CitizenStatus } from '../../../models';
import { CitizenService } from '../../../services/citizen.service';
import { CardComponent, TableComponent, TableColumn, ButtonComponent } from '../../../shared/components';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent, ButtonComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  citizens = signal<Citizen[]>([]);

  columns: TableColumn[] = [
    { key: 'name', label: 'Гражданин', sortable: true },
    { key: 'birthDate', label: 'Дата рождения', sortable: true },
    { key: 'age', label: 'Возраст', sortable: true },
    { key: 'status', label: 'Статус', sortable: true },
    { key: 'deferment', label: 'Отсрочка', sortable: false },
    { key: 'registrationAddress', label: 'Адрес регистрации', sortable: false }
  ];

  statusLabels: Record<CitizenStatus, string> = {
    [CitizenStatus.PRE_CONSCRIPT]: 'Допризывник',
    [CitizenStatus.CONSCRIPT]: 'Призывник',
    [CitizenStatus.STUDENT]: 'Студент',
    [CitizenStatus.FAMILY_CIRCUMSTANCES]: 'Семейные обстоятельства',
    [CitizenStatus.UNFIT_HEALTH]: 'Не годен по здоровью',
    [CitizenStatus.ABROAD]: 'За границей',
    [CitizenStatus.IN_SERVICE]: 'На службе',
    [CitizenStatus.DEMOBILIZED]: 'Дембель'
  };

  constructor(private citizenService: CitizenService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.citizens.set(this.citizenService.getCitizens()());
  }

  getDraftList(): Citizen[] {
    return this.citizens().filter(citizen =>
      citizen.status === CitizenStatus.CONSCRIPT &&
      !this.citizenService.hasActiveDeferment(citizen.id)
    );
  }

  getEvaders(): Citizen[] {
    return this.citizens().filter(citizen =>
      citizen.status === CitizenStatus.CONSCRIPT &&
      this.getAge(citizen.birthDate) >= 18 &&
      !this.citizenService.hasActiveDeferment(citizen.id)
    );
  }

  getFullName(citizen: Citizen): string {
    return `${citizen.lastName} ${citizen.firstName} ${citizen.middleName || ''}`.trim();
  }

  hasActiveDeferment(citizenId: string): boolean {
    return this.citizenService.hasActiveDeferment(citizenId);
  }

  getStatusLabel(status: CitizenStatus): string {
    return this.statusLabels[status] || status;
  }

  getAge(birthDate: Date | string): number {
    const date = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    const diff = Date.now() - date.getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ru-RU');
  }
}
