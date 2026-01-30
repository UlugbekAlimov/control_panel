import { Component, OnChanges, SimpleChanges, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent, SelectOption, ButtonComponent } from '../../../shared/components';
import { type CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';
type FitnessCategory = 'A' | 'B' | 'C' | 'D_UNFIT';

interface VvkResultRecord {
  id: string;
  examDate: string;
  category: FitnessCategory;
  notes: string;
}

@Component({
  selector: 'app-vvk-result-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputComponent, SelectComponent, ButtonComponent],
  templateUrl: './vvk-result-create-edit.component.html',
  styleUrl: './vvk-result-create-edit.component.css'
})
export class VvkResultCreateEditComponent implements OnChanges {
  @Input() citizen: CitizenReadCardData | null = null;
  @Input() recordId: string | null = null;

  status = signal<'SAVED' | 'UPDATED' | null>(null);
  lastActionAt = signal<string | null>(null);

  record: VvkResultRecord = {
    id: 'vvk-101',
    examDate: '2026-01-30',
    category: 'B',
    notes: 'Годен с незначительными ограничениями'
  };

  categoryOptions: SelectOption[] = [
    { value: 'A', label: 'A — годен' },
    { value: 'B', label: 'B — ограниченно годен' },
    { value: 'C', label: 'C — годен с ограничениями' },
    { value: 'D_UNFIT', label: 'D — не годен' }
  ];

  private recordById: Record<string, VvkResultRecord> = {
    'vvk-101': {
      id: 'vvk-101',
      examDate: '2026-01-30',
      category: 'B',
      notes: 'Годен с незначительными ограничениями'
    },
    'vvk-098': {
      id: 'vvk-098',
      examDate: '2026-01-28',
      category: 'D_UNFIT',
      notes: 'Категория D по результатам обследования'
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recordId']) {
      this.loadRecord(this.recordId);
    }
    if (changes['citizen']) {
      this.applyCitizenStatus();
    }
  }

  save(): void {
    this.status.set('SAVED');
    this.lastActionAt.set(this.getNowLabel());
    this.applyCitizenStatus();
  }

  update(): void {
    this.status.set('UPDATED');
    this.lastActionAt.set(this.getNowLabel());
    this.applyCitizenStatus();
  }

  private loadRecord(id: string | null): void {
    if (id && this.recordById[id]) {
      this.record = { ...this.recordById[id] };
      return;
    }
    this.record = {
      id: 'new',
      examDate: '',
      category: 'B',
      notes: ''
    };
  }

  private applyCitizenStatus(): void {
    if (!this.citizen) return;
    if (this.record.category === 'D_UNFIT') {
      this.citizen = { ...this.citizen, status: 'UNFIT_MEDICAL' };
    }
  }

  private getNowLabel(): string {
    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  }
}


