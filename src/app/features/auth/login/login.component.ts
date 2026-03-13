import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService, LoginApiResponse } from '../../../services/auth.service';
import {
  ButtonComponent,
  CardComponent,
  InputComponent,
  SelectComponent,
  SelectOption
} from '../../../shared/components';

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
  routeRole: string | null = null;
  isGeneralLoginRoute = false;
  isSubmitting = false;
  submitError = '';

  roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Админ' },
    { value: 'maternity', label: 'Роддом' },
    { value: 'zags', label: 'ЗАГС' },
    { value: 'jek', label: 'ЖЭК' },
    { value: 'passport', label: 'Паспортный стол' },
    { value: 'school', label: 'Школа' },
    { value: 'university', label: 'ВУЗ/Колледж' },
    { value: 'clinic', label: 'Медцентр/Поликлиника' },
    { value: 'vvk', label: 'Военнокомат' },
    { value: 'border', label: 'Пограничная служба' },
    { value: 'superadmin', label: 'Суперадмин' }
  ];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isGeneralLoginRoute = this.router.url.split('?')[0] === '/login';

    const roleFromRoute = this.route.snapshot.data['role'] as string | undefined;
    if (roleFromRoute) {
      this.routeRole = roleFromRoute;
      this.role = roleFromRoute;
      this.roleLocked = true;
    }
  }

  submit(): void {
    const username = this.email.trim();
    if (!username || !this.password.trim()) {
      this.submitError = 'Введите логин и пароль.';
      return;
    }

    this.submitError = '';
    this.isSubmitting = true;

    this.authService.login({ username, password: this.password }).pipe(
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: ({ token, raw }) => {
        if (raw.success === false) {
          this.submitError = this.getApiMessage(raw) ?? 'Неверный логин или пароль.';
          return;
        }

        if (!token) {
          this.submitError = 'Токен не получен от сервера.';
          return;
        }

        this.authService.saveToken(token);
        this.applyRoleAfterLogin(username);
        this.navigateByRole();
      },
      error: (error: HttpErrorResponse) => {
        this.submitError = this.resolveHttpError(error);
      }
    });
  }

  canSelectRole(): boolean {
    return !this.roleLocked && this.isGeneralLoginRoute;
  }

  private applyRoleAfterLogin(username: string): void {
    if (this.routeRole) {
      this.role = this.routeRole;
      return;
    }

    if (this.role !== 'student') {
      return;
    }

    const detectedRole = this.detectRoleByUsername(username);
    if (detectedRole) {
      this.role = detectedRole;
    }
  }

  private detectRoleByUsername(username: string): string | null {
    const value = username.trim().toLowerCase();
    const roleByUsername: Record<string, string> = {
      admin: 'admin',
      doctor: 'clinic',
      borderguard: 'border',
      passportofficer: 'passport',
      zagsemployee: 'zags',
      militaryemployee: 'jek',
      educationemployee: 'school'
    };

    return roleByUsername[value] ?? null;
  }

  private getApiMessage(response: LoginApiResponse): string | null {
    const message = response['message'];
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
    return null;
  }

  private resolveHttpError(error: HttpErrorResponse): string {
    const errorPayload = error.error as Record<string, unknown> | string | null;
    if (errorPayload && typeof errorPayload === 'object') {
      const message = errorPayload['message'];
      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    if (error.status === 0) {
      return 'Сервер недоступен. Проверьте подключение.';
    }

    if (typeof errorPayload === 'string' && errorPayload.trim()) {
      return errorPayload;
    }

    return 'Ошибка авторизации. Попробуйте еще раз.';
  }

  private navigateByRole(): void {
    if (this.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
      return;
    }
    if (this.role === 'teacher') {
      this.router.navigate(['/teacher/dashboard']);
      return;
    }
    if (this.role === 'maternity') {
      this.router.navigate(['/maternity/birth-records']);
      return;
    }
    if (this.role === 'zags') {
      this.router.navigate(['/zags/acts']);
      return;
    }
    if (this.role === 'jek') {
      this.router.navigate(['/jek/registry']);
      return;
    }
    if (this.role === 'passport') {
      this.router.navigate(['/passport/registry']);
      return;
    }
    if (this.role === 'school') {
      this.router.navigate(['/school/studies']);
      return;
    }
    if (this.role === 'university') {
      this.router.navigate(['/university/studies']);
      return;
    }
    if (this.role === 'clinic') {
      this.router.navigate(['/clinic/records']);
      return;
    }
    if (this.role === 'vvk') {
      this.router.navigate(['/vvk/queue']);
      return;
    }
    if (this.role === 'border') {
      this.router.navigate(['/border/crossings']);
      return;
    }
    if (this.role === 'superadmin') {
      this.router.navigate(['/superadmin/access']);
      return;
    }
    this.router.navigate(['/student/dashboard']);
  }
}
