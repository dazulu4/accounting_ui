import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../domain/models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="p-4 relative">
      @if (task.status !== 'COMPLETED') {
        <mat-icon
          (click)="complete.emit(task.task_id)"
          class="absolute top-2 right-2 text-green-600 cursor-pointer"
          aria-label="Complete task"
          title="Complete task"
        >
          done
        </mat-icon>
      }

      <h3 class="text-xl font-bold">{{ task.title }}</h3>
      <p class="text-sm">{{ task.description }}</p>
      <small class="italic text-gray-500 block mt-2">Status: {{ task.status }}</small>
    </mat-card>
  `
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() complete = new EventEmitter<string>();
} 