import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuppliersOrdersComponent } from './modal-suppliers-orders.component';

describe('ModalSuppliersOrdersComponent', () => {
  let component: ModalSuppliersOrdersComponent;
  let fixture: ComponentFixture<ModalSuppliersOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSuppliersOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuppliersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
