import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, AuthResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      // In a real app, decode JWT token or make an API call to validate
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (storedUser) {
        this.currentUserSubject.next(storedUser);
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // Mock login - replace with real API call
    if (email === 'demo@example.com' && password === 'password') {
      const mockUser: User = {
        id: 1,
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        role: 'customer'
      };
      const mockResponse: AuthResponse = {
        user: mockUser,
        token: 'mock_jwt_token'
      };
      return of(mockResponse).pipe(
        delay(500), // Simulate network delay
        tap(response => this.handleAuthentication(response))
      );
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Observable<AuthResponse> {
    // Mock registration - replace with real API call
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: 'customer'
    };
    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock_jwt_token'
    };
    return of(mockResponse).pipe(
      delay(500),
      tap(response => this.handleAuthentication(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
} 