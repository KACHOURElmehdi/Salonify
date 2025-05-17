export interface BarberShop {
    id: string;
    name: string;
    description: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    images: {
        main: string;
        gallery: string[];
    };
    rating: {
        average: number;
        count: number;
    };
    openingHours: {
        [key: string]: {
            open: string;
            close: string;
        };
    };
    services: {
        id: string;
        name: string;
        price: number;
        duration: number; // in minutes
        description: string;
    }[];
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
} 