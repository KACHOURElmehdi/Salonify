// src/app/shared/models/barber.model.ts
export interface Barber {
    id: number;
    name: string;
    avatarUrl?: string;
    offersHomeVisit: boolean;
    serviceIds: number[];
}