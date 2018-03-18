
import { Component } from '@angular/core';
import { AuthenticationService } from "../../../auth/authentication.service";
import { Router } from "@angular/router";
import { PrivilegeGuard } from "../../../auth/guards/privilege-guard";

@Component({
  selector: 'my-app-sidenav-menu',
  styles: [],
  templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent {

  private _views = {
    master: [],
    childrens: []
  };
  private views = [];

  constructor(public service: AuthenticationService, public router: Router, private privilegeGuard: PrivilegeGuard) {
    this.views = JSON.parse(localStorage.getItem('view'));
    this.loadMenu();
  }

  private loadMenu() {
    if(this.views){
      this.views.forEach(element => {
        if (element["views"] != null) {
          if (element["views"]["view_parent_id"] == 0) {
            this._views.master.push(element["views"]);
          } else {
            this._views.childrens.push(element["views"]);
          }
        }
      });

      this._views.master.forEach(element => {
        if (element["have_child"]) {
          element["children"] = [];
          this.masterd(element);
        }
      });
    }
  }

  private masterd(parent: Object) {
    this._views.childrens.forEach(element => {
      if (parent["id"] == element["view_parent_id"]) {
        parent["children"].push(element);
        if (element["have_child"]) {
          element["children"] = [];
          this.masterd(element);
        }
      }
    });

  }


}
