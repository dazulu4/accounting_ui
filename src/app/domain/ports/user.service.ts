import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export abstract class UserService {
  abstract getUsers(): Observable<User[]>;
} 