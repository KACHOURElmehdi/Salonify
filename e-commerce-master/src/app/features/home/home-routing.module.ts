import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'salon', pathMatch: 'full' },
  { path: 'salon', loadChildren: () => import('./pages/storefront/storefront.module').then(m => m.StorefrontModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }