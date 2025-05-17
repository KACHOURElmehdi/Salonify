// src/app/shared/in-memory-data.service.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Shop } from './models/shop.model';
import { Barber } from './models/barber.model';
import { Service } from './models/service.model';
import { Booking } from './models/booking.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const shops: Shop[] = [
      {
          id: 1, name: 'Downtown Cuts', description: 'Classic barbering in town center', barberIds: [1, 2], serviceIds: [1, 2],
          address: '',
          phone: '',
          email: '',
          rating: 0,
          openingHours: {},
          features: []
      },
      // …add more
    ];
    const barbers: Barber[] = [
      { id: 1, name: 'Ali', offersHomeVisit: false, serviceIds: [1] },
      { id: 2, name: 'Samira', offersHomeVisit: true,  serviceIds: [1,2] },
    ];
    const services: Service[] = [
      { id: 1, title: 'Standard Shave', durationMinutes: 45, price: 300 },
      { id: 2, title: 'Haircut',       durationMinutes: 30, price: 250 },
    ];
    const bookings: Booking[] = [];
    return { shops, barbers, services, bookings };
  }
}
