import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent, SelectOption, ButtonComponent } from '../../../shared/components';
import { type CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';
@Component({
  selector: 'app-mil-office-assignment-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputComponent, SelectComponent, ButtonComponent],
  templateUrl: './mil-office-assignment-create-edit.component.html',
  styleUrl: './mil-office-assignment-create-edit.component.css'
})
export class MilOfficeAssignmentCreateEditComponent {
  @Input() set citizenData(value: CitizenReadCardData | null) {
    if (value) {
      this.citizen.set(value);
    }
  }

  citizen = signal<CitizenReadCardData | null>({
    id: 'CIT-771102',
    iin: '800101300123',
    fullName: 'Иванов Петр Павлович',
    birthDate: '01.01.1980',
    status: 'ACTIVE',
    photoId: 'PHOTO-771102'
  });

  assignment = {
    district: 'Алмалинский',
    office: 'Военкомат №2, г. Алматы',
    assignmentDate: '2022-08-15',
    reason: 'По месту регистрации'
  };

  districtOptions: SelectOption[] = [
    { value: 'Алмалинский', label: 'Алмалинский' },
    { value: 'Бостандыкский', label: 'Бостандыкский' },
    { value: 'Медеуский', label: 'Медеуский' },
    { value: 'Турксибский', label: 'Турксибский' }
  ];

  status = signal<'SAVED' | 'UPDATED' | null>(null);
  lastActionAt = signal<string | null>(null);

  save(): void {
    this.status.set('SAVED');
    this.lastActionAt.set(this.getNowLabel());
  }

  update(): void {
    this.status.set('UPDATED');
    this.lastActionAt.set(this.getNowLabel());
  }

  private getNowLabel(): string {
    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  }
}


