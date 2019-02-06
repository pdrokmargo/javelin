import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplierQuotesComponent } from './modal-supplier-quotes.component';

describe('ModalSupplierQuotesComponent', () => {
  let component: ModalSupplierQuotesComponent;
  let fixture: ComponentFixture<ModalSupplierQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSupplierQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSupplierQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
