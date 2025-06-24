import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserService } from '../../domain/services/user.service';

@Injectable({ providedIn: 'root' })
export class UserApiService extends UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/users';

  override getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
} 