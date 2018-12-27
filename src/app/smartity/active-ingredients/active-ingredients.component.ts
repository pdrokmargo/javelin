import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import { Base } from '../bases/base';

@Component({
    selector: "active-ingredients-cmp",
    templateUrl: "active-ingredients.component.html",
    styles: []
})

export class ActiveIngredientsComponent extends Base implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }


}