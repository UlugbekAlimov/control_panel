import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, InputComponent, ButtonComponent, SelectComponent, SelectOption } from '../../../shared/components';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent {
  requireFullTime = true;
  certificateDays = 180;
  notificationTemplate = 'Справка истекает через {days} дней.';
  rejectionReason = 'Недостаточно документов';

  reasonOptions: SelectOption[] = [
    { value: 'Недостаточно документов', label: 'Недостаточно документов' },
    { value: 'Несоответствие формы обучения', label: 'Несоответствие формы обучения' },
    { value: 'Истек срок справки', label: 'Истек срок справки' }
  ];
}
