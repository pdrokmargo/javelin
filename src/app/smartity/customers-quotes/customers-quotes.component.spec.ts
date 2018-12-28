import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersQuotesComponent } from './customers-quotes.component';

describe('CustomersQuotesComponent', () => {
  let component: CustomersQuotesComponent;
  let fixture: ComponentFixture<CustomersQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
