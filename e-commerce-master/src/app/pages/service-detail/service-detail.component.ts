import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: number;
  image: string;
  homeService: boolean;
  features: string[];
}

interface Stylist {
  id: number;
  name: string;
  specialization: string;
  image: string;
}

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  service: Service | null = null;
  bookingForm: FormGroup;
  isLoading = false;
  minDate: string;
  availableTimeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  availableStylists: Stylist[] = [
    {
      id: 1,
      name: 'John Smith',
      specialization: 'Hair Stylist',
      image: 'assets/images/stylist-1.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      specialization: 'Color Specialist',
      image: 'assets/images/stylist-2.jpg'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      specialization: 'Barber',
      image: 'assets/images/stylist-3.jpg'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.bookingForm = this.fb.group({
      location: ['salon', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      stylist: ['', Validators.required],
      address: [''],
      notes: ['']
    });

    // Add conditional validation for address
    this.bookingForm.get('location')?.valueChanges.subscribe(location => {
      const addressControl = this.bookingForm.get('address');
      if (location === 'home') {
        addressControl?.setValidators(Validators.required);
      } else {
        addressControl?.clearValidators();
      }
      addressControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    // Simulate fetching service details
    this.service = {
      id: 1,
      name: 'Classic Haircut',
      category: 'Haircut',
      description: 'Professional haircut service including consultation, shampooing, cutting, and styling.',
      price: '$30',
      duration: 45,
      image: 'assets/images/service-1.jpg',
      homeService: true,
      features: [
        'Professional consultation',
        'Shampooing and conditioning',
        'Precision cutting',
        'Styling with premium products',
        'Hair care advice'
      ]
    };
  }

  get date() {
    return this.bookingForm.get('date');
  }

  get time() {
    return this.bookingForm.get('time');
  }

  get stylist() {
    return this.bookingForm.get('stylist');
  }

  get address() {
    return this.bookingForm.get('address');
  }

  async onSubmit() {
    if (this.bookingForm.valid) {
      this.isLoading = true;
      try {
        // TODO: Implement actual booking logic
        console.log('Booking details:', {
          service: this.service,
          ...this.bookingForm.value
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        this.router.navigate(['/booking-confirmation']);
      } catch (error) {
        console.error('Booking error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.keys(this.bookingForm.controls).forEach(key => {
        const control = this.bookingForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
