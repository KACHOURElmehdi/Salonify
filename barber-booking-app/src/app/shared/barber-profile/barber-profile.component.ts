import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberService, Barber } from '../services/barber.service';

@Component({
  selector: 'app-barber-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber-profile.component.html',
  styleUrl: './barber-profile.component.scss'
})
export class BarberProfileComponent implements OnInit {
  @Input() barberId!: number;
  barber?: Barber;

  constructor(private barberService: BarberService) {}

  ngOnInit() {
    // For API integration, uncomment this:
    // this.barberService.getBarber(this.barberId).subscribe(
    //   data => this.barber = data
    // );
  }
}
