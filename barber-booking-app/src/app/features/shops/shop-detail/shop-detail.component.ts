import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Shop } from '../../../shared/models/shop.model';
import { Barber } from '../../../shared/models/barber.model';
import { Service } from '../../../shared/models/service.model';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  shop: Shop | undefined;
  selectedTab: 'info' | 'barbers' | 'services' = 'info';
  barbers: Barber[] = [
    { id: 1, name: 'John Smith', avatarUrl: 'assets/images/barber1.jpg', offersHomeVisit: false, serviceIds: [1, 2] },
    { id: 2, name: 'Sarah Johnson', avatarUrl: 'assets/images/barber2.jpg', offersHomeVisit: true, serviceIds: [1, 2, 3] }
  ];
  services: Service[] = [
    { id: 1, title: 'Classic Haircut', durationMinutes: 30, price: 25 },
    { id: 2, title: 'Beard Trim', durationMinutes: 20, price: 15 },
    { id: 3, title: 'Hot Towel Shave', durationMinutes: 45, price: 35 }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const shopId = Number(this.route.snapshot.paramMap.get('id'));
    // In a real app, we would fetch this from a service
    this.shop = {
      id: shopId,
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
    };
  }

  getShopBarbers(): Barber[] {
    return this.barbers.filter(barber => this.shop?.barberIds.includes(barber.id));
  }

  getShopServices(): Service[] {
    return this.services.filter(service => this.shop?.serviceIds.includes(service.id));
  }

  isOpen(): boolean {
    if (!this.shop) return false;
    
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const hours = this.shop.openingHours[day];
    if (hours.open === 'Closed') return false;
    
    return time >= hours.open && time <= hours.close;
  }

  getServicesByBarber(barber: Barber): Service[] {
    return this.services.filter(service => barber.serviceIds.includes(service.id));
  }
}
