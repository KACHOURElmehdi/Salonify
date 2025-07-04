import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsListComponent } from './shops-list.component';

describe('ShopsListComponent', () => {
  let component: ShopsListComponent;
  let fixture: ComponentFixture<ShopsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
