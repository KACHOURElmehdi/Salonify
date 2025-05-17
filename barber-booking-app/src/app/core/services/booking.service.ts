import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Booking, BookingRequest } from '../../shared/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor() {}

  createBooking(request: BookingRequest): Observable<Booking> {
    // Mock API call - replace with real API integration
    const newBooking: Booking = {
      id: Math.floor(Math.random() * 1000),
      userId: 1, // Get from AuthService in real implementation
      ...request,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.bookings.push(newBooking);
    return of(newBooking).pipe(delay(500));
  }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings).pipe(delay(500));
  }

  getBookingById(id: number): Observable<Booking> {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) {
      return throwError(() => new Error('Booking not found'));
    }
    return of(booking).pipe(delay(500));
  }

  getUserBookings(userId: number): Observable<Booking[]> {
    const userBookings = this.bookings.filter(b => b.userId === userId);
    return of(userBookings).pipe(delay(500));
  }

  cancelBooking(id: number): Observable<Booking> {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) {
      return throwError(() => new Error('Booking not found'));
    }
    if (booking.status === 'completed') {
      return throwError(() => new Error('Cannot cancel a completed booking'));
    }
    booking.status = 'cancelled';
    booking.updatedAt = new Date().toISOString();
    return of(booking).pipe(delay(500));
  }

  // Helper method to check if a time slot is available
  isTimeSlotAvailable(barberId: number, date: string, time: string): Observable<boolean> {
    const isBooked = this.bookings.some(b => 
      b.barberId === barberId && 
      b.date === date && 
      b.time === time &&
      b.status !== 'cancelled'
    );
    return of(!isBooked).pipe(delay(500));
  }

  // Get available time slots for a specific date and barber
  getAvailableTimeSlots(barberId: number, date: string): Observable<string[]> {
    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    const bookedSlots = this.bookings
      .filter(b => 
        b.barberId === barberId && 
        b.date === date &&
        b.status !== 'cancelled'
      )
      .map(b => b.time);

    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
    return of(availableSlots).pipe(delay(500));
  }
} 