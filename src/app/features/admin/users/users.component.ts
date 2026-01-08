import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, ButtonComponent, ModalComponent, InputComponent, SelectComponent, SelectOption } from '../../../shared/components';

type UserRole = 'admin' | 'teacher' | 'student';

interface UserItem {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'active' | 'blocked';
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, ButtonComponent, ModalComponent, InputComponent, SelectComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  showModal = false;
  editing: UserItem | null = null;

  formData = {
    fullName: '',
    email: '',
    role: 'teacher' as UserRole
  };

  roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Администратор' },
    { value: 'teacher', label: 'Преподаватель' },
    { value: 'student', label: 'Студент' }
  ];

  columns: TableColumn[] = [
    { key: 'fullName', label: 'ФИО', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Роль', sortable: true },
    { key: 'status', label: 'Статус', sortable: true }
  ];

  users: UserItem[] = [
    { id: 'u1', fullName: 'Админ Системы', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: 'u2', fullName: 'Смирнов А.И.', email: 'teacher@example.com', role: 'teacher', status: 'active' },
    { id: 'u3', fullName: 'Иванов И.И.', email: 'student@example.com', role: 'student', status: 'blocked' }
  ];

  openAdd(): void {
    this.editing = null;
    this.formData = { fullName: '', email: '', role: 'teacher' };
    this.showModal = true;
  }

  openEdit(user: UserItem): void {
    this.editing = user;
    this.formData = { fullName: user.fullName, email: user.email, role: user.role };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editing = null;
  }

  save(): void {
    if (this.editing) {
      this.users = this.users.map(user =>
        user.id === this.editing!.id ? { ...user, ...this.formData } : user
      );
    } else {
      this.users = [
        { id: Date.now().toString(), ...this.formData, status: 'active' },
        ...this.users
      ];
    }
    this.closeModal();
  }

  toggleStatus(user: UserItem): void {
    this.users = this.users.map(item =>
      item.id === user.id ? { ...item, status: item.status === 'active' ? 'blocked' : 'active' } : item
    );
  }

  getRoleLabel(role: UserRole): string {
    const labels: Record<UserRole, string> = {
      admin: 'Администратор',
      teacher: 'Преподаватель',
      student: 'Студент'
    };
    return labels[role] || role;
  }
}
