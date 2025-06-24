import { Routes } from '@angular/router';
import { TaskListPage } from './presentation/pages/task-list/task-list.page';
import { TaskFormPage } from './presentation/pages/task-form/task-form.page';

export const routes: Routes = [
  { path: '', component: TaskListPage },
  { path: 'new', component: TaskFormPage },
];
