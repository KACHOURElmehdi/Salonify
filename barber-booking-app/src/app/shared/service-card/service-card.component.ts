import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService, Service } from '../services/service.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent implements OnInit {
  @Input() serviceId!: number;
  service?: Service;

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    // For API integration, uncomment this:
    // this.serviceService.getService(this.serviceId).subscribe(
    //   data => this.service = data
    // );
  }
}
