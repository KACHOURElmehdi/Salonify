import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Barber } from '../../../shared/models/barber.model';

@Component({
  selector: 'app-barbers-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="barbers-container">
      <h2>Our Barbers</h2>
      <div class="barbers-grid">
        <div *ngFor="let barber of barbers" class="barber-card">
          <div class="barber-image">
            <img [src]="barber.avatarUrl || 'assets/images/default-barber.jpg'" [alt]="barber.name">
          </div>
          <div class="barber-info">
            <h3>{{ barber.name }}</h3>
            <div class="barber-features">
              <span *ngIf="barber.offersHomeVisit" class="feature-tag">
                Home Visits Available
              </span>
            </div>
            <a [routerLink]="['/booking']" [queryParams]="{barber: barber.id}" class="book-button">
              Book with {{ barber.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .barbers-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .barbers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .barber-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .barber-image {
      height: 250px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .barber-info {
      padding: 1.5rem;

      h3 {
        margin: 0 0 1rem;
        color: #333;
      }

      .barber-features {
        margin-bottom: 1rem;

        .feature-tag {
          background-color: #f5f5f5;
          color: #666;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
        }
      }

      .book-button {
        display: block;
        width: 100%;
        padding: 0.8rem;
        background-color: #333;
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #444;
        }
      }
    }
  `]
})
export class BarbersListComponent {
  barbers: Barber[] = [
    { id: 1, name: 'John Smith', avatarUrl: 'assets/images/barber1.jpg', offersHomeVisit: false, serviceIds: [1, 2] },
    { id: 2, name: 'Sarah Johnson', avatarUrl: 'assets/images/barber2.jpg', offersHomeVisit: true, serviceIds: [1, 2, 3] },
    { id: 3, name: 'Mike Wilson', avatarUrl: 'assets/images/barber3.jpg', offersHomeVisit: false, serviceIds: [1, 3] }
  ];
} 