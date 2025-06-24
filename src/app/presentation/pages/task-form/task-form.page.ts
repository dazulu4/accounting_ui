import { Component, signal } from '@angular/core';
import { Task, TaskStatus } from '../../../domain/models/task.model';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskInputComponent } from '../../atoms/task-input/task-input.component';
import { TaskSelectStatusComponent } from '../../atoms/task-select-status/task-select-status.component';
import { UiButtonComponent } from '../../atoms/ui-button/ui-button.component';
import { Router } from '@angular/router';
import { UserSelectorComponent } from '../../molecules/user-selector/user-selector.component';
import { TaskService } from '../../../domain/services/task.service';
import { APP_CONSTANTS } from '../../../core/config/constants';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TaskInputComponent,
    TaskSelectStatusComponent,
    UiButtonComponent,
    UserSelectorComponent,
  ],
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss']
})
export class TaskFormPage {
  isSubmitting = signal(false);
  form;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      user_id: [null, Validators.required],
      status: [TaskStatus.NEW, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting.set(true);

    const rawValue = this.form.getRawValue();

    const newTask: Task = {
      task_id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      title: rawValue.title || '',
      description: rawValue.description || '',
      user_id: rawValue.user_id || APP_CONSTANTS.DUMMY_USER_ID,
      status: rawValue.status || TaskStatus.NEW
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.isSubmitting.set(false),
    });
  }
} 