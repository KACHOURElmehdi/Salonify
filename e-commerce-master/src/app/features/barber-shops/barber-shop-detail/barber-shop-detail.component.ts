import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BarberShop } from '../../../core/models/barber-shop.model';
import { Barber } from '../../../core/models/barber.model';
import { BarberShopService } from '../../../core/services/barber-shop.service';

@Component({
    selector: 'app-barber-shop-detail',
    templateUrl: './barber-shop-detail.component.html',
    styleUrls: ['./barber-shop-detail.component.scss']
})
export class BarberShopDetailComponent implements OnInit {
    shop$: Observable<BarberShop>;
    loading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private barberShopService: BarberShopService
    ) {
        this.shop$ = this.route.params.pipe(
            switchMap(params => this.barberShopService.getBarberShopById(params['id']))
        );
    }

    ngOnInit(): void {
        this.shop$.subscribe({
            next: () => this.loading = false,
            error: (error) => {
                this.error = 'Failed to load barber shop details';
                this.loading = false;
                console.error('Error loading barber shop:', error);
            }
        });
    }

    getBarberAvailability(barber: Barber): string {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const availability = barber.availability[today];
        if (!availability || !availability.slots.length) {
            return 'Not available today';
        }
        return `Available today: ${availability.slots.map(slot => 
            `${slot.start}-${slot.end}`).join(', ')}`;
    }
} 