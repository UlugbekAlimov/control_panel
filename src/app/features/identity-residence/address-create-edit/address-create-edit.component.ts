import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, InputComponent, ButtonComponent } from '../../../shared/components';
import { type CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';
@Component({
  selector: 'app-address-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputComponent, ButtonComponent],
  templateUrl: './address-create-edit.component.html',
  styleUrl: './address-create-edit.component.css'
})
export class AddressCreateEditComponent {
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

  address = {
    registrationAddress: 'г. Алматы, ул. Абая 10, кв. 15',
    actualAddress: 'г. Алматы, ул. Абая 10, кв. 15',
    startDate: '2021-06-15',
    endDate: ''
  };

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


