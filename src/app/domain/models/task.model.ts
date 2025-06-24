export enum TaskStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
  user_id: number;
  status: TaskStatus;
  created_at: string;
  completed_at?: string;
}