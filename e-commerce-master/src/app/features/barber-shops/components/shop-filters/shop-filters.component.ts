import { Component, EventEmitter, Output } from '@angular/core';

export interface ShopFilters {
    city?: string;
    rating?: number;
    services?: string[];
}

@Component({
    selector: 'app-shop-filters',
    templateUrl: './shop-filters.component.html',
    styleUrls: ['./shop-filters.component.scss']
})
export class ShopFiltersComponent {
    @Output() filtersChanged = new EventEmitter<ShopFilters>();
    
    filters: ShopFilters = {};

    updateFilters(): void {
        this.filtersChanged.emit(this.filters);
    }

    clearFilters(): void {
        this.filters = {};
        this.filtersChanged.emit(this.filters);
    }
} 