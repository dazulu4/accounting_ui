import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

export abstract class TaskService {
  abstract getTasks(userId: number): Observable<Task[]>;
  abstract createTask(task: Task): Observable<Task>;
  abstract completeTask(taskId: string): Observable<void>;
} 