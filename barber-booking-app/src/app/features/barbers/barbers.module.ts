import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BarbersComponent } from './barbers.component';


const routes: Routes = [
  { path: '', component: BarbersComponent }
];

@NgModule({
  declarations: [
    BarbersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BarbersModule { }
