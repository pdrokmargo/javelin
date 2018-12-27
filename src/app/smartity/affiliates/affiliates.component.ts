import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import { Base } from '../bases/base';

@Component({
    selector: "affiliates-cmp",
    templateUrl: "affiliates.component.html",
    styles: []
})

export class AffiliatesComponent extends Base implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }


}