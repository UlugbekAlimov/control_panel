import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent, ButtonComponent } from '../../../shared/components';
import { CitizenMiniCardComponent, CitizenMiniCardData } from '../components/citizen-mini-card/citizen-mini-card.component';

interface BirthRecordHistoryItem {
  date: string;
  action: string;
}

interface BirthRecordDetails {
  id: string;
  birthDateTime: string;
  place: string;
  sex: 'male' | 'female';
  motherFullName: string;
  fatherFullName: string;
  status: 'DRAFT' | 'SUBMITTED' | 'CANCELLED' | 'VOID';
  citizen?: CitizenMiniCardData | null;
  history: BirthRecordHistoryItem[];
}

@Component({
  selector: 'app-birth-record-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, CitizenMiniCardComponent],
  templateUrl: './birth-record-view.component.html',
  styleUrl: './birth-record-view.component.css'
})
export class BirthRecordViewComponent implements OnInit {
  record = signal<BirthRecordDetails | null>(null);

  private records: BirthRecordDetails[] = [
    {
      id: 'br-1024',
      birthDateTime: '25.01.2026 04:18',
      place: 'г. Москва, Роддом №12, отделение 2',
      sex: 'male',
      motherFullName: 'Семенова Ирина Викторовна',
      fatherFullName: 'Семенов Андрей Юрьевич',
      status: 'SUBMITTED',
      citizen: {
        id: 'CIT-2026-0104',
        fullName: 'Новорожденный (ФИО не указано)',
        birthDate: '25.01.2026 04:18',
        status: 'DOPRIZYVNIK'
      },
      history: [
        { date: '25.01.2026 05:10', action: 'Запись отправлена в центральную систему' },
        { date: '25.01.2026 04:45', action: 'Черновик создан' }
      ]
    },
    {
      id: 'br-1023',
      birthDateTime: '24.01.2026 21:05',
      place: 'г. Москва, Роддом №8, отделение 1',
      sex: 'female',
      motherFullName: 'Кузнецова Анна Сергеевна',
      fatherFullName: 'Кузнецов Дмитрий Олегович',
      status: 'DRAFT',
      citizen: null,
      history: [
        { date: '24.01.2026 21:20', action: 'Черновик создан' }
      ]
    },
    {
      id: 'br-1019',
      birthDateTime: '21.01.2026 12:40',
      place: 'г. Москва, Роддом №5, отделение 3',
      sex: 'male',
      motherFullName: 'Лазарева Марина Игоревна',
      fatherFullName: 'Лазарев Павел Ильич',
      status: 'CANCELLED',
      citizen: null,
      history: [
        { date: '21.01.2026 13:05', action: 'Отменено по регламенту' },
        { date: '21.01.2026 12:55', action: 'Черновик создан' }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.record.set(this.records.find(item => item.id === id) || null);
  }

  goBack(): void {
    this.router.navigate(['/maternity/birth-records']);
  }

  getSexLabel(sex: BirthRecordDetails['sex']): string {
    return sex === 'male' ? 'Мальчик' : 'Девочка';
  }

  getStatusLabel(status: BirthRecordDetails['status']): string {
    const labels: Record<BirthRecordDetails['status'], string> = {
      DRAFT: 'Черновик',
      SUBMITTED: 'Отправлено',
      CANCELLED: 'Отменено',
      VOID: 'Аннулировано'
    };
    return labels[status];
  }
}

