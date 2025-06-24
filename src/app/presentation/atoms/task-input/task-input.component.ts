import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'task-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>{{ label }}</mat-label>
        <input matInput [formControlName]="controlName" [type]="type" />
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
export class TaskInputComponent implements OnInit {
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input() type: string = 'text';

  parentFormGroup!: FormGroup;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.parentFormGroup = this.controlContainer.control as FormGroup;
  }
} 