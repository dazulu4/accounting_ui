import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../domain/models/task.model';
import { TaskService } from '../../domain/ports/task.service';

@Injectable({ providedIn: 'root' })
export class TaskApiService extends TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/tasks';

  override getTasks(user_id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${user_id}`);
  }

  override createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  override completeTask(taskId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${taskId}/complete`, {});
  }
}