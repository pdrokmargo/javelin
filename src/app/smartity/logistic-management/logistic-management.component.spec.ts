import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticManagementComponent } from './logistic-management.component';

describe('LogisticManagementComponent', () => {
  let component: LogisticManagementComponent;
  let fixture: ComponentFixture<LogisticManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
