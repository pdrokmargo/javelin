import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-remission-goods',
  templateUrl: './remission-goods.component.html'
})
export class RemissionGoodsComponent extends Base implements  OnInit{

  constructor(){
      super();
  }

  ngOnInit() {
  }

}
