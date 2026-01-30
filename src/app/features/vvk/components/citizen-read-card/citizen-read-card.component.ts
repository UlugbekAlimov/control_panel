import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components';

export interface CitizenReadCardData {
  id: string;
  iin: string;
  fullName: string;
  birthDate: string;
  status: 'ACTIVE' | 'UNFIT_MEDICAL' | 'DECEASED' | 'REMOVED';
}

@Component({
  selector: 'app-citizen-read-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './citizen-read-card.component.html',
  styleUrl: './citizen-read-card.component.css'
})
export class CitizenReadCardComponent {
  @Input() citizen: CitizenReadCardData | null = null;
}
