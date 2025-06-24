export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface User {
  user_id: number;
  name: string;
  status: UserStatus;
} 