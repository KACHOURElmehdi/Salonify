import { Component, OnInit } from '@angular/core';
import { BarberShop } from '../../../core/models/barber-shop.model';
import { BarberShopService } from '../../../core/services/barber-shop.service';

@Component({
    selector: 'app-barber-shops-grid',
    templateUrl: './barber-shops-grid.component.html',
    styleUrls: ['./barber-shops-grid.component.scss']
})
export class BarberShopsGridComponent implements OnInit {
    barberShops: BarberShop[] = [];
    loading = true;
    error: string | null = null;

    constructor(private barberShopService: BarberShopService) {}

    ngOnInit(): void {
        this.loadBarberShops();
    }

    private loadBarberShops(): void {
        this.barberShopService.getBarberShops().subscribe({
            next: (shops) => {
                this.barberShops = shops;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load barber shops';
                this.loading = false;
                console.error('Error loading barber shops:', error);
            }
        });
    }
} 