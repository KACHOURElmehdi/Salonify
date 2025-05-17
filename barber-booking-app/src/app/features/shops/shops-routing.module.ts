import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';

const routes: Routes = [
  { path: '', component: ShopsListComponent },
  { path: ':id', component: ShopDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule { }
