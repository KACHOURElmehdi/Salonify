import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { BarberShopsGridComponent } from './features/barber-shops/barber-shops-grid/barber-shops-grid.component';
import { BarberShopDetailComponent } from './features/barber-shops/barber-shop-detail/barber-shop-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/:id', component: ServiceDetailComponent },
  { path: 'shops', component: BarberShopsGridComponent },
  { path: 'shops/:id', component: BarberShopDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
