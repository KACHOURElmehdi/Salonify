import { Component, OnInit } from '@angular/core';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: number;
  image: string;
  homeService: boolean;
}

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [
    {
      id: 1,
      name: 'Classic Haircut',
      category: 'Haircut',
      description: 'Professional haircut with wash and style',
      price: '$30',
      duration: 45,
      image: 'assets/images/service-1.jpg',
      homeService: true
    },
    {
      id: 2,
      name: 'Hair Coloring',
      category: 'Color',
      description: 'Full hair coloring service with premium products',
      price: '$120',
      duration: 120,
      image: 'assets/images/service-2.jpg',
      homeService: false
    },
    {
      id: 3,
      name: 'Beard Trim',
      category: 'Grooming',
      description: 'Professional beard trimming and shaping',
      price: '$25',
      duration: 30,
      image: 'assets/images/service-3.jpg',
      homeService: true
    },
    // Add more services as needed
  ];

  filteredServices: Service[] = [];
  categories: string[] = ['Haircut', 'Color', 'Grooming', 'Styling', 'Treatment'];
  searchTerm = '';
  selectedCategory = '';
  selectedDuration = '';
  selectedLocation = '';
  isLoading = false;
  hasMoreServices = true;
  currentPage = 1;

  constructor() {
    this.filteredServices = [...this.services];
  }

  ngOnInit(): void {
    this.filterServices();
  }

  filterServices() {
    let filtered = [...this.services];

    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(service => service.category === this.selectedCategory);
    }

    // Apply duration filter
    if (this.selectedDuration) {
      const maxDuration = parseInt(this.selectedDuration);
      filtered = filtered.filter(service => service.duration <= maxDuration);
    }

    // Apply location filter
    if (this.selectedLocation) {
      filtered = filtered.filter(service =>
        this.selectedLocation === 'home' ? service.homeService : !service.homeService
      );
    }

    this.filteredServices = filtered;
    this.hasMoreServices = this.filteredServices.length > this.currentPage * 10;
  }

  async loadMore() {
    this.isLoading = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.currentPage++;
      this.hasMoreServices = this.filteredServices.length > this.currentPage * 10;
    } finally {
      this.isLoading = false;
    }
  }
}
