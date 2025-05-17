// src/app/shared/models/shop.model.ts
export interface Shop {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    imageUrl?: string;
    rating: number;
    openingHours: {
        [key: string]: { open: string; close: string; }
    };
    barberIds: number[];
    serviceIds: number[];
    features: string[];
}
  