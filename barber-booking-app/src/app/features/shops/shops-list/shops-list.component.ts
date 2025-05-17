// shops-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Shop } from '../../../shared/models/shop.model';

@Component({
  selector: 'app-shops-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {
  shops: Shop[] = [
    {
      id: 1,
      name: 'Downtown Cuts',
      description: 'Classic barbering in town center',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      email: 'info@downtowncuts.com',
      imageUrl: 'assets/images/shop1.jpg',
      rating: 4.8,
      openingHours: {
        'Monday': { open: '09:00', close: '18:00' },
        'Tuesday': { open: '09:00', close: '18:00' },
        'Wednesday': { open: '09:00', close: '18:00' },
        'Thursday': { open: '09:00', close: '20:00' },
        'Friday': { open: '09:00', close: '20:00' },
        'Saturday': { open: '10:00', close: '16:00' },
        'Sunday': { open: 'Closed', close: 'Closed' }
      },
      barberIds: [1, 2],
      serviceIds: [1, 2, 3],
      features: ['Free WiFi', 'Air Conditioning', 'Coffee Service']
    },
    {
      id: 2,
      name: 'Modern Barbers',
      description: 'Contemporary styles for modern gentlemen',
      address: '456 Oak Ave, Uptown',
      phone: '(555) 234-5678',
      email: 'hello@modernbarbers.com',
      imageUrl: 'assets/images/shop2.jpg',
      rating: 4.6,
      openingHours: {
        'Monday': { open: '10:00', close: '19:00' },
        'Tuesday': { open: '10:00', close: '19:00' },
        'Wednesday': { open: '10:00', close: '19:00' },
        'Thursday': { open: '10:00', close: '21:00' },
        'Friday': { open: '10:00', close: '21:00' },
        'Saturday': { open: '09:00', close: '17:00' },
        'Sunday': { open: '11:00', close: '16:00' }
      },
      barberIds: [3, 4],
      serviceIds: [1, 2, 4],
      features: ['Online Booking', 'Card Payment', 'Product Shop']
    }
  ];

  filteredShops: Shop[] = [];
  searchTerm: string = '';
  sortBy: 'rating' | 'name' = 'rating';

  ngOnInit(): void {
    this.filteredShops = [...this.shops];
  }

  filterShops(): void {
    this.filteredShops = this.shops.filter(shop => 
      shop.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      shop.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortShops();
  }

  sortShops(): void {
    this.filteredShops.sort((a, b) => {
      if (this.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return a.name.localeCompare(b.name);
    });
  }

  isOpen(shop: Shop): boolean {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const hours = shop.openingHours[day];
    if (hours.open === 'Closed') return false;
    
    return time >= hours.open && time <= hours.close;
  }
}
