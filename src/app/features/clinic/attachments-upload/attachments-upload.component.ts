import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent, InputComponent } from '../../../shared/components';

interface AttachmentItem {
  id: string;
  name: string;
  uploadedAt: string;
  size: string;
}

@Component({
  selector: 'app-attachments-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, InputComponent],
  templateUrl: './attachments-upload.component.html',
  styleUrl: './attachments-upload.component.css'
})
export class AttachmentsUploadComponent {
  description = '';

  attachments: AttachmentItem[] = [
    { id: 'a-201', name: 'Снимок МРТ.pdf', uploadedAt: '23.01.2026 14:10', size: '1.2 MB' },
    { id: 'a-198', name: 'Результаты анализов.pdf', uploadedAt: '12.01.2026 09:40', size: '320 KB' }
  ];

  upload(): void {
    this.attachments = [
      {
        id: `a-${Date.now()}`,
        name: 'Файл загружен',
        uploadedAt: new Date().toLocaleString('ru-RU'),
        size: '—'
      },
      ...this.attachments
    ];
    this.description = '';
  }

  remove(item: AttachmentItem): void {
    this.attachments = this.attachments.filter(entry => entry.id !== item.id);
  }
}
