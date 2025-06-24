import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../domain/models/user.model';

@Component({
  selector: 'user-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field appearance="fill" class="w-full sm:w-64 mb-4">
      <mat-label>Filter by user</mat-label>
      <mat-select [value]="selectedUserId" (selectionChange)="onChange($event.value)">
        @for (user of users; track user.user_id) {
          <mat-option [value]="user.user_id">{{ user.name }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    mat-form-field { margin-bottom: 1rem; }
  `]
})
export class UserFilterComponent {
  @Input() users: User[] = [];
  @Input() selectedUserId: number | null = null;
  @Output() userSelected = new EventEmitter<number>();

  onChange(userId: number) {
    this.userSelected.emit(userId);
  }
} 