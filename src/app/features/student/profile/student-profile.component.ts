import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent, InputComponent } from '../../../shared/components';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, InputComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
  profile = {
    fullName: 'Иванов Иван Иванович',
    birthDate: '2005-05-15',
    documentId: 'ID-000245',
    phone: '+7 (900) 000-00-00',
    email: 'student@example.com',
    address: 'г. Москва, ул. Ленина, д. 1'
  };

  history = [
    { id: 'h1', field: 'Адрес', date: '02.01.2026', user: 'Администратор' },
    { id: 'h2', field: 'Телефон', date: '15.12.2025', user: 'Студент' }
  ];
}
