import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BarberShop } from '../models/barber-shop.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BarberShopService {
    private apiUrl = `${environment.apiUrl}/barber-shops`;

    constructor(private http: HttpClient) {}

    getBarberShops(): Observable<BarberShop[]> {
        return this.http.get<BarberShop[]>(this.apiUrl);
    }

    getBarberShopById(id: string): Observable<BarberShop> {
        return this.http.get<BarberShop>(`${this.apiUrl}/${id}`);
    }

    searchBarberShops(query: string): Observable<BarberShop[]> {
        return this.http.get<BarberShop[]>(`${this.apiUrl}/search`, {
            params: { query }
        });
    }

    filterBarberShops(filters: {
        city?: string;
        rating?: number;
        services?: string[];
    }): Observable<BarberShop[]> {
        return this.http.get<BarberShop[]>(`${this.apiUrl}/filter`, {
            params: { ...filters }
        });
    }
} 