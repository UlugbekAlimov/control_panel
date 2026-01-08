import { Routes } from '@angular/router';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { CitizensComponent } from './features/admin/citizens/citizens.component';
import { CitizenDetailComponent } from './features/admin/citizen-detail/citizen-detail.component';
import { SchoolComponent } from './features/admin/school/school.component';
import { UniversityComponent } from './features/admin/university/university.component';
import { ReportsComponent } from './features/admin/reports/reports.component';
import { EducationRegistryComponent } from './features/admin/education-registry/education-registry.component';
import { DefermentReviewComponent } from './features/admin/deferment-review/deferment-review.component';
import { ExpulsionNotificationsComponent } from './features/admin/expulsion-notifications/expulsion-notifications.component';
import { OrganizationsComponent } from './features/admin/organizations/organizations.component';
import { UsersComponent } from './features/admin/users/users.component';
import { AdminAuditComponent } from './features/admin/audit/admin-audit.component';
import { AdminSettingsComponent } from './features/admin/settings/admin-settings.component';
import { LoginComponent } from './features/auth/login/login.component';
import { StudentComponent } from './features/student/student.component';
import { StudentDashboardComponent } from './features/student/dashboard/student-dashboard.component';
import { StudentProfileComponent } from './features/student/profile/student-profile.component';
import { StudentEducationComponent } from './features/student/education/student-education.component';
import { StudentDocumentsComponent } from './features/student/documents/student-documents.component';
import { StudentRequestsComponent } from './features/student/requests/student-requests.component';
import { StudentNotificationsComponent } from './features/student/notifications/student-notifications.component';
import { StudentSettingsComponent } from './features/student/settings/student-settings.component';
import { TeacherComponent } from './features/teacher/teacher.component';
import { TeacherDashboardComponent } from './features/teacher/dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from './features/teacher/profile/teacher-profile.component';
import { TeacherRegistryComponent } from './features/teacher/registry/teacher-registry.component';
import { TeacherSchoolComponent } from './features/teacher/school/teacher-school.component';
import { TeacherUniversityComponent } from './features/teacher/university/teacher-university.component';
import { TeacherDocumentsComponent } from './features/teacher/documents/teacher-documents.component';
import { TeacherRequestsComponent } from './features/teacher/requests/teacher-requests.component';
import { TeacherNotificationsComponent } from './features/teacher/notifications/teacher-notifications.component';
import { TeacherAuditComponent } from './features/teacher/audit/teacher-audit.component';
import { TeacherReportsComponent } from './features/teacher/reports/teacher-reports.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/student',
    component: LoginComponent,
    data: { role: 'student' }
  },
  {
    path: 'login/admin',
    component: LoginComponent,
    data: { role: 'admin' }
  },
  {
    path: 'login/teacher',
    component: LoginComponent,
    data: { role: 'teacher' }
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'citizens',
        component: CitizensComponent
      },
      {
        path: 'citizens/:id',
        component: CitizenDetailComponent
      },
      {
        path: 'education-registry',
        component: EducationRegistryComponent
      },
      {
        path: 'deferment-review',
        component: DefermentReviewComponent
      },
      {
        path: 'expulsions',
        component: ExpulsionNotificationsComponent
      },
      {
        path: 'school',
        component: SchoolComponent
      },
      {
        path: 'university',
        component: UniversityComponent
      },
      {
        path: 'organizations',
        component: OrganizationsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'audit',
        component: AdminAuditComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'settings',
        component: AdminSettingsComponent
      }
    ]
  },
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: StudentDashboardComponent
      },
      {
        path: 'profile',
        component: StudentProfileComponent
      },
      {
        path: 'education',
        component: StudentEducationComponent
      },
      {
        path: 'documents',
        component: StudentDocumentsComponent
      },
      {
        path: 'requests',
        component: StudentRequestsComponent
      },
      {
        path: 'notifications',
        component: StudentNotificationsComponent
      },
      {
        path: 'settings',
        component: StudentSettingsComponent
      }
    ]
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: TeacherDashboardComponent
      },
      {
        path: 'profile',
        component: TeacherProfileComponent
      },
      {
        path: 'registry',
        component: TeacherRegistryComponent
      },
      {
        path: 'school',
        component: TeacherSchoolComponent
      },
      {
        path: 'university',
        component: TeacherUniversityComponent
      },
      {
        path: 'documents',
        component: TeacherDocumentsComponent
      },
      {
        path: 'requests',
        component: TeacherRequestsComponent
      },
      {
        path: 'notifications',
        component: TeacherNotificationsComponent
      },
      {
        path: 'audit',
        component: TeacherAuditComponent
      },
      {
        path: 'reports',
        component: TeacherReportsComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
