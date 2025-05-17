import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <h1>Welcome to Barber Booking</h1>
      <p>Find the best barbers in your area and book your appointment today!</p>
      
      <div class="cta-buttons">
        <a routerLink="/shops" class="cta-button">Find a Shop</a>
        <a routerLink="/booking" class="cta-button primary">Book Now</a>
      </div>

      <div class="features">
        <div class="feature">
          <h3>Professional Barbers</h3>
          <p>Experienced and skilled barbers at your service</p>
        </div>
        <div class="feature">
          <h3>Easy Booking</h3>
          <p>Book your appointment in just a few clicks</p>
        </div>
        <div class="feature">
          <h3>Quality Service</h3>
          <p>Get the style you want with our premium service</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 3rem 1rem;
      max-width: 1200px;
      margin: 0 auto;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 2rem;
      }
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;

      .cta-button {
        padding: 1rem 2rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.3s ease;
        
        &:not(.primary) {
          background-color: #f5f5f5;
          color: #333;

          &:hover {
            background-color: #e5e5e5;
          }
        }

        &.primary {
          background-color: #333;
          color: white;

          &:hover {
            background-color: #444;
          }
        }
      }
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;

      .feature {
        padding: 2rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        h3 {
          margin-bottom: 1rem;
          color: #333;
        }

        p {
          color: #666;
          margin-bottom: 0;
        }
      }
    }
  `]
})
export class HomeComponent {} 