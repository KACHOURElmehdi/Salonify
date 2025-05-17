import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Service } from '../../../shared/models/service.model';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent {
  services: Service[] = [
    { id: 1, title: 'Classic Haircut', durationMinutes: 30, price: 25 },
    { id: 2, title: 'Beard Trim', durationMinutes: 20, price: 15 },
    { id: 3, title: 'Hot Towel Shave', durationMinutes: 45, price: 35 },
    { id: 4, title: 'Hair & Beard Combo', durationMinutes: 60, price: 45 },
    { id: 5, title: 'Kids Haircut', durationMinutes: 20, price: 20 },
    { id: 6, title: 'Hair Styling', durationMinutes: 30, price: 30 }
  ];
} 