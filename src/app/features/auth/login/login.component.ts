import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent, InputComponent, SelectComponent, SelectOption, CardComponent } from '../../../shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, SelectComponent, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  role = 'student';
  roleLocked = false;

  roleOptions: SelectOption[] = [
    { value: 'student', label: 'Студент' },
    { value: 'teacher', label: 'Преподаватель' },
    { value: 'admin', label: 'Администратор' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const roleFromRoute = this.route.snapshot.data['role'] as string | undefined;
    if (roleFromRoute) {
      this.role = roleFromRoute;
      this.roleLocked = true;
    }
  }

  submit(): void {
    if (this.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
      return;
    }
    if (this.role === 'teacher') {
      this.router.navigate(['/teacher/dashboard']);
      return;
    }
    this.router.navigate(['/student/dashboard']);
  }
}
