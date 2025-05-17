import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Barber {
  id: number;
  name: string;
  experience: string;
  speciality: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private apiUrl = 'YOUR_API_URL/barbers'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getBarber(id: number): Observable<Barber> {
    return this.http.get<Barber>(`${this.apiUrl}/${id}`);
  }
} 