import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../../auth/authentication.service";
import { LrvTable, LrvTableColumn, LrvTableService, LrvTableOrder } from "../lrv-data-table/lrv-table";
import { LrvTableComponent } from "../lrv-data-table/lrv-table/lrv-table.component";
import { MatSnackBar } from "@angular/material";


@Component({
  selector: 'configuration-cmp',
  templateUrl: './configuration.component.html',
  styles: [`
  h3,.box-top { text-align: center; } 
  .justify-content-end { display: flex;justify-content: flex-end;}
  .text-toggle { padding-right: 10px; }
  `]
})
export class ConfigurationComponent implements OnInit {

  private config = [];
  private model = {
    business: {}
  };
  private itemSelected = '';
  private foods = [];
  private regimen = [];

  constructor(public service: AuthenticationService, public snackBar: MatSnackBar) {
    this.service.POST('collections', ["PORTFOLIO_TYPE"]).subscribe(res => {
      this.regimen = res["PORTFOLIO_TYPE"];
    });
  }

  ngOnInit() {
    this.service.GET(`configurations`).subscribe(res => {
      this.config = res['user profiles'];
      this.itemSelected = this.config[0]["code"];
      this.config.forEach(element => {
        switch (element["code"]) {
          case 'business':
            this.model.business = JSON.parse(element["value"]);
            break;
        }
      });
    })
  }

  private selectItem(c: any) {
    this.itemSelected = c.code;
  }

  private save(): void {
    this.service.PUT(`configurations/1`,
      {
        'business': JSON.stringify(this.model.business)
      }
    ).subscribe(res => {
      console.log(res);
      this.snackBar.open('Configuracion guardada correctamente', 'Actualización', {
        duration: 3500,
      });
    });
  }

}
