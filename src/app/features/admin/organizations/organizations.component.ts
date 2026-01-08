import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, TableComponent, TableColumn, ButtonComponent, ModalComponent, InputComponent, SelectComponent, SelectOption } from '../../../shared/components';

interface Organization {
  id: string;
  name: string;
  type: string;
  city: string;
}

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TableComponent, ButtonComponent, ModalComponent, InputComponent, SelectComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent {
  showModal = false;
  editing: Organization | null = null;

  formData = {
    name: '',
    type: 'ВУЗ',
    city: ''
  };

  typeOptions: SelectOption[] = [
    { value: 'Школа', label: 'Школа' },
    { value: 'Колледж', label: 'Колледж' },
    { value: 'ВУЗ', label: 'ВУЗ' }
  ];

  columns: TableColumn[] = [
    { key: 'name', label: 'Учреждение', sortable: true },
    { key: 'type', label: 'Тип', sortable: true },
    { key: 'city', label: 'Город', sortable: true }
  ];

  organizations: Organization[] = [
    { id: 'o1', name: 'МГТУ им. Баумана', type: 'ВУЗ', city: 'Москва' },
    { id: 'o2', name: 'Колледж №4', type: 'Колледж', city: 'Санкт-Петербург' }
  ];

  openAdd(): void {
    this.editing = null;
    this.formData = { name: '', type: 'ВУЗ', city: '' };
    this.showModal = true;
  }

  openEdit(org: Organization): void {
    this.editing = org;
    this.formData = { name: org.name, type: org.type, city: org.city };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editing = null;
  }

  save(): void {
    if (this.editing) {
      this.organizations = this.organizations.map(org =>
        org.id === this.editing!.id ? { ...org, ...this.formData } : org
      );
    } else {
      this.organizations = [
        { id: Date.now().toString(), ...this.formData },
        ...this.organizations
      ];
    }
    this.closeModal();
  }
}
