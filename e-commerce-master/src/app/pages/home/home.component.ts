import { Component } from '@angular/core';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Testimonial {
  name: string;
  comment: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredServices: Service[] = [
    {
      id: 1,
      name: 'Haircut & Styling',
      description: 'Professional haircut and styling by expert stylists',
      price: '$30',
      image: 'assets/images/service-1.jpg'
    },
    {
      id: 2,
      name: 'Hair Coloring',
      description: 'Full hair coloring service with premium products',
      price: '$120',
      image: 'assets/images/service-2.jpg'
    },
    {
      id: 3,
      name: 'Beard Trim',
      description: 'Professional beard trimming and shaping',
      price: '$25',
      image: 'assets/images/service-3.jpg'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'John Doe',
      comment: 'Best salon experience ever! The staff is professional and the results exceeded my expectations.',
      date: 'March 15, 2024',
      image: 'assets/images/testimonial-1.jpg'
    },
    {
      name: 'Jane Smith',
      comment: 'Love the home service option! The stylist was punctual and did an amazing job.',
      date: 'March 10, 2024',
      image: 'assets/images/testimonial-2.jpg'
    },
    {
      name: 'Mike Johnson',
      comment: 'Great attention to detail and very friendly staff. Will definitely come back!',
      date: 'March 5, 2024',
      image: 'assets/images/testimonial-3.jpg'
    }
  ];
}
