import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'shops',
    loadComponent: () => import('./features/shops/shops-list/shops-list.component').then(m => m.ShopsListComponent)
  },
  {
    path: 'shops/:id',
    loadComponent: () => import('./features/shops/shop-detail/shop-detail.component').then(m => m.ShopDetailComponent)
  },
  {
    path: 'barbers',
    loadComponent: () => import('./features/barbers/barbers-list/barbers-list.component').then(m => m.BarbersListComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-list/services-list.component').then(m => m.ServicesListComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
