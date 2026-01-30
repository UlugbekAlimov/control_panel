import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'Нет данных';
  @Input() rowTemplate?: TemplateRef<any>;
  @Input() actionsTemplate?: TemplateRef<any>;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: TableColumn): string {
    if (this.sortColumn !== column.key) {
      return '↕️';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}


