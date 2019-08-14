import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemissionGoodsListComponent } from './modal-remission-goods-list.component';

describe('ModalRemissionGoodsListComponent', () => {
  let component: ModalRemissionGoodsListComponent;
  let fixture: ComponentFixture<ModalRemissionGoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRemissionGoodsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRemissionGoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
