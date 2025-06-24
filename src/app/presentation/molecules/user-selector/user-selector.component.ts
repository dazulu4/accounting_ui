import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../../domain/models/user.model';
import { UserService } from '../../../domain/services/user.service';

@Component({
  selector: 'user-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Select User</mat-label>
        <mat-select [formControlName]="controlName">
          @if (loading()) {
            <mat-option disabled>Loading users...</mat-option>
          } @else {
            @for (user of users(); track user.user_id) {
              <mat-option [value]="user.user_id">{{ user.name }}</mat-option>
            }
          }
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      mat-form-field {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class UserSelectorComponent implements OnInit {
  @Input({ required: true }) controlName!: string;

  private readonly userService = inject(UserService);
  users = signal<User[]>([]);
  loading = signal(true);
  parentFormGroup!: FormGroup;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.parentFormGroup = this.controlContainer.control as FormGroup;
    this.userService
      .getUsers()
      .pipe(
        tap((res: User[]) => {
          const activeUsers = res.filter((user) => user.status === 'ACTIVE');
          this.users.set(activeUsers);
          this.loading.set(false);
        }),
        catchError((err) => {
          console.error('Failed to load users:', err);
          this.loading.set(false);
          return of([]);
        })
      )
      .subscribe();
  }
} 