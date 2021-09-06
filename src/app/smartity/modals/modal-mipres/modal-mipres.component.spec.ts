import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMipresComponent } from './modal-mipres.component';

describe('ModalMipresComponent', () => {
  let component: ModalMipresComponent;
  let fixture: ComponentFixture<ModalMipresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMipresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMipresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
