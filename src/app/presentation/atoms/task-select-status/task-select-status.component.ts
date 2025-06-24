import { Component, Input, OnInit } from '@angular/core';
import { TaskStatus } from '../../../domain/models/task.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'task-select-status',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Status</mat-label>
        <mat-select [formControlName]="controlName">
          @for (status of statuses; track status) {
            <mat-option [value]="status">{{ status }}</mat-option>
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
export class TaskSelectStatusComponent implements OnInit {
  @Input({ required: true }) controlName!: string;
  statuses = Object.values(TaskStatus);

  parentFormGroup!: FormGroup;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.parentFormGroup = this.controlContainer.control as FormGroup;
  }
} 