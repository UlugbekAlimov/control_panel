import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components';

export interface CitizenMiniCardData {
  id: string;
  fullName: string;
  birthDate: string;
  status: 'DOPRIZYVNIK';
}

@Component({
  selector: 'app-citizen-mini-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './citizen-mini-card.component.html',
  styleUrl: './citizen-mini-card.component.css'
})
export class CitizenMiniCardComponent {
  @Input() citizen: CitizenMiniCardData | null = null;
}

