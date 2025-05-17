import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="booking-container">
      <h2>Book Your Appointment</h2>
      
      <div class="booking-form" *ngIf="!bookingConfirmed">
        <div *ngIf="errorMessage" class="error-banner">
          {{ errorMessage }}
          <button class="secondary" routerLink="/shops">Select a Shop</button>
        </div>

        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" *ngIf="!errorMessage">
          <div class="form-group">
            <label for="date">Select Date</label>
            <input 
              type="date" 
              id="date" 
              formControlName="date"
              [min]="minDate"
              (change)="onDateChange()"
            >
            <div class="error" *ngIf="bookingForm.get('date')?.errors?.['required'] && bookingForm.get('date')?.touched">
              Date is required
            </div>
          </div>

          <div class="form-group" *ngIf="availableTimeSlots.length > 0">
            <label for="time">Select Time</label>
            <select id="time" formControlName="time">
              <option value="">Choose a time slot</option>
              <option *ngFor="let slot of availableTimeSlots" [value]="slot">
                {{ slot }}
              </option>
            </select>
            <div class="error" *ngIf="bookingForm.get('time')?.errors?.['required'] && bookingForm.get('time')?.touched">
              Time slot is required
            </div>
          </div>

          <div class="error" *ngIf="submitError">
            {{ submitError }}
          </div>

          <button type="submit" [disabled]="bookingForm.invalid || isLoading">
            {{ isLoading ? 'Booking...' : 'Book Appointment' }}
          </button>
        </form>
      </div>

      <div class="booking-confirmation" *ngIf="bookingConfirmed">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Booking Confirmed!</h3>
        <p>Your appointment has been successfully booked.</p>
        <div class="booking-details">
          <p><strong>Date:</strong> {{ formatDate(bookingForm.get('date')?.value) }}</p>
          <p><strong>Time:</strong> {{ bookingForm.get('time')?.value }}</p>
        </div>
        <button class="secondary" (click)="router.navigate(['/'])">
          Return to Home
        </button>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .error-banner {
      background-color: #fff3cd;
      color: #856404;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      text-align: center;

      button {
        margin-top: 1rem;
      }
    }

    .booking-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #666;
      }

      input, select {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: #333;
        }
      }
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #444;
      }

      &:disabled {
        background-color: #666;
        cursor: not-allowed;
      }

      &.secondary {
        background-color: #666;
        margin-top: 1rem;

        &:hover {
          background-color: #777;
        }
      }
    }

    .booking-confirmation {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;

      .success-icon {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 1rem;
      }

      h3 {
        color: #333;
        margin-bottom: 1rem;
      }

      .booking-details {
        margin: 1.5rem 0;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 4px;

        p {
          margin: 0.5rem 0;
          color: #666;

          strong {
            color: #333;
          }
        }
      }
    }
  `]
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  submitError = '';
  bookingConfirmed = false;
  availableTimeSlots: string[] = [];
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({
      barberId: ['', Validators.required],
      serviceId: ['', Validators.required],
      shopId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    // Get query parameters (barber, service, shop)
    this.route.queryParams.subscribe(params => {
      if (params['barberId'] && params['serviceId'] && params['shopId']) {
        // Pre-fill hidden form fields
        this.bookingForm.patchValue({
          barberId: params['barberId'],
          serviceId: params['serviceId'],
          shopId: params['shopId']
        });
      } else {
        this.errorMessage = 'Please select a shop, barber, and service before booking.';
      }
    });
  }

  onDateChange() {
    const date = this.bookingForm.get('date')?.value;
    const barberId = this.bookingForm.get('barberId')?.value;

    if (date && barberId) {
      this.isLoading = true;
      this.bookingService.getAvailableTimeSlots(barberId, date).subscribe({
        next: (slots) => {
          this.availableTimeSlots = slots;
          if (slots.length === 0) {
            this.submitError = 'No available time slots for this date. Please select another date.';
          } else {
            this.submitError = '';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.submitError = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.isLoading = true;
      this.submitError = '';

      this.bookingService.createBooking(this.bookingForm.value).subscribe({
        next: () => {
          this.bookingConfirmed = true;
          this.isLoading = false;
        },
        error: (error) => {
          this.submitError = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
} 