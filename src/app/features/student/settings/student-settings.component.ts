import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent, InputComponent, SelectComponent, SelectOption } from '../../../shared/components';

@Component({
  selector: 'app-student-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, InputComponent, SelectComponent],
  templateUrl: './student-settings.component.html',
  styleUrl: './student-settings.component.css'
})
export class StudentSettingsComponent {
  language = 'ru';
  emailNotify = true;
  smsNotify = false;
  appNotify = true;

  languageOptions: SelectOption[] = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' }
  ];
}
