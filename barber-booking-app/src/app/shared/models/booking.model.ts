// src/app/shared/models/booking.model.ts
export interface Booking {
    id: number;
    userId: number;
    barberId: number;
    serviceId: number;
    shopId: number;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export interface BookingRequest {
    barberId: number;
    serviceId: number;
    shopId: number;
    date: string;
    time: string;
}