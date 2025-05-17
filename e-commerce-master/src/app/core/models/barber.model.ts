export interface Barber {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    bio: string;
    experience: number; // years of experience
    specialties: string[];
    portfolio: {
        image: string;
        description: string;
    }[];
    availability: {
        [key: string]: { // day of week
            slots: {
                start: string;
                end: string;
            }[];
        };
    };
    rating: {
        average: number;
        count: number;
    };
    reviews: {
        userId: string;
        rating: number;
        comment: string;
        date: Date;
    }[];
    barberShopId: string; // reference to the shop they work at
    services: string[]; // references to service IDs they can perform
    createdAt: Date;
    updatedAt: Date;
} 