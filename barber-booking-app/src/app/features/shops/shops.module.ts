import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { BarberProfileComponent } from '../../shared/barber-profile/barber-profile.component';

@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    SharedModule,
    ShopsListComponent,
    ShopDetailComponent,
    ServiceCardComponent,
    BarberProfileComponent
  ]
})
export class ShopsModule { }
