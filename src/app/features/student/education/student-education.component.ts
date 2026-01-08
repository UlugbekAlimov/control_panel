import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent, InputComponent, SelectComponent, SelectOption } from '../../../shared/components';

type VerificationStatus = 'confirmed' | 'pending' | 'rejected';

interface EducationEntry {
  id: string;
  level: string;
  form: string;
  institution: string;
  startDate: string;
  endDate: string;
  status: VerificationStatus;
}

@Component({
  selector: 'app-student-education',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, InputComponent, SelectComponent],
  templateUrl: './student-education.component.html',
  styleUrl: './student-education.component.css'
})
export class StudentEducationComponent {
  formData = {
    level: 'ВУЗ',
    form: 'Очная',
    institution: '',
    startDate: '',
    endDate: ''
  };

  entries: EducationEntry[] = [
    {
      id: 'ed1',
      level: 'ВУЗ',
      form: 'Очная',
      institution: 'МГТУ им. Баумана',
      startDate: '2023-09-01',
      endDate: '2027-06-30',
      status: 'confirmed'
    }
  ];

  levelOptions: SelectOption[] = [
    { value: 'Школа', label: 'Школа' },
    { value: 'Колледж', label: 'Колледж' },
    { value: 'ВУЗ', label: 'ВУЗ' },
    { value: 'За границей', label: 'За границей' }
  ];

  formOptions: SelectOption[] = [
    { value: 'Очная', label: 'Очная' },
    { value: 'Заочная', label: 'Заочная' },
    { value: 'Дистанционная', label: 'Дистанционная (фосилави)' }
  ];

  statusLabels: Record<VerificationStatus, string> = {
    confirmed: 'Подтверждено',
    pending: 'На проверке',
    rejected: 'Отклонено'
  };

  get defermentIndicator(): boolean {
    return this.formData.form === 'Очная';
  }

  submit(): void {
    const data = this.formData;
    if (!data.institution || !data.startDate) {
      return;
    }

    this.entries = [
      {
        id: Date.now().toString(),
        level: data.level,
        form: data.form,
        institution: data.institution,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'pending'
      },
      ...this.entries
    ];
  }
}
