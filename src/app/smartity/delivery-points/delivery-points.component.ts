import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import { Base } from '../bases/base';

@Component({
    selector: "delivery-points-cmp",
    templateUrl: "delivery-points.component.html",
    styles: []
})

export class DeliveryPointsComponent extends Base implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }


}