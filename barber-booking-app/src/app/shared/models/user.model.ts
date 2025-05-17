export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'barber' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
} 