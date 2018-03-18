import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import { AuthenticationService } from "../../auth/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'my-app-header',
  styles: [],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
  public AppConfig: any;
  private notifications = [];
  private user: any = {};

  constructor(public service: AuthenticationService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('objUser'));
  }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
    this.loadNotification();
  }

  private updateNotification(notification: any) {
    notification.dirty = true;
    this.service.PUT(`notification/${notification.id}`, notification).subscribe(res => {
      console.log(res);
      this.loadNotification();
    });
  }

  private loadNotification() {
    this.service.GET(`notification`).subscribe(res => {
      this.notifications = res["data"];
    });
  }

  private logout() {
    this.service.logout();
    this.router.navigate(["/auth"]);
  }

  private change_company(item: any) {
    this.service.change_company(item);
  }

}
