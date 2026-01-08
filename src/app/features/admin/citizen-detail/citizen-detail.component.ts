import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CitizenService } from '../../../services/citizen.service';
import { Citizen, CitizenStatus, DefermentRecord, EducationRecord, EducationType, FitnessCategory } from '../../../models';
import { CardComponent, ButtonComponent } from '../../../shared/components';

@Component({
  selector: 'app-citizen-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './citizen-detail.component.html',
  styleUrl: './citizen-detail.component.css'
})
export class CitizenDetailComponent implements OnInit {
  citizen = signal<Citizen | null>(null);
  educationRecords = signal<EducationRecord[]>([]);
  defermentRecords = signal<DefermentRecord[]>([]);

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

  educationTypeLabels: Record<EducationType, string> = {
    [EducationType.SCHOOL]: 'Школа',
    [EducationType.UNIVERSITY]: 'ВУЗ',
    [EducationType.COLLEGE]: 'Колледж',
    [EducationType.ABROAD]: 'За границей'
  };

  fitnessCategoryLabels: Record<FitnessCategory, string> = {
    [FitnessCategory.FIT]: 'Годен',
    [FitnessCategory.FIT_WITH_LIMITATIONS]: 'Годен с ограничениями',
    [FitnessCategory.TEMP_UNFIT]: 'Временно не годен',
    [FitnessCategory.UNFIT]: 'Не годен'
  };

  constructor(
    private citizenService: CitizenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    const citizen = this.citizenService.getCitizenById(id) || null;
    this.citizen.set(citizen);
    this.educationRecords.set(this.citizenService.getEducationRecords(id));
    this.defermentRecords.set(this.citizenService.getDefermentRecords(id));
  }

  goBack(): void {
    this.router.navigate(['/admin/citizens']);
  }

  getStatusLabel(status: CitizenStatus): string {
    return this.statusLabels[status] || status;
  }

  getEducationTypeLabel(type: EducationType): string {
    return this.educationTypeLabels[type] || type;
  }

  getFitnessLabel(category?: FitnessCategory): string {
    return category ? this.fitnessCategoryLabels[category] : 'Не указано';
  }

  getActiveDeferment(): DefermentRecord | undefined {
    return this.defermentRecords().find(record => record.isActive);
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ru-RU');
  }
}
