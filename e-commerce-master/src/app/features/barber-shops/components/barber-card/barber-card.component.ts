import { Component, Input } from '@angular/core';
import { Barber } from '../../../../core/models/barber.model';

@Component({
    selector: 'app-barber-card',
    templateUrl: './barber-card.component.html',
    styleUrls: ['./barber-card.component.scss']
})
export class BarberCardComponent {
    @Input() barber!: Barber;
} 