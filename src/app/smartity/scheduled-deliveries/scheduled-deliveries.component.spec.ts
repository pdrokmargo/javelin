import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDeliveriesComponent } from './scheduled-deliveries.component';

describe('ScheduledDeliveriesComponent', () => {
  let component: ScheduledDeliveriesComponent;
  let fixture: ComponentFixture<ScheduledDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
