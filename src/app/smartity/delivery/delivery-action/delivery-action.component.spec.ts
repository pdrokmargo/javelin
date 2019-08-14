import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryActionComponent } from './delivery-action.component';

describe('DeliveryActionComponent', () => {
  let component: DeliveryActionComponent;
  let fixture: ComponentFixture<DeliveryActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
