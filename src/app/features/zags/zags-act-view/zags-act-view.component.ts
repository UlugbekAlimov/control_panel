import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent, ButtonComponent } from '../../../shared/components';
import { CitizenReadCardComponent, CitizenReadCardData } from '../components/citizen-read-card/citizen-read-card.component';

interface ZagsActHistoryItem {
  date: string;
  action: string;
}

interface ZagsActDetails {
  id: string;
  actNumber: string;
  actDate: string;
  type: 'BirthCertificate' | 'Marriage' | 'Children' | 'Death';
  status: 'DRAFT' | 'REGISTERED' | 'UPDATED';
  details: Record<string, string>;
  citizen: CitizenReadCardData | null;
  history: ZagsActHistoryItem[];
}

@Component({
  selector: 'app-zags-act-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, CitizenReadCardComponent],
  templateUrl: './zags-act-view.component.html',
  styleUrl: './zags-act-view.component.css'
})
export class ZagsActViewComponent implements OnInit {
  record = signal<ZagsActDetails | null>(null);

  private records: ZagsActDetails[] = [
    {
      id: 'z-1101',
      actNumber: 'А-2026-001',
      actDate: '25.01.2026',
      type: 'BirthCertificate',
      status: 'REGISTERED',
      details: {
        'ФИО ребенка': 'Семенов Артем Андреевич',
        'Дата рождения': '25.01.2026 04:18',
        'Место рождения': 'г. Москва, Роддом №12',
        'ФИО матери': 'Семенова Ирина Викторовна',
        'ФИО отца': 'Семенов Андрей Юрьевич'
      },
      citizen: {
        id: 'CIT-2026-0104',
        iin: '260125300112',
        fullName: 'Семенов Артем Андреевич',
        birthDate: '25.01.2026',
        status: 'ACTIVE'
      },
      history: [
        { date: '25.01.2026 09:30', action: 'Акт зарегистрирован' },
        { date: '25.01.2026 08:55', action: 'Черновик создан' }
      ]
    },
    {
      id: 'z-1092',
      actNumber: 'А-2026-003',
      actDate: '23.01.2026',
      type: 'Death',
      status: 'UPDATED',
      details: {
        'ФИО': 'Иванов Петр Павлович',
        'Дата смерти': '22.01.2026',
        'Место смерти': 'г. Москва, ГКБ №5',
        'Причина': 'Естественные причины'
      },
      citizen: {
        id: 'CIT-771102',
        iin: '800101300123',
        fullName: 'Иванов Петр Павлович',
        birthDate: '01.01.1980',
        status: 'DECEASED'
      },
      history: [
        { date: '23.01.2026 14:15', action: 'Исправление данных' },
        { date: '23.01.2026 12:40', action: 'Акт зарегистрирован' }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.record.set(this.records.find(item => item.id === id) || null);
  }

  goBack(): void {
    this.router.navigate(['/zags/acts']);
  }

  getTypeLabel(type: ZagsActDetails['type']): string {
    const labels: Record<ZagsActDetails['type'], string> = {
      BirthCertificate: 'Рождение',
      Marriage: 'Брак',
      Children: 'Дети',
      Death: 'Смерть'
    };
    return labels[type];
  }

  getStatusLabel(status: ZagsActDetails['status']): string {
    const labels: Record<ZagsActDetails['status'], string> = {
      DRAFT: 'Черновик',
      REGISTERED: 'Зарегистрировано',
      UPDATED: 'Исправлено'
    };
    return labels[status];
  }
}
