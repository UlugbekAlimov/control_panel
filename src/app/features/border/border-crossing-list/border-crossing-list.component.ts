import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeoutError, catchError, finalize, forkJoin, of, timeout } from 'rxjs';
import { BorderCrossingService } from '../../../services/border-crossing.service';
import {
  ButtonComponent,
  CardComponent,
  InputComponent,
  ModalComponent,
  SelectComponent,
  SelectOption,
  TableComponent,
  type TableColumn,
} from '../../../shared/components';
import { BorderCrossingCreateEditComponent } from '../border-crossing-create-edit/border-crossing-create-edit.component';

interface BorderCrossingItem {
  id: number;
  peopleId: number;
  peopleName: string;
  userId: number;
  userName: string;
  departureDate: string;
  returnDate: string;
  outsideBorder: 'Да' | 'Нет';
  country: string;
  description: string;
}

@Component({
  selector: 'app-border-crossing-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    TableComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ModalComponent,
    BorderCrossingCreateEditComponent,
  ],
  templateUrl: './border-crossing-list.component.html',
  styleUrl: './border-crossing-list.component.css',
})
export class BorderCrossingListComponent implements OnInit {
  filters = {
    id: '',
    outsideBorder: 'all',
  };

  outsideBorderOptions: SelectOption[] = [
    { value: 'all', label: 'Все' },
    { value: 'yes', label: 'Да' },
    { value: 'no', label: 'Нет' },
  ];

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'peopleName', label: 'Гражданин', sortable: true },
    { key: 'userName', label: 'Пользователь', sortable: true },
    { key: 'departureDate', label: 'Выезд', sortable: true },
    { key: 'returnDate', label: 'Возврат', sortable: true },
    { key: 'outsideBorder', label: 'Вне границы', sortable: true },
    { key: 'country', label: 'Страна', sortable: true },
    { key: 'description', label: 'Описание', sortable: false },
  ];

  crossings: BorderCrossingItem[] = [];
  isLoading = false;
  isDeleting = false;
  errorMessage = '';

  showModal = false;
  showDeleteModal = false;
  selectedRecordId: string | null = null;
  deletingRecord: BorderCrossingItem | null = null;

  constructor(
    private readonly borderCrossingService: BorderCrossingService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCrossings();
  }

  get filteredCrossings(): BorderCrossingItem[] {
    const idFilter = this.filters.id.trim();
    const outsideBorderFilter = this.filters.outsideBorder || 'all';

    return this.crossings.filter((item) => {
      const matchesId = !idFilter || item.id.toString().includes(idFilter);
      const matchesOutsideBorder =
        outsideBorderFilter === 'all' ||
        (outsideBorderFilter === 'yes' && item.outsideBorder === 'Да') ||
        (outsideBorderFilter === 'no' && item.outsideBorder === 'Нет');

      return matchesId && matchesOutsideBorder;
    });
  }

  loadCrossings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      crossings: this.borderCrossingService.getAll().pipe(timeout(15000)),
      people: this.borderCrossingService.getPeople().pipe(catchError(() => of([]))),
      users: this.borderCrossingService.getUsers().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ crossings, people, users }) => {
        const peopleMap = new Map<number, string>(
          people.map((item) => [item.id, item.fullName?.trim() || `ID ${item.id}`]),
        );
        const usersMap = new Map<number, string>(
          users.map((item) => [item.id, item.fullName?.trim() || `ID ${item.id}`]),
        );

        this.crossings = crossings.map((item) => ({
          id: item.id,
          peopleId: item.peopleId,
          peopleName: peopleMap.get(item.peopleId) ?? `ID ${item.peopleId}`,
          userId: item.userId,
          userName: usersMap.get(item.userId) ?? `ID ${item.userId}`,
          departureDate: this.formatDateTime(item.departureDate),
          returnDate: item.returnDate ? this.formatDateTime(item.returnDate) : '-',
          outsideBorder: item.outsideBorder ? 'Да' : 'Нет',
          country: item.country ?? '-',
          description: item.description ?? '-',
        }));

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        this.isLoading = false;
        if (error instanceof TimeoutError) {
          this.errorMessage = 'Превышено время ожидания ответа API.';
        } else {
          this.errorMessage = 'Не удалось загрузить данные пересечений.';
        }
        this.crossings = [];
        this.cdr.detectChanges();
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  openCreate(): void {
    this.selectedRecordId = null;
    this.showModal = true;
  }

  openEdit(item: BorderCrossingItem): void {
    this.selectedRecordId = item.id.toString();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRecordId = null;
  }

  openDelete(item: BorderCrossingItem): void {
    this.deletingRecord = item;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingRecord = null;
  }

  confirmDelete(): void {
    if (!this.deletingRecord || this.isDeleting) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.borderCrossingService
      .delete(this.deletingRecord.id)
      .pipe(
        finalize(() => {
          this.isDeleting = false;
        }),
      )
      .subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadCrossings();
        },
        error: () => {
          this.errorMessage = 'Не удалось удалить запись.';
        },
      });
  }

  onRecordSaved(): void {
    this.closeModal();
    this.loadCrossings();
  }

  private formatDateTime(dateValue: string | null | undefined): string {
    if (!dateValue) {
      return '-';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return '-';
    }
    return date.toLocaleString('ru-RU');
  }
}
