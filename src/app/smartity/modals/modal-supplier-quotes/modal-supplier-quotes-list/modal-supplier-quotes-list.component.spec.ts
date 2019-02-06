import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplierQuotesListComponent } from './modal-supplier-quotes-list.component';

describe('ModalSupplierQuotesListComponent', () => {
  let component: ModalSupplierQuotesListComponent;
  let fixture: ComponentFixture<ModalSupplierQuotesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSupplierQuotesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSupplierQuotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
