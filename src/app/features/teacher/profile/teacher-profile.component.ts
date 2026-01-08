import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent, InputComponent, SelectComponent, SelectOption, ModalComponent } from '../../../shared/components';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, InputComponent, SelectComponent, ModalComponent],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
  profile = {
    fullName: 'Смирнов Алексей Игоревич',
    institutionType: 'ВУЗ',
    institutionName: 'Политехнический колледж №1',
    position: 'Куратор группы'
  };

  institutionTypes: SelectOption[] = [
    { value: 'Школа', label: 'Школа' },
    { value: 'Колледж', label: 'Колледж' },
    { value: 'ВУЗ', label: 'ВУЗ' }
  ];

  showModal = false;

  openEditModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
