import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Components
import { BarberShopsGridComponent } from './barber-shops-grid/barber-shops-grid.component';
import { BarberShopDetailComponent } from './barber-shop-detail/barber-shop-detail.component';
import { BarberCardComponent } from './components/barber-card/barber-card.component';
import { ShopFiltersComponent } from './components/shop-filters/shop-filters.component';

@NgModule({
    declarations: [
        BarberShopsGridComponent,
        BarberShopDetailComponent,
        BarberCardComponent,
        ShopFiltersComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        BarberShopsGridComponent,
        BarberShopDetailComponent
    ]
})
export class BarberShopsModule { } 