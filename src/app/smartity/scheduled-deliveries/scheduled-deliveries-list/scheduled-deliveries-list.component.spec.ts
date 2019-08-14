import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDeliveriesListComponent } from './scheduled-deliveries-list.component';

describe('ScheduledDeliveriesListComponent', () => {
  let component: ScheduledDeliveriesListComponent;
  let fixture: ComponentFixture<ScheduledDeliveriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledDeliveriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDeliveriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
