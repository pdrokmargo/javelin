import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { BaseModel } from '../../bases/base-model';
import { MipresComponent } from '../mipres.component';


@Component({
  selector: 'mipres-action-cmp',
  templateUrl: './mipres-action.component.html',
  styleUrls: ['./mipres-action.component.scss']
})
export class MipresActionComponent extends BaseModel  implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private comp: MipresComponent,
    private loaderService: LoaderService,
    private helperService: HelperService,
    private dialog: MatDialog
    ) { super(); }

  ngOnInit() {

    this.clean();
        this.getCollection();
        if (this.numId !== undefined) {
          this.getDataById();
      }
      console.log(this.numId);
        // if (this.numId != undefined) {
        //     this.getDataById();
        // }else{
        //     this.model.date = new Date();
        // }
  }
  private goList() {
    this.comp.openList();
  }
  private clean() {
    
}

private getCollection() {
  // this.loaderService.display(true);
  // this.helperService.POST(`/api/collections`, ['INVENTORY_ENTRY_TYPE']).subscribe(rs => {
  //     const res = rs.json();
  //     this.inventory_movements_type = res.INVENTORY_ENTRY_TYPE;
  //     this.loaderService.display(false);
  // }, err => {
  //     console.log(err);
  //     this.loaderService.display(false);
  // });
}

private getDataById(): void {
  // this.loaderService.display(true);
  // this.helperService.GET(`/api/warehouse/${this.numId}`).subscribe(rs => {
  //     const res = rs.json();
  //     this.model = res.data;
  //     this.departments.push(this.model.geolocation.department);
  //     this.cities.push(this.model.geolocation.city);
  //     this.model.country_id = this.model.geolocation.country_id;
  //     this.model.department_id = this.model.geolocation.department_id;
  //     this.model.city_id = this.model.geolocation.city_id;
  //     this.loaderService.display(false);
  // }, err => {
  //     console.log(err);
  //     this.loaderService.display(false);
  // });
}

}
