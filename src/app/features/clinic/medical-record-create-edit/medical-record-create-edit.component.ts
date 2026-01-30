import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, InputComponent, ButtonComponent } from '../../../shared/components';
import { type CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';
interface MedicalRecord {
  id: string;
  clinic: string;
  createdAt: string;
  notes: string;
}

@Component({
  selector: 'app-medical-record-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputComponent, ButtonComponent],
  templateUrl: './medical-record-create-edit.component.html',
  styleUrl: './medical-record-create-edit.component.css'
})
export class MedicalRecordCreateEditComponent {
  @Input() citizen: CitizenReadCardData | null = null;
  @Input() embedded: boolean = false;
  @Output() closed = new EventEmitter<void>();

  record = signal<MedicalRecord>({
    id: 'mr-101',
    clinic: 'Поликлиника №1',
    createdAt: '2024-02-12',
    notes: ''
  });

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

  close(): void {
    if (this.embedded) {
      this.closed.emit();
    }
  }

  private getNowLabel(): string {
    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  }
}


