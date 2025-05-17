import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from './models/shop.model';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = 'api/shops';
  constructor(private http: HttpClient) {}
  getShops(): Observable<Shop[]> { return this.http.get<Shop[]>(this.apiUrl); }
  getShop(id: number): Observable<Shop> { return this.http.get<Shop>(`${this.apiUrl}/${id}`); }
}
