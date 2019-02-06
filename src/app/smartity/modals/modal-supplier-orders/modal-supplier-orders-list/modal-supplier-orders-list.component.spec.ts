import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplierOrdersListComponent } from './modal-supplier-orders-list.component';

describe('ModalSupplierOrdersListComponent', () => {
  let component: ModalSupplierOrdersListComponent;
  let fixture: ComponentFixture<ModalSupplierOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSupplierOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSupplierOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
