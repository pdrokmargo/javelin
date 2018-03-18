import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from '../bases/base';

@Component({
    selector: 'warehouse-cmp',
    templateUrl: 'warehouse.component.html',
    styles: []
})

export class WarehouseComponent extends Base implements  OnInit{

    constructor(){
        super();
    }

    ngOnInit() { }

}
