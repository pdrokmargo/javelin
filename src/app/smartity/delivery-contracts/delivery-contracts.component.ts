import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import { Base } from '../bases/base';

@Component({
    selector: "delivery-contracts-cmp",
    templateUrl: "delivery-contracts.component.html",
    styles: []
})

export class DeliveryContractsComponent extends Base implements OnInit {
       
    constructor(){
        super();
    }
   
    ngOnInit() {
      
    }
    
      
}