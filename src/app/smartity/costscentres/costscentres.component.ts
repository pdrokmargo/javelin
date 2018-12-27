import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import { Base } from '../bases/base';

@Component({
    selector: "costscentres-cmp",
    templateUrl: "costscentres.component.html",
    styles: []
})

export class CostscentresComponent extends Base implements OnInit {
       
    constructor(){
        super();
    }
   
    ngOnInit() {
    }
}