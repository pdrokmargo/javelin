import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Base } from '../bases/base';

@Component({
  selector: 'app-mipres',
  templateUrl: './mipres.component.html',
  styleUrls: ['./mipres.component.scss']
})
export class MipresComponent extends Base implements OnInit {
  route: String;
  mipresRole: String; //supplier and delivery
  public mainToken: String = '525FE1ED-00E2-4364-9F5D-7612B8B1E21E';
  public nit: String = '802024817';
  public secondToken: String = '';

  constructor(location: Location, router: Router) { 
    super();
    router.events.subscribe(val => {
      if(location.path().includes("mipres-supplier")){
        this.route = 'Acceso para área de proveedores';
        this.mipresRole = 'supplier';
      }
      if(location.path().includes("mipres-delivery")){
        this.route = 'Acceso para área de dispensación';
        this.mipresRole = 'delivery';
      }
      if(location.path().includes("mipres-admin")){
        this.route = 'Acceso Admin';
        this.mipresRole = 'admin';
      }
    });
  }

  ngOnInit() {
  }

}
