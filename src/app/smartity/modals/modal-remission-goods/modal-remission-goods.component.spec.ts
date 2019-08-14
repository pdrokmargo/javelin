import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemissionGoodsComponent } from './modal-remission-goods.component';

describe('ModalRemissionGoodsComponent', () => {
  let component: ModalRemissionGoodsComponent;
  let fixture: ComponentFixture<ModalRemissionGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRemissionGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRemissionGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
