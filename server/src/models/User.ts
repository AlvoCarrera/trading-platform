export interface User {
  id: string;
  email: string;
  password?: string; 
  displayName: string;
  authProvider: 'local' | 'google';
  createdAt: Date;
  remaining_requests?: number;
}