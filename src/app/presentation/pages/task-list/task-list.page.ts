import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { Task } from '../../../domain/models/task.model';
import { TaskCardComponent } from '../../molecules/task-card/task-card.component';
import { UiButtonComponent } from '../../atoms/ui-button/ui-button.component';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../../domain/services/task.service';
import { UserFilterComponent } from '../../molecules/user-filter/user-filter.component';
import { User } from '../../../domain/models/user.model';
import { UserService } from '../../../domain/services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, UiButtonComponent, RouterModule, UserFilterComponent],
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly userService = inject(UserService);
  private readonly tasksSignal = signal<Task[]>([]);
  readonly usersSignal = signal<User[]>([]);
  readonly selectedUserId = signal<number | null>(null);

  tasks = computed(() => this.tasksSignal());
  users = computed(() => this.usersSignal());

  constructor() {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe(users => {
        const activeUsers = users.filter(u => u.status === 'ACTIVE');
        this.usersSignal.set(activeUsers);
        if (activeUsers.length > 0) {
          const firstUserId = activeUsers[0].user_id;
          this.selectedUserId.set(firstUserId);
          this.loadTasks(firstUserId);
        }
      });
  }

  loadTasks(userId: number) {
    this.taskService.getTasks(userId).subscribe(res => {
      this.tasksSignal.set(res);
    });
  }

  onUserSelected(userId: number) {
    this.selectedUserId.set(userId);
    this.loadTasks(userId);
  }

  onComplete(taskId: string) {
    const userId = this.selectedUserId();
    if (!userId) return;

    this.taskService.completeTask(taskId).subscribe({
      next: () => this.loadTasks(userId),
    });
  }
} 